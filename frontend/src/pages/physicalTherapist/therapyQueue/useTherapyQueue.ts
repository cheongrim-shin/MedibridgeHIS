// useTherapyQueue.ts
import { useEffect, useState } from 'react';
import { fetchTherapyQueue, fetchBeds, startTherapyApi,
         completeTherapyApi,
         fetchPatientDetail} from './therapyQueue.api';
import { useBeds } from './useBeds';
import type { PatientQueueItem, BedTabType, PatientDetail, BedState } from './therapyQueue.types';
import { estimatedWaitMinutes, getSiblingBadge } from './therapyQueue.utils';

export const useTherapyQueue = () => {
    // ── 베드는 자기완결 훅에서  ──
    const { beds, setBeds } = useBeds();

    // ── 이 훅이 소유하는 상태 ──
    const [queue, setQueue] = useState<PatientQueueItem[]>([]);
    const [selectedTab, setSelectedTab] = useState<BedTabType>('GENERAL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<PatientQueueItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [detail, setDetail] = useState<PatientDetail | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);

    // ── 대기열 로딩 26~32행 ──
    useEffect(() => {
        fetchTherapyQueue()
            .then(setQueue)
            .catch(() => setError('대기열을 불러오지 못했습니다.'))
            .finally(() => setIsLoading(false));
    }, []); //빈 배열 마운트 시 1회만

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (!selectedPatient) { setDetail(null); return; }
        setDetailLoading(true);
        fetchPatientDetail(selectedPatient.medicalNumber, Number(selectedPatient.id))
            .then(setDetail)
            .catch(() => setDetail(null))  
            .finally(() => setDetailLoading(false));
    }, [selectedPatient]);

    // ── 핸들러 (상태가 다 여기 있으니 인자 전달 불필요) ──
    const handleStartTherapy = async (bedCode: string, patient: PatientQueueItem) => {
        // FE 1차 검증: 
        const targetBed = beds.find(b => b.bedCode === bedCode);
        if (!targetBed) { alert('베드를 찾을 수 없습니다.'); return; }
        if (targetBed.status === 'occupied') { alert('이미 사용 중인 베드입니다.'); return; }
        if (targetBed.type !== patient.therapyType) {
            alert('환자의 치료 종류가 이 베드와 일치하지 않습니다.'); return;
        }

        //환자 동시 치료 검증
        const isAlreadyInTreatment = queue.some(
            q => q.medicalNumber === patient.medicalNumber && q.status === 'IN_PROGRESS'
        );
        if (isAlreadyInTreatment) {
            alert(`[${patient.name}] 환자는 이미 다른 물리치료를 진행 중입니다.\n현재 진행 중인 치료를 완료한 후 배정해주세요.`);
            return;
        }

        // 사용자 확인
        const bedLabel = `${targetBed.type === 'GENERAL' ? '일반' : '견인'} ${targetBed.bedCode.replace(/[^0-9]/g,'')}번 베드`;
        if(!confirm(`${bedLabel}에 [${patient.name}] 환자를 배정하시겠습니까?`)){
            return;
        }
        try {//API 호출: 여기의 세 값이 XML로..
            await startTherapyApi({
                bedCode: targetBed.bedCode,                
                treatmentNumber: Number(patient.id),
                durationMin: patient.durationMinutes,
            });
            // 낙관적 부분갱신 대신 서버 최신값으로 재동기화 → 환자명/타이머/대기열 status 모두 정합
            const [freshBeds, freshQueue] = await Promise.all([fetchBeds(), fetchTherapyQueue()]);
            setBeds(freshBeds);
            setQueue(freshQueue);
            setSelectedPatient(null);
        } catch (err) {
            alert(err instanceof Error ? err.message : '치료 시작에 실패했습니다.');
        }
    };

    const handleCompleteTherapy = async (bedCode: string) =>{
        //인자가 bedCode "하나"뿐 — 환자 정보는 어디서?  beds 상태에서 역으로 찾는다
        const targetBed = beds.find(b => b.bedCode === bedCode);
        if(!targetBed || targetBed.status === 'available') return;

        const bedLabel = `${targetBed.type === 'GENERAL' ? '일반' : '견인'} ${targetBed.bedCode.replace(/[^0-9]/g,'')}번 베드`;
        if (!confirm(`${bedLabel}의 [${targetBed.patientName}] 환자의 치료를 완료 처리하시겠습니까?`)) return;

        try {
            await completeTherapyApi({
                bedCode: targetBed.bedCode,
                treatmentNumber: Number(targetBed.patientId), 
            });
            const [freshBeds, freshQueue] = await Promise.all([fetchBeds(), fetchTherapyQueue()]);
            setBeds(freshBeds);
            setQueue(freshQueue);
            alert('물리치료가 완료되어 퇴실 처리되었습니다.');
        } catch (err) {
            alert(err instanceof Error ? err.message : '치료 완료 처리에 실패했습니다.');
        }
    };

    const handleSelectBedPatient = (bed: BedState) => {
        if (bed.status !== 'occupied' || !bed.patientId) return;
        // 베드의 환자(치료번호)를 대기열 배열에서 역조회 — 치료중 환자도 queue에 있음
        const found = queue.find((q) => q.id === bed.patientId);
        setSelectedPatient(found ?? null);
    };

    // ── 파생 데이터 ──
    const totalWaitCount = queue.filter(i => i.status === 'WAIT').length;
    const activeCount = beds.filter(i => i.status === 'occupied').length;
    const filteredQueue = queue.filter(item => {
        if (item.therapyType !== selectedTab) return false;  // 현재 탭 베드 종류만
        if (item.status !== 'WAIT') return false;            // 대기중만
        if (searchQuery.trim()) {
            const queries = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
            const matchesAll = queries.every(q =>
                item.name.toLowerCase().includes(q) ||
                item.birthDate.includes(q) ||
                item.id.toLowerCase().includes(q)
            );
            if (!matchesAll) return false;
        }
        return true;
    })
    .map(item => ({
        ...item,
        estimatedWaitTime: estimatedWaitMinutes(item, queue, beds),
        siblingBadge: getSiblingBadge(item, queue) ?? undefined,
    }));

    // ── 화면에 필요한 것만 내보내기 ──
    return {
        beds, queue, selectedTab, setSelectedTab, searchQuery, setSearchQuery,
        selectedPatient, setSelectedPatient, isLoading, error,
        totalWaitCount, activeCount, filteredQueue,
        handleStartTherapy, handleCompleteTherapy, handleSelectBedPatient,
        detail, detailLoading,
    };
};
