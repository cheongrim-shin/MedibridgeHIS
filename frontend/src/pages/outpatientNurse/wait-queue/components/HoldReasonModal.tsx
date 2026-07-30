import { useCallback, useRef, useState } from "react";
import styles from "./HoldReasonModal.module.css"
import { Toast } from "./Toast";

// 보류 사유 목록
const HOLD_REASONS = ["고객 요청", "자리 비움", "진료 전 혈압 측정", "검사 대기", "기타"];

interface HoldReasonModalProps {
    memberName: string; // 모달 제목에 표시할 환자명
    onClose : () => void; // 취소, 닫기 시 호출
    onConfirm : (reason: string) => void; // 확인 시 최종 사유를 부모에게 전달
}

export function HoldReasonModal({memberName, onClose, onConfirm}: HoldReasonModalProps) {
    // 선택된 라디오 버튼 값
    const [selectedReason, setSelectedReason] = useState<string>("");

    // "기타" 선택 시 직접 입력하는 텍스트
    const [customReason, setCustomReason] = useState<string>("");

    // 보류 사유가 11자리를 넘으면 toast 경고 나타남
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    
    const isToastShowing = useRef(false);
    
    const handleCustomReasonChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

            if(value.length > 11) {
                // 이미 같은 토스트가 떠있으면 다시 안띄움 (타이머 중복 방지)
                if(!isToastShowing.current){
                    isToastShowing.current = true; // 즉시 반영
                    setToastMessage("사유는 11자 이내로 입력해주세요");
                }
                setCustomReason(value.slice(0,11));
                return;
        }
        setCustomReason(value);
    };

    const handleToastClose = useCallback(() => {
        setToastMessage(null);
        isToastShowing.current = false; // 토스트 닫힐 때 플래그도 같이 리셋
    }, []);

    // 확인 버튼 클릭 시 : 기타 - 직접입력값 , 아니면 선택한 사유 전달
    const handleConfirm = () => {
        if(!selectedReason) {
            alert("보류 사유를 선택해주세요.");
            return;
        }

        if(selectedReason === "기타" && !customReason.trim()) {
            alert("기타 사유를 입력해주세요.");
            return;
        }

        const finalReason = selectedReason === "기타" ? customReason.trim():selectedReason;
        onConfirm(finalReason);
    };

    return (
        // 배경 어둡게 깔리는 오버레이 - 클릭하면 모달 닫힘 (배경클릭시)
        <div className={styles.overlay} onClick={onClose}>
            
            {/* 모달 내용 영역 - 클릭 이벤트가 오버레이까지 전파되지 않도록 함 */}
            <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>

                {/* toastMessage가 있을때만 Toast 컴포넌트 표시 */}
                {toastMessage && (
                    <Toast
                        key={toastMessage}
                        message={toastMessage}
                        onClose={handleToastClose}
                        />
                )}

                <h3 className={styles.modalTitle}>{memberName} 환자 대기 보류</h3>
                <p className={styles.modalSubText}>보류 사유를 선택해주세요</p>

                <div className={styles.reasonList}>
                    {HOLD_REASONS.map((reason) => (
                        <label key={reason} className={styles.reasonItem}>
                            <input
                                type="radio"
                                name="holdReason"
                                value={reason}
                                checked={selectedReason === reason}
                                onChange={()=> setSelectedReason(reason)}
                                />
                                {reason}
                        </label>
                    ))}
                </div>
                    {/* 기타 선택 시 직접 입력창 */}
                    {selectedReason === "기타" && (
                        <input
                            type="text"
                            className={styles.customInput}
                            placeholder="기타 사유를 입력해주세요"
                            value={customReason}
                            onChange={handleCustomReasonChange}
                            />
                    )}

                    <div className={styles.madalActions}>
                        <button className={styles.cancelBtn} onClick={onClose}> 
                            취소
                        </button>
                        <button className={styles.confirmBtn} onClick={handleConfirm}>
                            확인
                        </button>
                    </div>

            </div>
        </div>
    )
}

