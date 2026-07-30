import { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/Input';
import type { MedicineListVO } from './medicine.types';
import { getLowStockMedicines, updateMedicine } from './medicine.api';
import styles from './LowStockModal.module.css';

interface LowStockModalProps {
    onClose: () => void;
    onCountChange: (count: number) => void; // 재고부족 건수가 바뀔 때마다 상위(요약카드)에 반영
}

export const LowStockModal = ({ onClose, onCountChange }: LowStockModalProps) => {
    const [medicines, setMedicines] = useState<MedicineListVO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [amounts, setAmounts] = useState<Record<string, string>>({});
    const [submittingCode, setSubmittingCode] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;
        async function load() {
            setIsLoading(true);
            try {
                const data = await getLowStockMedicines();
                if (!isCancelled) setMedicines(data);
            } catch {
                if (!isCancelled) alert('재고부족 목록을 불러오지 못했습니다.');
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        }
        load();
        return () => { isCancelled = true; };
    }, []);

    const handleOrder = async (medicine: MedicineListVO) => {
        const amount = parseInt(amounts[medicine.medicineCode] ?? '', 10);
        if (!amount || amount <= 0) {
            alert('발주수량을 입력해주세요.');
            return;
        }

        setSubmittingCode(medicine.medicineCode);
        try {
            const newQuantity = medicine.currentQuantity + amount;
            await updateMedicine(medicine.medicineCode, { ...medicine, currentQuantity: newQuantity });

            const orderCost = amount * medicine.unitCost;
            alert(`${medicine.medicineNameText} ${amount}개 발주 완료 (${orderCost.toLocaleString()}원)`);

            if (newQuantity >= medicine.minQuantity) {
                // 부족 기준을 넘겼으면 목록에서 바로 제거
                setMedicines(prev => {
                    const next = prev.filter(m => m.medicineCode !== medicine.medicineCode);
                    onCountChange(next.length);
                    return next;
                });
            } else {
                // 아직 부족하면 목록에 남기고 수량만 갱신
                setMedicines(prev => prev.map(m =>
                    m.medicineCode === medicine.medicineCode ? { ...m, currentQuantity: newQuantity } : m
                ));
            }

            setAmounts(prev => ({ ...prev, [medicine.medicineCode]: '' }));
        } catch {
            alert('발주 처리 중 오류가 발생했습니다.');
        } finally {
            setSubmittingCode(null);
        }
    };

    return (
        <Modal width="480px" height="auto" onClick={onClose}>
            <Modal.Header>
                <Modal.Title>재고부족 약품 ({medicines.length}건)</Modal.Title>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>
            <Modal.Content>
                {isLoading ? (
                    <p>불러오는 중...</p>
                ) : medicines.length === 0 ? (
                    <p className={styles.emptyText}>재고부족 약품이 없습니다.</p>
                ) : (
                    <div className={styles.list}>
                        {medicines.map(medicine => {
                            const amount = parseInt(amounts[medicine.medicineCode] ?? '', 10);
                            const expectedCost = amount > 0 ? amount * medicine.unitCost : null;

                            return (
                                <div key={medicine.medicineCode} className={styles.orderCard}>
                                    <div className={styles.orderCardTop}>
                                        <span className={styles.name}>{medicine.medicineNameText}</span>
                                        <span className={styles.meta}>재고 {medicine.currentQuantity}개 · 최소 {medicine.minQuantity}개</span>
                                    </div>
                                    <div className={styles.orderCardSub}>
                                        {medicine.manufacturer} · 단가 {medicine.unitCost.toLocaleString()}원
                                    </div>
                                    <div className={styles.orderCardActions}>
                                        <div className={styles.expectedCostRow}>
                                            예상 발주금액 <strong>{expectedCost !== null ? `${expectedCost.toLocaleString()}원` : '-'}</strong>
                                        </div>
                                        <div className={styles.inputRow}>
                                            <Input
                                                type="number"
                                                size="sm"
                                                color="teal"
                                                placeholder="발주수량"
                                                value={amounts[medicine.medicineCode] ?? ''}
                                                onChange={(e) => setAmounts(prev => ({ ...prev, [medicine.medicineCode]: e.target.value }))}
                                            />
                                            <Button
                                                type="button"
                                                color="teal"
                                                size="sm"
                                                onClick={() => handleOrder(medicine)}
                                                disabled={submittingCode === medicine.medicineCode}
                                            >
                                                {submittingCode === medicine.medicineCode ? '처리중...' : '발주하기'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Modal.Content>
        </Modal>
    );
};