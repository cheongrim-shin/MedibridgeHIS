// ============================================================
// [컴포넌트] TherapyItemTable.tsx
// 치료 항목 목록 테이블. columns(열 정의)을 이 안에 두어
// 부모 페이지를 가볍게 만듭니다. (QueueTable 과 동일 패턴)
// → columns 를 prop 으로 넘기던 기존의 any[] 타입 문제도 자연히 해결됩니다.
// ============================================================
import { Table } from '../../therapyQueue/components/Table';
import styles from '../TherapyItemManagement.module.css';
import { THERAPY_TYPE_LABEL, type TherapyItem } from '../therapyItem.types';

interface TherapyItemTableProps {
    items: TherapyItem[];                  // 보여줄(이미 필터된) 목록
    onRowClick: (item: TherapyItem) => void; // 행 클릭 → 상세 조회 열기
}

export const TherapyItemTable = ({ items, onRowClick }: TherapyItemTableProps) => {
    // 열 정의: 이 테이블 전용이라 컴포넌트 안 지역 변수로 둡니다.
    const columns = [
        {
            header: '항목 코드', key: 'code', width: '15%',
            render: (row: TherapyItem) => <span className={styles.itemCode}>{row.code}</span>,
        },
        {
            header: '치료 항목명', key: 'name', width: '30%',
            render: (row: TherapyItem) => <span className={styles.itemName}>{row.name}</span>,
        },
        {
            header: '치료 구분', key: 'type', width: '15%', align: 'center' as const,
            render: (row: TherapyItem) => <span>{THERAPY_TYPE_LABEL[row.type]}</span>,
        },
        {
            header: '소요 시간', key: 'durationMinutes', width: '10%', align: 'center' as const,
            render: (row: TherapyItem) => <span>{row.durationMinutes ? `${row.durationMinutes}분` : '-'}</span>,
        },
        {
            header: '급여 여부', key: 'insuranceType', width: '15%', align: 'center' as const,
            render: (row: TherapyItem) => <span>{row.insuranceType}</span>,
        },
        {
            header: '수가', key: 'price', width: '15%', align: 'right' as const,
            render: (row: TherapyItem) => <span className={styles.priceCell}>{row.price.toLocaleString()} 원</span>,
        },
    ];

    return (
        <Table
            columns={columns}
            data={items}
            size="md"
            color="green"
            emptyMessage="등록된 치료 항목이 없습니다."
            onRowClick={(row) => onRowClick(row as TherapyItem)}
        />
    );
};
