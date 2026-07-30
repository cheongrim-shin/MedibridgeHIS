import { useEffect, useState } from "react";
import type { PaymentDetailInput } from "../types";
import { completeReceiptPayment, createPayment, fetchCharges, payReceiptByPortOne } from "../payment.api";
import styles from "./PaymentForm.module.css";
import { Input } from "../../../../components/Input";
import { Button } from "../../../../components/ui/Button";
import { Select } from "../../../../components/ui/Select";

interface Props {
    medicalNumber: string; // 어느 접수의 수납인가
    onPaid: () => void;    // 수납 성공 → 부모가 목록·상세 갱신
}

// 빈 줄 하나로 시작
const EMPTY_ROW: PaymentDetailInput = { paymentDetailName: '', amount: '' };

export const PaymentForm = ({medicalNumber, onPaid }: Props) => {
    const [rows, setRows] = useState<PaymentDetailInput[]>([{ ...EMPTY_ROW }]);
    const [paymentType, setPaymentType] = useState('카드');
    const [error, setError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);

    // 합계 (숫자만 안전 변환)
    const total = rows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

    const changeRow = (i: number, key: keyof PaymentDetailInput, v: string) =>
        setRows(rows.map((r, idx) => (idx === i ? { ...r, [key]: v } : r)));
    const addRow = () => setRows([...rows, { ...EMPTY_ROW }]);
    const removeRow = (i: number) => setRows(rows.filter((_, idx) => idx !== i));

    // 요약표에 보여줄 유효 항목(완전 빈 줄 제외)
    const filled = rows.filter((r) => r.paymentDetailName.trim() || r.amount.trim());

    useEffect(() => {
        fetchCharges(medicalNumber)
            .then((charges) => { if (charges.length > 0) setRows(charges); })  // 계산 항목으로 대체
            .catch(() => { /* 실패 시 빈 폼 유지 — 수동 입력으로 진행 가능 */ });
    }, [medicalNumber]);

    const handleSubmit = async () => {
        // FE 1차 검증
        const cleaned = rows
            .map((r) => ({ paymentDetailName: r.paymentDetailName.trim(), amount: r.amount.trim() }))
            .filter((r) => r.paymentDetailName || r.amount); // 완전 빈 줄 제거
        if (cleaned.length === 0) { setError("수납 항목을 1개 이상 입력해 주세요."); return; }
        for (const r of cleaned) {
            if (!r.paymentDetailName) { setError("항목명을 입력해 주세요."); return; }
            if (!/^[0-9]+$/.test(r.amount)) { setError(`금액은 숫자만: ${r.paymentDetailName}`); return; }
        }

        const itemLines = cleaned
            .map((r) => `· ${r.paymentDetailName}   ${Number(r.amount).toLocaleString()}원`)
            .join('\n');
        const confirmed = window.confirm(
            `아래 내역으로 수납하시겠습니까?\n\n`
            + `${itemLines}\n`
            + `────────────────\n`
            + `합계   ${total.toLocaleString()}원\n`
            + `결제수단   ${paymentType}`
        );
        if (!confirmed) return;   // 취소하면 아무것도 하지 않는다

        try {
            setBusy(true);
            setError(null);
            const req = { medicalNumber, paymentType, details: cleaned };

            let paymentNumber: number;
            if (paymentType === '현금') {
                // 현금: 결제창 없이 바로 적재 
                paymentNumber = await createPayment(req);
            } else {
                // 카드/간편결제: 포트원 결제 
                const paymentId = await payReceiptByPortOne(medicalNumber, total);
                paymentNumber = await completeReceiptPayment(req, paymentId);
            }  
            alert(`수납 완료 - 수납번호 ${paymentNumber}`);
            onPaid();
        } catch (e) {
            setError(e instanceof Error ? e.message : "수납 실패");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className={styles.form}>
            <h4 className={styles.heading}>수납</h4>
            {error && <p className={styles.error}>{error}</p>}

            {/* 입력 행: 항목명 · 금액 동일 크기 (CSS에서 둘 다 flex:1) */}
            {rows.map((r, i) => (
                <div key={i} className={styles.row}>
                    <Input size="sm"  placeholder="항목명" value={r.paymentDetailName}
                           onChange={(e) => changeRow(i, "paymentDetailName", e.target.value)} />
                    <Input size="sm" placeholder="금액" 
                            value={r.amount? Number(r.amount).toLocaleString() :''}
                           onChange={(e) => changeRow(i, "amount", e.target.value.replace(/[^0-9]/g, ''))} />
                    <Button size="sm" width="auto" variant="outline"
                            onClick={() => removeRow(i)} disabled={rows.length === 1}>삭제</Button>
                </div>
            ))}

            <div className={styles.addWrap}>
                <Button size="sm" width="auto" variant="outline" onClick={addRow}>+ 항목 추가</Button>
            </div>

            {/*항목별 금액 요약 합계 (수납 버튼 위에 표시) */}
            <div className={styles.summary}>
                {filled.length === 0 ? (
                    <div className={styles.summaryRow}><span>항목을 입력하세요</span><span>0원</span></div>
                ) : filled.map((r, i) => (
                    <div key={i} className={styles.summaryRow}>
                        <span>{r.paymentDetailName || '(항목명 없음)'}</span>
                        <span>{(Number(r.amount) || 0).toLocaleString()}원</span>
                    </div>
                ))}
                <div className={styles.summaryTotal}>
                    <span>합계</span>
                    <span>{total.toLocaleString()}원</span>
                </div>
            </div>

            {/* 결제수단 + 수납 버튼(합계 반영) */}
            <div className={styles.footer}>
                <Select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                    <option value="카드">카드</option>
                    <option value="현금">현금</option>
                </Select>
                <Button size="sm" width="full" color="green" onClick={handleSubmit} disabled={busy}>
                    {busy ? '처리 중...' : `${total.toLocaleString()}원 수납하기`}
                </Button>
            </div>
        </div>
    );
};
