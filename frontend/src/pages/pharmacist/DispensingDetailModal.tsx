import { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';
import type { Column } from '../../components/Table';
import { Button } from '../../components/ui/Button';
import type { DispensingDetailVO, DispensingOrderVO } from './dispensing.types';
import { getDispensingOrderDetail, getDispensingHistoryDetail, completeDispensing } from './dispensing.api';

// 주민번호 마스킹: 앞 7자리(생년월일6 + 성별구분1)만 보이고 나머지는 * 처리
const maskResidentNumber = (residentNumber: string): string => {
    if (!residentNumber || residentNumber.length < 7) return residentNumber;
    const visible = residentNumber.slice(0, 7);
    const masked = '*'.repeat(residentNumber.length - 7);
    return visible + masked;
};

interface DispensingDetailModalProps {
    mode: 'order' | 'history';   // order: 완료 버튼 있음 / history: 조회만
    order: DispensingOrderVO;
    onClose: () => void;
    onCompleted?: (medicalNumber: string) => void;  // mode='order'일 때만 사용
}

export const DispensingDetailModal = ({ mode, order, onClose, onCompleted }: DispensingDetailModalProps) => {
    const [details, setDetails] = useState<DispensingDetailVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCompleting, setIsCompleting] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        async function load() {
            setIsLoading(true);
            try {
                const data = mode === 'order'
                    ? await getDispensingOrderDetail(order.medicalNumber)
                    : await getDispensingHistoryDetail(order.medicalNumber);
                if (!isCancelled) setDetails(data);
            } catch {
                if (!isCancelled) alert('상세 정보를 불러오지 못했습니다.');
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        }

        load();
        return () => { isCancelled = true; };
    }, [mode, order.medicalNumber]);

    const handleComplete = async () => {
        if (!window.confirm(`${order.patientName}님(${order.medicalNumber}) 처방을 조제 완료 처리하시겠습니까?`)) return;

        setIsCompleting(true);
        try {
            await completeDispensing(order.medicalNumber);
            alert('조제 완료 처리되었습니다.');
            onCompleted?.(order.medicalNumber);
            onClose();
        } catch {
            alert('조제 완료 처리 중 오류가 발생했습니다.');
        } finally {
            setIsCompleting(false);
        }
    };

    const columns: Column<DispensingDetailVO>[] = [
        { header: '약품코드', key: 'medicineCode', width: '80px' },
        { header: '약품명', key: 'medicineName', width: '160px' },
        { header: '약효분류', key: 'medicineCategoryName', width: '100px' },
        { header: '1회 투약량', key: 'totalQty', width: '90px', align: 'center' },
        { header: '1일 횟수', key: 'frequency', width: '80px', align: 'center' },
        { header: '투약일수', key: 'numberOfDaysAdministered', width: '80px', align: 'center' },
    ];

    return (
        <Modal width="640px" height="auto" onClick={onClose}>
            <Modal.Header>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>
                    {mode === 'order' ? '조제 대기 상세' : '조제 이력 상세'} ({order.medicalNumber})
                </span>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>

            <Modal.Content>
                <div style={{ display: 'flex', gap: '24px', padding: '4px 4px 16px', fontSize: '14px', color: '#334155' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <b>환자</b>
                        <span>{order.patientName} ({maskResidentNumber(order.residentNumber)})</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <b>처방의</b>
                        <span>{order.employeeName}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <b>진료과</b>
                        <span>{order.deptName}</span>
                    </div>
                </div>

                {isLoading ? (
                    <p>불러오는 중...</p>
                ) : (
                    <Table columns={columns} data={details} size="sm" />
                )}

                {mode === 'order' && (
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            type="button"
                            color="indigo"
                            size="md"
                            onClick={handleComplete}
                            disabled={isCompleting || isLoading}
                        >
                            {isCompleting ? '처리 중...' : '조제 완료'}
                        </Button>
                    </div>
                )}
            </Modal.Content>
        </Modal>
    );
};