/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { NewPatientForm, ReceiptHistory } from "../types";
import {Modal, type ModalRef } from "../../../../components/modal/Modal";
import { createReceipt, getReceiptHistory } from "../receipt.api";
import styles from './RegisterModal.module.css'
import { Input, type InputRef } from "../../../../components/ui/Input";
import { Button } from "../../../../components/ui/Button";
import { Table } from "../../../../components/ui/Table";
import { Select } from "../../../../components/ui/Select";
import { useDoctors } from "../useDoctors";
import { searchPatients, type PatientHit } from "../../shared/patient.api";

const onlyDigits = (s: string) => s.replace(/[^0-9]/g, '');

// ── 주민번호 앞 6자리(YYMMDD) 검증 ──────────────────────────────
const checkBirth = (front: string, genderDigit?: string): string | null => {
    if (front.length < 4) return null;                    // 아직 판단 유보
    const mm = Number(front.slice(2, 4));
    if (mm < 1 || mm > 12) return `월은 01~12 사이여야 합니다 (입력: ${front.slice(2, 4)}월)`;
    if (front.length < 6) return null;                    // 월은 통과, 일은 아직

    const yy = Number(front.slice(0, 2));
    const dd = Number(front.slice(4, 6));

    // 1,2,5,6 → 1900년대 / 3,4,7,8 → 2000년대 / 뒷자리 없으면 윤년 가능한 쪽으로 관대하게
    const c = !genderDigit ? null
            : '1256'.includes(genderDigit) ? 1900
            : '3478'.includes(genderDigit) ? 2000 : null;
    const y = c !== null ? c + yy
            : (new Date(2000 + yy, 1, 29).getDate() === 29 ? 2000 + yy : 1900 + yy);

    // new Date(y, mm, 0) = 그 달의 마지막 날. 윤년이 자동으로 반영된다.
    const last = new Date(y, mm, 0).getDate();
    if (dd < 1 || dd > last) return `${mm}월은 ${last}일까지입니다 (입력: ${front.slice(4, 6)}일)`;

    if (c !== null && new Date(y, mm - 1, dd) > new Date()) return '생년월일이 미래 날짜입니다';
    return null;
};

interface Props {
    onSuccess: () => void;   // 접수 성공 시 Counter가 목록을 새로고침하도록 알림
}

// 신규환자 폼의 초기값
const EMPTY_PATIENT: NewPatientForm = {
    memberName: '', memberPhoneNumber: '', rrn: '',
    address: '', detailAddress: '', postalCode: '',
};

// 의사번호 → 진료실 고정 매핑 
const DOCTOR_ROOM: Record<string, string> = {
    'M01-01': '1',   // 김원장
    'M01-09': '2',   // 임의사
    'M01-11': '3',   
};

// 부모(Counter): const modalRef = useRef<ModalRef>(null) → <RegisterModal ref={modalRef}/>
export const RegisterModal = forwardRef<ModalRef, Props>(({onSuccess}, ref)=>{
    // 내부 Modal을 직접 조종할 진짜 ref (열고 닫는 실권자)
    const innerRef = useRef<ModalRef>(null);

    // ── 단계/모드: 화면 분기의 축 ──
    const [step, setStep] = useState<'SEARCH' | 'FORM'>('SEARCH'); // 1페이지/2페이지
    const [mode, setMode] = useState<'EXISTING' | 'NEW'>('EXISTING'); // B흐름/A흐름

    // ── 1페이지(검색) 상태 ──
    const [keyword, setKeyword] = useState('');                 // 검색어 입력값
    const [hits, setHits] = useState<PatientHit[]>([]);         // 응답: 검색 결과 배열
    const [picked, setPicked] = useState<PatientHit | null>(null); // 클릭으로 선택된 기존환자

    // ── 2페이지(폼) 상태 — 제어 컴포넌트: 입력값의 원본은 전부 state ──
    const [newPatient, setNewPatient] = useState<NewPatientForm>(EMPTY_PATIENT);
    const [doctorNumber, setDoctorNumber] = useState('');       // 요청: ReceiptCreateReq.doctorNumber
    const [spaceNumber, setSpaceNumber] = useState('');  
    const [symptoms, setSymptoms] = useState('');               // 요청: ReceiptCreateReq.symptoms
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{[k: string]: string}>({});

    // 주민번호
    const [rrnFront, setRrnFront] = useState('');   
    const [rrnBack, setRrnBack] = useState('');     
    const [rrnError, setRrnError] = useState<string | null>(null);

    const [phone1, setPhone1] = useState('010');    
    const [phone2, setPhone2] = useState('');       
    const [phone3, setPhone3] = useState('');       

    const [history, setHistory] = useState<ReceiptHistory[]>([]);

    // 자동 포커스 이동용 ref (Input이 커스텀 ref로 focus()를 노출함 → InputRef 타입)
    const rrnBackRef = useRef<InputRef>(null);      // 앞6 다 치면 여기로 점프
    const detailRef  = useRef<InputRef>(null);      // 주소 선택 후 상세주소로 점프
    const phone2Ref  = useRef<InputRef>(null);      // 연락처 앞자리→가운데 점프
    const phone3Ref  = useRef<InputRef>(null);      // 가운데→끝자리 점프

    const { doctors, error: doctorError } = useDoctors();

    // ── 상태 전부 초기화: 닫은 뒤 다시 열면 새 접수여야 하므로 ──
    const resetAll =() =>{
        setStep('SEARCH'); setMode('EXISTING');
        setKeyword(''); setHits([]); setPicked(null);
        setNewPatient(EMPTY_PATIENT);
        setRrnFront(''); setRrnBack(''); setRrnError(null);
        setPhone1('010'); setPhone2(''); setPhone3(''); 
        setDoctorNumber(''); setSymptoms(''); setError(null);
        setSpaceNumber('');
    };

    // useImperativeHandle: 부모 ref(ref)가 open/close를 부르면
    //   우리가 정의한 이 구현이 실행됨 (열 때 초기화까지 얹어서)
    useImperativeHandle(ref, () =>({
        open: () =>{
            resetAll(); 
            innerRef.current?.open();
        },
        close: () => innerRef.current?.close(),
    }));

    // ── 검색: 버튼/Enter에서만 호출 ──
    const handleSearch = async () =>{
        try{
            setError(null);
            // 요청: GET /api/receptionist/patients?keyword=최지은
            // 응답: [{ memberNumber, memberName, memberPhoneNumber, birthDate, gender, address }]
            setHits(await searchPatients(keyword));
        }catch(e){
            setError(e instanceof Error ? e.message: "검색 실패");
        }
    };

    // [다음 우편번호] 버튼 클릭 → 팝업 열기
    const openPostcode = () => {
        // window.daum 은 index.html 스크립트가 만든 전역 객체.
        // TS가 타입을 모르므로 (window as any)로 접근 (초보용 최소 처리).
        const daum = (window as any).daum;
        if (!daum || !daum.Postcode) {
            setError('주소 검색 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
            return;
        }
        new daum.Postcode({
            // oncomplete: 사용자가 주소를 고르면 이 콜백이 "선택 결과(data)"를 넘겨준다
            oncomplete: (data: any) => {
                // data.zonecode  = 우편번호 5자리
                // data.roadAddress = 도로명 주소 / data.jibunAddress = 지번 주소
                setNewPatient((prev) => ({
                    ...prev,
                    postalCode: data.zonecode,
                    address: data.roadAddress || data.jibunAddress,
                }));
                detailRef.current?.focus();   // 곧바로 상세주소 입력으로 커서 이동
            },
        }).open();
    };

    // ── FE 1차 유효성 (빠른 피드백용 — 최종 방어는 BE) ──
    const validate = (): boolean => {
        const fe: {[k: string]: string} = {};
        if (mode === 'NEW') {
            if (!newPatient.memberName.trim()) fe.name = '이름을 입력해 주세요.';
            if (rrnFront.length !== 6 || rrnBack.length !== 7) fe.rrn = '주민등록번호 13자리를 정확히 입력해 주세요.';
            else { const err = checkBirth(rrnFront, rrnBack.charAt(0)); if (err) fe.rrn = err; }
            if (phone2.length !== 4 || phone3.length !== 4) fe.phone = '연락처를 정확히 입력해 주세요.';
            if (!newPatient.postalCode) fe.postal = '우편번호 찾기로 주소를 입력해 주세요.';
        }
        if (!doctorNumber) fe.doctor = '담당의를 선택해 주세요.';
        setFieldErrors(fe);
        return Object.keys(fe).length === 0;   // true면 통과
    };

    const handleDoctorChange = (v: string) => {
        setDoctorNumber(v);
        setSpaceNumber(DOCTOR_ROOM[v] ?? '');   // 의사 고르면 방 자동 채움
    };

    // ── 접수 제출 ───
    const handleSubmit = async () => {
        if (!validate()) return; 
        if(!window.confirm("입력하신 정보로 접수를 진행하시겠습니까?")){
            return;
        }

        try {
            const rrn = rrnFront + rrnBack;
            const memberPhoneNumber = `${phone1}-${phone2}-${phone3}`;
            const medicalNumber = await createReceipt({
                memberNumber: mode === 'EXISTING' ? picked!.memberNumber : undefined,
                newPatient:   mode === 'NEW' ? { ...newPatient, rrn, memberPhoneNumber } : undefined,
                doctorNumber,
                spaceNumber,     
                symptoms,
            });
            alert(`접수 완료 — 접수번호 ${medicalNumber}`);
            innerRef.current?.close();
            onSuccess();
        } catch (e) {
            setError(e instanceof Error ? e.message : '접수 실패');
        }
    };

    return(
        <Modal ref={innerRef} id="registerModal" width="760px">
            <Modal.Header>환자 접수</Modal.Header>
            <Modal.Body>
                {/* 에러: 어느 단계든 상단 고정 표시 */}
                {error && <p className={styles.error}>{error}</p>}
                
                {/* 1페이지: 환자 검색 */}
                {step ==='SEARCH' && (
                    <>
                        <div className={styles.searchRow}>
                            <Input 
                                placeholder="이름/연락처/생년월일 (2글자 이상)"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                            />
                            <Button size="sm" width="auto" onClick={handleSearch}>검색</Button>
                        </div>

                        <Table widths={[20, 26, 14, 8, 32]}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.Cell>이름</Table.Cell>
                                    <Table.Cell>연락처</Table.Cell>
                                    <Table.Cell>생년월일</Table.Cell>
                                    <Table.Cell align="center">성별</Table.Cell>
                                    <Table.Cell>주소</Table.Cell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body emptyMessage="검색 결과가 없습니다. 신규 환자라면 아래 버튼을 누르세요.">
                                {hits.map((h) => (
                                    <Table.Row
                                        key={h.memberNumber}
                                        active={picked?.memberNumber === h.memberNumber}
                                        onClick={() => setPicked(h)}
                                    >
                                        <Table.Cell>{h.memberName}</Table.Cell>
                                        <Table.Cell>{h.memberPhoneNumber}</Table.Cell>
                                        <Table.Cell>{h.birthDate}</Table.Cell>
                                        <Table.Cell align="center">{h.gender}</Table.Cell>
                                        <Table.Cell>{h.address ?? '-'}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>

                        <div className={styles.footerRow}>
                            <Button width="auto" variant="outline"
                                    onClick={() => { setMode('NEW'); setStep('FORM'); setError(null); }}>
                                신규환자 등록
                            </Button>
                            <Button width="auto" disabled={!picked}
                                    onClick={() => { setMode('EXISTING'); setStep('FORM'); setError(null); 
                                    if (picked) getReceiptHistory(picked.memberNumber).then(setHistory).catch(() => setHistory([]));
                                }}>
                                선택한 환자로 접수
                            </Button>
                        </div>
                    </>
                )}

                {/* ───── 2페이지: 접수 정보 입력 ───── */}
                {step === 'FORM' && (
                    <>
                        {mode === 'EXISTING' && picked && (
                            <div className={styles.pickedSummary}>
                                <b>{picked.memberName}</b> ({picked.gender}) · 생년월일 {picked.birthDate} · {picked.memberPhoneNumber}
                            </div>
                        )}
                        {mode === 'EXISTING' && history.length > 0 && (
                            <div className={styles.histBox}>
                                <div className={styles.histTitle}>지난 진료이력 ({history.length})</div>
                                {history.slice(0, 5).map((h) => (
                                    <div key={h.medicalNumber} className={styles.histRow}>
                                        <span>{h.receiptDate}</span><span>{h.doctorName ?? '-'}</span>
                                        <span>{h.treatmentItem ?? '-'}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {mode === 'NEW' && (
                            <div className={styles.formStack}>

                                {/* ── 1행: 환자명 | 연락처 (2열) ── */}
                                <div className={styles.grid2}>
                                    <div className={styles.field}>
                                        {fieldErrors.name && <span className={styles.fieldError}>{fieldErrors.name}</span>}
                                        <label className={styles.label}>환자명 *</label>                                       
                                        <Input placeholder="이름 입력" value={newPatient.memberName}
                                            onChange={(e) => setNewPatient({ ...newPatient, memberName: e.target.value })}/>
                                    </div>

                                    <div className={styles.field}>
                                        {fieldErrors.phone && <span className={styles.fieldError}>{fieldErrors.phone}</span>}
                                        <label className={styles.label}>연락처 *</label>                                     
                                        <div className={styles.phoneRow}>
                                            {/* 앞자리(기본 010) */}
                                            <Input inputMode="numeric" maxLength={3} value={phone1}
                                                onChange={(e) => setPhone1(onlyDigits(e.target.value).slice(0, 3))}/>
                                            <span className={styles.dash}>-</span>
                                            {/* 가운데 4자리 — 다 치면 끝칸으로 자동 이동 */}
                                            <Input ref={phone2Ref} inputMode="numeric" maxLength={4} value={phone2}
                                                onChange={(e) => {
                                                    const v = onlyDigits(e.target.value).slice(0, 4);
                                                    setPhone2(v);
                                                    if (v.length === 4) phone3Ref.current?.focus();
                                                }}/>
                                            <span className={styles.dash}>-</span>
                                            {/* 끝 4자리 */}
                                            <Input ref={phone3Ref} inputMode="numeric" maxLength={4} value={phone3}
                                                onChange={(e) => setPhone3(onlyDigits(e.target.value).slice(0, 4))}/>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    {/* 실시간 에러 우선 표시 */}
                                    {(rrnError || fieldErrors.rrn) && (
                                        <span className={styles.fieldError}>{rrnError ?? fieldErrors.rrn}</span>
                                    )}
                                    <label className={styles.label}>주민등록번호 *</label>
                                    <div className={styles.rrnRow}>
                                        <Input placeholder="앞 6자리" inputMode="numeric" maxLength={6} value={rrnFront}
                                            onChange={(e) => {
                                                const v = onlyDigits(e.target.value).slice(0, 6);
                                                setRrnFront(v);
                                                const err = checkBirth(v, rrnBack.charAt(0) || undefined);   
                                                setRrnError(err);
                                                if (v.length === 6 && !err) rrnBackRef.current?.focus();     
                                            }}/>
                                        <span className={styles.dash}>-</span>
                                        <Input ref={rrnBackRef} placeholder="뒤 7자리" inputMode="numeric" maxLength={7} value={rrnBack}
                                            onChange={(e) => {
                                                const v = onlyDigits(e.target.value).slice(0, 7);
                                                setRrnBack(v);
                                                if (rrnFront.length === 6) setRrnError(checkBirth(rrnFront, v.charAt(0)));  //재검증
                                            }}/>
                                    </div>
                                </div>

                                {/* ── 3행: 우편번호(읽기전용) + 찾기 버튼 ── */}
                                <div className={styles.field}>
                                    {fieldErrors.postal && <span className={styles.fieldError}>{fieldErrors.postal}</span>}
                                    <label className={styles.label}>우편번호 *</label>
                                    <div className={styles.postRow}>
                                        <Input placeholder="우편번호" value={newPatient.postalCode} readOnly />
                                        <Button width="auto" variant="outline" onClick={openPostcode}>우편번호 찾기</Button>
                                    </div>
                                </div>

                                {/* ── 4행: 주소(읽기전용) + 상세주소(직접입력) ── */}
                                <div className={styles.field}>
                                    <label className={styles.label}>주소 *</label>
                                    <Input placeholder="주소" value={newPatient.address} readOnly />
                                    <Input ref={detailRef} placeholder="상세주소 입력" value={newPatient.detailAddress}
                                        onChange={(e) => setNewPatient({ ...newPatient, detailAddress: e.target.value })}/>
                                </div>
                            </div>
                        )}
                        <div className={styles.formStack}>
                            {doctorError && <p className={styles.error}>{doctorError}</p>}
                            {fieldErrors.doctor && <span className={styles.fieldError}>{fieldErrors.doctor}</span>}
                            <Select value={doctorNumber} onChange={(e) => handleDoctorChange(e.target.value)}>
                                <option value="">담당의 선택 *</option>
                                {doctors.map((d) => (
                                    <option key={d.doctorNumber} value={d.doctorNumber}>{d.doctorName}</option>
                                ))}
                            </Select>
                            {/* 진료실: 자동 채워지되 수동 변경도 가능(대진·방 변경 대응) */}
                            <Select value={spaceNumber} onChange={(e) => setSpaceNumber(e.target.value)}>
                                <option value="">진료실 선택 *</option>
                                <option value="1">1실</option>
                                <option value="2">2실</option>
                                <option value="3">3실</option>
                            </Select>
                        </div>

                        <div className={styles.footerRow}>
                            <Button width="auto" variant="outline"
                                    onClick={() => { setStep('SEARCH'); setError(null); }}>이전</Button>
                            <Button width="auto" onClick={handleSubmit}>접수하기</Button>
                        </div>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
});

RegisterModal.displayName = 'RegisterModal'; // forwardRef 사용 시 디버깅용 이름 지정 관례