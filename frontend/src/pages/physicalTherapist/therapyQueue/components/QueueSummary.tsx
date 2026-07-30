import styles from '../TherapyQueue.module.css';

interface QueueSummaryProps {
    waitCount: number;
    activeCount: number;
}

export const QueueSummary = ({ waitCount, activeCount }: QueueSummaryProps) => {
    return (
        <div className={styles.summaryRow}>
            <div className={styles.summaryCard}>
                <span className={styles.summaryTitle}>대기 중</span>
                <span className={`${styles.summaryValue} ${styles.colorTeal}`}>{waitCount}</span>
            </div>
            <div className={styles.summaryCard}>
                <span className={styles.summaryTitle}>치료 중</span>
                <span className={`${styles.summaryValue} ${styles.colorGreen}`}>{activeCount}</span>
            </div>
        </div>
    );
};
