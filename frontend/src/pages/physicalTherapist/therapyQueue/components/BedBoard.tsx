
import styles from '../TherapyQueue.module.css';
import type { BedState, PatientQueueItem } from '../therapyQueue.types';
import { formatTime } from '../therapyQueue.utils';
import { Button } from './Button';

interface BedBoardProps {
    currentTabBeds: BedState[];
    selectedPatient: PatientQueueItem | null;
    handleCompleteTherapy: (bedId: string) => void;
    handleStartTherapy: (bedId: string, patient: PatientQueueItem) => void;
    onPatientClick?: (bed: BedState) => void;
}

export const BedBoard = ({ currentTabBeds, selectedPatient, handleCompleteTherapy, handleStartTherapy, onPatientClick }: BedBoardProps) => {
    return (
        <>
            {currentTabBeds.map(bed => {
                const isOccupied = bed.status === 'occupied';

                return (
                    <div key={bed.bedCode} className={styles.bedItemCard}>
                        <div className={styles.bedItemHeader} 
                            onClick={() => bed.status === 'occupied' && onPatientClick?.(bed)}
                            style={bed.status === 'occupied' ? { cursor: 'pointer' } : undefined}>
                            <span className={styles.bedItemName}>
                                {bed.type=== 'GENERAL'? '일반' : '견인'} {bed.bedCode.replace(/[^0-9]/g,'')}번 베드
                            </span>
                            <div className={styles.badgeWrapper}>
                                {isOccupied ? (
                                    <span className={`${styles.statusBadge} ${styles.badgeProgress}`}>치료중</span>
                                ) : (
                                    <span className={`${styles.statusBadge} ${styles.badgeEmpty}`}>사용가능</span>
                                )}
                            </div>
                        </div>

                        <div className={styles.bedItemContent}>
                            {isOccupied ? (
                                <div className={styles.bedPatientInfoWrapper}>
                                    <span className={styles.patientTherapyText} title={`${bed.patientName ?? ''} (${bed.treatmentItemName})`}>
                                        <span className={styles.patientNameText}>{bed.patientName ?? ''}</span>
                                        <span className={styles.therapyNameText}> ({bed.treatmentItemName})</span>
                                    </span>
                                    <span className={styles.bedTimerText}>{formatTime(bed.remainingSeconds)}</span>
                                </div>
                            ) : (
                                <span className={styles.emptyStateText}>비어 있음</span>
                            )}
                        </div>

                        <div className={styles.bedItemFooter}>
                            {isOccupied ? (
                                <Button size="xs" color="red" variant="outline" fullWidth onClick={(e) => { e.stopPropagation(); handleCompleteTherapy(bed.bedCode); }}>
                                    치료 완료
                                </Button>
                            ) : (
                                selectedPatient ? (
                                    <Button size="xs" color="teal" fullWidth onClick={() => handleStartTherapy(bed.bedCode, selectedPatient)}>
                                        이 베드에 배정
                                    </Button>
                                ) : null
                            )}
                        </div>
                    </div>
                );
            })}
        </>
    );
};
