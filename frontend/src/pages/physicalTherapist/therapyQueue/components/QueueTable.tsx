import styles from '../TherapyQueue.module.css';
import type { PatientQueueItem } from '../therapyQueue.types';
import { getAgeAndGender } from '../therapyQueue.utils';
import { Table } from './Table';

interface QueueTableProps {
    filteredQueue: PatientQueueItem[];
    selectedPatient: PatientQueueItem | null;
    setSelectedPatient: (p: PatientQueueItem | null) => void;
}

export const QueueTable = ({ filteredQueue, selectedPatient, setSelectedPatient}: QueueTableProps) => {
    const columns = [
        {
            header: '환자명',
            key: 'name',
            width: '12%',
            render: (row: PatientQueueItem) => (
                <div className={styles.patientInfoWrapper}>
                    <span className={styles.boldText}>{row.name}</span>  
                </div>
            )
        },
        {
            header: '생년월일', key: 'birthDate', width: '15%', align: 'center' as const,
            render: (row: PatientQueueItem) => <span className={styles.normalText}>{row.birthDate}</span>
        },
        {
            header: '나이/성별', key: 'ageGender', width: '10%', align: 'center' as const,
            render: (row: PatientQueueItem) => <span className={styles.normalText}>{getAgeAndGender(row.birthDate, row.gender)}</span>
        },
        {
            header: '처방 치료', key: 'therapyItems', width: '23%',
            render: (row: PatientQueueItem) => (
                <div className={styles.therapyCell}>
                    <span className={styles.ellipsisText} title={row.therapyItems}>
                        {row.therapyItems}
                    </span>
                </div>
            )
        },
        {
            header: <div style={{ textAlign: 'center', width: '100%' }}>예상 대기시간</div>,
            key: 'estimatedWaitTime', width: '12%',
            render: (row: PatientQueueItem) => (
                <div className={styles.normalText} style={{ textAlign: 'center', width: '100%' }}>
                    {row.estimatedWaitTime !== undefined ? `${row.estimatedWaitTime}분` : '-'}
                </div>
            )
        },
        {
            header: <div style={{ textAlign: 'center', width: '100%' }}>소요 시간</div>,
            key: 'durationMinutes', width: '8%',
            render: (row: PatientQueueItem) => (
                <div className={styles.normalText} style={{ textAlign: 'center', width: '100%' }}>
                    {row.durationMinutes ? `${row.durationMinutes}분` : '-'}
                </div>
            )
        },
        {
            header: <div style={{ textAlign: 'center', width: '100%' }}>접수 시간</div>,
            key: 'time', width: '12%',
            render: (row: PatientQueueItem) => (
                <div className={styles.normalText} style={{ textAlign: 'center', width: '100%' }}>{row.time}</div>
            )
        },
        {
            header: <div style={{ textAlign: 'right', width: '100%', paddingRight: '8px' }}>순번</div>,
            key: 'sequence', width: '8%',
            render: (row: PatientQueueItem) => (
                <div className={styles.boldText} style={{ textAlign: 'right', width: '100%', paddingRight: '8px' }}>{row.sequence}</div>
            )
        }
    ];

    return (
        <Table
            columns={columns}
            data={filteredQueue}
            size="md"
            color="indigo"
            onRowClick={(row) => setSelectedPatient(row as PatientQueueItem)}
            emptyMessage="이 베드 종류의 대기 환자가 없습니다."
            rowClassName={(row) => row.id === selectedPatient?.id ? styles.activeRow : ''}
        />
    );
};
