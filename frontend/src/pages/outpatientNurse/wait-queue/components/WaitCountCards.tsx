import styles from "./WaitCountCards.module.css";

// props로 부모(WaitQueue)에서 받아온 카운트 데이터를 그대로 표시만 함
interface WaitCountCardsProps {
    waitingCnt: number;
    treatingCnt: number;
    holdCnt: number;
}

export function WaitCountCards({ waitingCnt, treatingCnt, holdCnt }: WaitCountCardsProps) {
    return (
        <div className={styles.cardRow}>
            <div className={styles.statusCard}>
                <p className={styles.cardLabel}>대기 중</p>
                <h2 className={`${styles.cardNumber} ${styles.colorWaiting}`}>
                    {waitingCnt}
                </h2>
            </div>
            <div className={styles.statusCard}>
                <p className={styles.cardLabel}>진료 중</p>
                <h2 className={`${styles.cardNumber} ${styles.colorTreating}`}>
                    {treatingCnt}
                </h2>
            </div>
            <div className={styles.statusCard}>
                <p className={styles.cardLabel}>대기 보류</p>
                <h2 className={`${styles.cardNumber} ${styles.colorHold}`}>
                    {holdCnt}
                </h2>
            </div>
        </div>
    );
}