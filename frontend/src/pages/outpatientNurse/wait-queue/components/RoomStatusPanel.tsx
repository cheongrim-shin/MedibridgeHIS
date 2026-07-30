import { useState } from "react";
import styles from "./RoomStatusPanel.module.css";
import { HoldReasonModal } from "./HoldReasonModal";
import type { RoomStatusVO, RoomTab } from "../../types";

interface RoomStatusPanelProps {
    roomTabs: RoomTab[];
    roomStatusList: RoomStatusVO[];
    stateLabelMap: Record<string, string>;
    onHoldConfirm: (medicalNumber: string, holdReason: string, spaceNumber: string) => void; //부모(WaitQueue)가 처리할 함수
    onNextPatient: (medicalNumber: string, spaceNumber: string) => void;
}

export function RoomStatusPanel({ roomTabs, roomStatusList, stateLabelMap, onHoldConfirm, onNextPatient }: RoomStatusPanelProps) {
    // 지금 보류 모달이 열려있는 대상 환자(없으면 null = 모달 안보임)
    const [holdTarget, setHoldTarget] = useState<RoomStatusVO | null>(null);

    const getRoomStatus = (roomId: string) => {
        return roomStatusList.find((item) => String(item.spaceNumber) === String(roomId));
    };

    // roomTabs 중에서 "전체"(id === "all")는 실제 진료실이 아니라
    // 목록 필터링용 가짜 탭이라서, 카드를 그릴 때는 걸러내고 진짜 진료실(1,2,3)만 남김
    const actualRooms = roomTabs.filter((room) => room.id !== "all");

    return (
        <div className={styles.roomStatusContainer}>
            <h3 className={styles.sectionTitle}>진료실 호출 현황</h3>
            <div className={styles.roomStatusGrid}>
                {actualRooms.map((room) => {
                    const status = getRoomStatus(room.id);

                    return (
                        <div key={room.id} className={styles.roomCard}>
                            <div className={styles.roomCardHeader}>
                                <span className={styles.roomLabel}>{room.label}</span>
                                {status ? (
                                    <span
                                        className={`${styles.roomBadge} ${status.standbyState === '호출중'
                                                ? styles.badgeCalling
                                                : styles.badgeTreating
                                            }`}
                                    >
                                        {stateLabelMap[status.standbyState]}
                                    </span>
                                ) : (
                                    <span className={styles.roomBadgeEmpty}>비어있음</span>
                                )}
                            </div>

                            {status ? (
                                <>
                                    <p className={styles.roommemberName}>
                                        {status.memberName}
                                        <span className={styles.roomPatientInfo}>
                                            ({status.age}세/{status.gender})
                                        </span>

                                        <button
                                            type="button"
                                            className={styles.detailBtn}
                                            onClick={() => console.log("환자 상세정보 클릭:", status.memberName)}
                                            title="환자 상세정보"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                            </svg>
                                        </button>

                                    </p>
                                    {status.standbyState === '호출중' && (
                                        <div className={styles.roomActions}>
                                            {/* 클릭하면 이 환자를 대상으로 모달 열기 */}
                                            <button className={styles.holdBtn}
                                                onClick={() => setHoldTarget(status)}
                                            >
                                                대기 보류
                                            </button>
                                            <button
                                                className={styles.nextBtn}
                                                onClick={() => onNextPatient(status.medicalNumber, status.spaceNumber)}
                                            >
                                                다음 순번으로
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className={styles.roomEmptyText}>진료 중인 환자가 없습니다.</p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* holdTarget이 있을 때만 모달 표시 */}
            {holdTarget && (
                <HoldReasonModal
                    memberName={holdTarget.memberName}
                    onClose={() => setHoldTarget(null)}
                    onConfirm={(reason) => {
                        onHoldConfirm(holdTarget.medicalNumber, reason, holdTarget.spaceNumber); // 부모에게 위임
                        setHoldTarget(null) // 모달 닫기
                    }}
                />
            )}
        </div>
    );
}