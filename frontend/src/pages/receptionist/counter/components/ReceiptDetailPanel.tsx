import { useEffect, useState } from "react";
import { getPatientOrders, getReceiptDetail, getReceiptHistory } from "../receipt.api";
import styles from './ReceiptDetailPanel.module.css'
import type { OrderStatus, PaymentDetailInput, ReceiptDetail, ReceiptHistory } from "../types";
import { PaymentForm } from "./PaymentForm";
import { getAge } from "../../../../utils/age";
import { fetchPaymentHistory } from "../payment.api";


interface Props{
    medicalNumber: string; // Counter가 클릭된 접수번호를 넣어줌
    onClose?: () => void;
    onPaid?: () => void;
}

// 라벨-값 한 줄 (반복되니 작은 컴포넌트로 분리)
function Row({ label, value }: { label: string; value: string | React.ReactNode }) {
    return (
        <div className={styles.row}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
}

export const ReceiptDetailPanel = ({medicalNumber, onClose, onPaid }: Props) =>{
    const [detail, setDetail] = useState<ReceiptDetail | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const [reloadKey, setReloadKey] = useState(0);

    const [orders, setOrders] = useState<OrderStatus[]>([]);

    // medicalNumber가 바뀔 때마다 재조회 (의존성 배열에 medicalNumber)
    useEffect(()=>{
        let alive = true;
        // eslint-disable-next-line
        setLoading(true);
        setError(null);
        getReceiptDetail(medicalNumber)
            .then((d)=> {if(alive) setDetail(d);})
            .catch((e)=> {if(alive) setError(e instanceof Error ? e.message:"조회 실패");})
            .finally(()=>{ if (alive) setLoading(false);});
        return () => { alive = false; }; 
    },[medicalNumber, reloadKey]);

    const [history, setHistory] = useState<ReceiptHistory[]>([]);
    useEffect(() => {
        if (!detail?.memberNumber) return;
        getReceiptHistory(detail.memberNumber).then(setHistory).catch(() => setHistory([]));
    }, [detail?.memberNumber]);

    useEffect(() => {
        getPatientOrders(medicalNumber).then(setOrders).catch(() => setOrders([]));
    }, [medicalNumber, reloadKey]);

    const pendingCount = orders.filter(o => o.doneYn === 'N').length;

    const [payHistory, setPayHistory] = useState<{ key: string; rows: PaymentDetailInput[] }>({ key: '', rows: [] });
        useEffect(() => {
        if (detail?.receiptStatus !== '수납완료') return;    
        let ignore = false;                                
        fetchPaymentHistory(medicalNumber)
            .then((rows) => { if (!ignore) setPayHistory({ key: medicalNumber, rows }); })
            .catch(() => { if (!ignore) setPayHistory({ key: medicalNumber, rows: [] }); });
        return () => { ignore = true; };
    }, [detail?.receiptStatus, medicalNumber]);

    //지금 보는 접수의 응답일 때만 사용 — 잔상은 여기서 걸러짐
    const payRows = payHistory.key === medicalNumber ? payHistory.rows : [];
    const payTotal = payRows.reduce((sum, h) => sum + (Number(h.amount) || 0), 0);


    if(loading) return <div className={styles.state}>불러오는 중...</div>;
    if(error)   return <div className={styles.state}>{error}</div>;
    if(!detail) return null;

    const dash = (v: string | number | null | undefined) =>(v === null || v=== undefined ? '-': String(v));

    return(
        <div className={styles.panel}>
            <div className={styles.head}>
            <h3 className={styles.title}>
                {detail.memberName}
                <span className={styles.badge}>{detail.memberNumber}</span>   {/* 환자번호 색표시 */}
            </h3>
            <button className={styles.closeBtn} onClick={onClose}>닫기</button>
        </div>

            <section className={styles.group}>
                <Row label="생년월일" value={`${detail.birthDate} (만 ${getAge(detail.birthDate) ?? '-'}세, ${detail.gender})`} />
                <Row label="연락처"   value={dash(detail.memberPhoneNumber)} />
                <Row label="주소"     value={`[${dash(detail.postalCode)}] ${dash(detail.address)}`} />
            </section>

            <section className={styles.group}>
                <Row label="접수상태" value={dash(detail.receiptStatus)} />
                <Row label="접수일시" value={detail.receiptDate ? detail.receiptDate.replace('T', ' ') : '-'} />
                <Row label="구분"     value={dash(detail.visitType)} />   
                <Row label="담당의"   value={dash(detail.doctorName)} />
                <Row label="진료실" value={detail.spaceNumber ? `${detail.spaceNumber}실` : '-'} />
                <Row label="치료/계획" value={dash(detail.treatmentItem)} />  
                <Row label="증상"     value={dash(detail.symptoms)} />
            </section>

            <section className={styles.group}>
                <div className={styles.histTitle}>지난 진료이력 ({history.length})</div>
                {history.length === 0 ? (
                    <div className={styles.histEmpty}>이력 없음</div>
                ) : history.slice(0, 3).map((h) => (
                    <div key={h.medicalNumber} className={styles.histRow}>
                        <span>{h.receiptDate}</span>
                        <span>{h.doctorName ?? '-'}</span>
                        <span>{h.treatmentItem ?? '-'}</span>
                        <span>{h.receiptStatus ?? '-'}</span>
                    </div>
                ))}
            </section>

             {['진료중','진료완료','수납대기','수납완료'].includes(detail.receiptStatus ?? '') && (
                <section className={styles.group}>
                    <div className={styles.histTitle}>
                        처치 현황 {pendingCount > 0 && <span style={{color:'#dc2626'}}>· 미완료 {pendingCount}건</span>}
                    </div>
                    {orders.length === 0 ? (
                        <div className={styles.histEmpty}>처방/처치 없음</div>
                    ) : orders.map((o, i) => (
                        <div key={i} className={styles.histRow}>
                            <span>{o.part}</span>
                            <span>{o.itemName}</span>
                            <span style={{ color: o.doneYn === 'Y' ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                                {o.doneYn === 'Y' ? '완료' : '미완료'} ({o.statusLabel})
                            </span>
                        </div>
                    ))}
                </section>
            )}

            {detail.receiptStatus === '수납완료' && (
                <section className={styles.group}>
                    <Row label="수납금액" value={<b>{detail.totalFee?.toLocaleString() ?? 0}원</b>} />
                </section>
            )}
           
            {detail.receiptStatus === '수납완료' && (
                <section className={styles.group}>
                    <div className={styles.histTitle}>수납 내역</div>
                    {payRows.length === 0 ? (
                        <div className={styles.histEmpty}>항목 내역 없음 (상세 저장 이전 수납 건)</div>
                    ) : (
                        <>
                            {payRows.map((h, i) => (
                                <div key={h.lineNo ?? i} className={`${styles.histRow} ${styles.payRow}`}>
                                    <span>{h.paymentDetailName}</span>
                                    <span>{Number(h.amount).toLocaleString()}원</span>
                                </div>
                            ))}
                            <div className={`${styles.histRow} ${styles.payTotalRow}`}>
                                <span><b>합계</b></span>
                                <span><b>{payTotal.toLocaleString()}원</b></span>
                            </div>
                        </>
                    )}
                </section>
            )}
            {detail.receiptStatus === "수납대기" && (
                <PaymentForm
                    medicalNumber={detail.medicalNumber}
                    onPaid={()=>{
                        setReloadKey((k) => k+1);  
                        onPaid?.();
                    }}
                />    
            )}
            {detail.receiptStatus === '완료' && (
                <p className={styles.notPayable}>
                    처방된 치료가 아직 진행 중입니다 — 치료 완료 후 수납할 수 있습니다.
                </p>
            )}
        </div>
    )

}