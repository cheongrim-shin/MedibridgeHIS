import type { WaitingListVO } from "../../types";
import styles from "./CallModal.module.css";

interface CallModalProps {
    patient: WaitingListVO;
    error: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export function CallModal({ patient, error, onConfirm, onClose }: CallModalProps) {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                <h3 className={styles.modalTitle}>진료호출</h3>

                {!error && (
                    <>
                        <div className={styles.spinner} />
                        <p className={styles.modalText}>{patient.memberName} 환자 호출 중...</p>
                    </>
                )}

                {error && (
                    <p className={styles.modalErrorText}>호출에 실패했습니다. 다시 시도해주세요.</p>
                )}

                <div className={styles.modalButtonRow}>
                    {error ? (
                        <button className={styles.modalCancelButton} onClick={onClose}>닫기</button>
                    ) : (
                        <button className={styles.modalConfirmButton} onClick={onConfirm}>
                            호출완료
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}