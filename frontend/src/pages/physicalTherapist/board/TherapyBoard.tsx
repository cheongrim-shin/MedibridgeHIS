// pages/physicalTherapist/board/TherapyBoard.tsx
import { useEffect, useState } from 'react';
import { fetchTherapyQueue, fetchBeds } from '../therapyQueue/therapyQueue.api';
import { maskName } from '../../../utils/privacy';
import styles from './TherapyBoard.module.css';
import type { BedState, PatientQueueItem } from '../therapyQueue/therapyQueue.types';
import { estimatedWaitMinutes } from '../therapyQueue/therapyQueue.utils';

const POLL_MS = 5_000;   // 5초마다 갱신 — 전광판 표준 감각

export const TherapyBoard = () => {
    const [queue, setQueue] = useState<PatientQueueItem[]>([]);
    const [beds, setBeds] = useState<BedState[]>([]);

    useEffect(() => {
        const load = () => {
            fetchTherapyQueue().then(setQueue).catch(() => {});
            fetchBeds().then(setBeds).catch(() => {});
        };
        load();
        const timer = setInterval(load, POLL_MS);   // 주기 갱신
        return () => clearInterval(timer);          // 페이지 떠날 때 타이머 정리 (누수 방지 필수)
    }, []);

    const waiting = queue.filter((q) => q.status === 'WAIT');
    const general = waiting.filter((q) => q.therapyType === 'GENERAL');
    const traction = waiting.filter((q) => q.therapyType === 'TRACTION'); 
    

    return (
        <div className={styles.board}>
            <h1>물리치료 대기 현황</h1>
            <p className={styles.boardDesc}>
              <b>[시연용]</b>  대기 순서와 예상 대기시간을 실시간으로 안내하는 화면입니다.
            </p>
            <p className={styles.summary}>
                대기 {waiting.length}명 · 치료중 {beds.filter((b) => b.status === 'occupied').length}명
            </p>
                <div className={styles.typeColumns}>
                    <TherapyColumn title="일반치료" list={general} queue={queue} beds={beds} />
                    <TherapyColumn title="견인치료" list={traction} queue={queue} beds={beds} />
                </div>
            <div className={styles.bedStrip}>
                {beds.map((b) => (
                    <span key={b.bedCode} className={b.status === 'occupied' ? styles.busy : styles.free}>
                        {b.bedCode.replace(/[^0-9]/g, '')}번 {b.status === 'occupied' ? maskName(b.patientName ?? '') : '비어있음'}
                    </span>
                ))}
            </div>
        </div>
    );
};

function TherapyColumn({ title, list, queue, beds }: {
    title: string;
    list: PatientQueueItem[];
    queue: PatientQueueItem[];
    beds: BedState[];
}) {
    const top3 = list.slice(0, 3);   // 앞 3명 큰 줄
    const rest = list.slice(3);      // 4번째부터 작은 카드

    return (
        <div className={styles.typeCol}>
            <h2 className={styles.typeTitle}>{title} <span className={styles.typeCount}>{list.length}명</span></h2>

            <div className={styles.waitList}>
                {top3.map((q) => (
                    <div key={q.id} className={styles.waitRow}>
                        <span className={styles.seq}>{q.sequence}</span>
                        <span className={styles.name}>{maskName(q.name)}님</span>
                        <span className={styles.eta}>
                            {(() => {
                                const min = estimatedWaitMinutes(q, queue, beds);
                                return min != null ? `약 ${min}분 후` : '곧 안내';
                            })()}
                        </span>
                    </div>
                ))}
                {list.length === 0 && <p>대기 없음</p>}
            </div>

            {rest.length > 0 && (
                <div className={styles.restGrid}>
                    {rest.map((q) => (
                        <div key={q.id} className={styles.restCard}>
                            <span className={styles.restSeq}>{q.sequence}</span>
                            <span className={styles.restName}>{maskName(q.name)}님</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}