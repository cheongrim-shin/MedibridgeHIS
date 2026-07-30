// ============================================================
// [컴포넌트] TherapyItemDeletedModal.tsx (신규)
// 삭제(USED='N')된 치료 항목 목록을 보여주고, 행마다 '복원' 버튼 제공.
// 표현 컴포넌트 — 데이터/복원로직은 부모(훅)에서 받은 props 만 사용.
// ============================================================
import type { TherapyItem } from '../therapyItem.types';
import type { ActionResult } from '../useTherapyItems';
import { Modal } from '../../therapyQueue/components/Modal';
import { Table } from '../../therapyQueue/components/Table';
import { Button } from '../../therapyQueue/components/Button';

interface TherapyItemDeletedModalProps {
    items: TherapyItem[];                              // 삭제 내역 목록
    loading: boolean;                                  // 로딩 표시
    onRestore: (code: string) => Promise<ActionResult>; // 복원 위임
    onClose: () => void;                              
}

export const TherapyItemDeletedModal = ({ items, loading, onRestore, onClose }: TherapyItemDeletedModalProps) => {

    // 복원 클릭: 확인 → 복원 → 결과 알림
    const handleRestore = async (code: string) => {
        if (!window.confirm(`${code} 항목을 복원하시겠습니까?`)) return;
        const result = await onRestore(code);
        alert(result.message);
    };

    // 열 정의 (마지막 열에 복원 버튼)
    const columns = [
        { header: '코드', key: 'code', width: '14%', render: (r: TherapyItem) => <span>{r.code}</span> },
        { header: '치료 항목명', key: 'name', width: '34%', render: (r: TherapyItem) => <span>{r.name}</span> },
        { header: '치료 구분', key: 'type', width: '16%', align: 'center' as const, render: (r: TherapyItem) => <span>{r.type}</span> },
        { header: '수가', key: 'price', width: '18%', align: 'right' as const, render: (r: TherapyItem) => <span>{r.price.toLocaleString()} 원</span> },
        {
            header: '', key: 'action', width: '18%', align: 'center' as const,
            render: (r: TherapyItem) => (
                <Button
                    type="button" color="green" size="xs"
                    onClick={(e) => { e.stopPropagation(); handleRestore(r.code); }}
                >
                    복원
                </Button>
            ),
        },
    ];

    return (
        <Modal onClick={onClose} variant="tabbed">
            <Modal.Header>
                <Modal.Title>삭제된 치료 항목</Modal.Title>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>

            <Modal.Content>
                {loading ? (
                    <div style={{ padding: '24px', textAlign: 'center' }}>불러오는 중…</div>
                ) : (
                    <Table
                        columns={columns}
                        data={items}
                        size="md"
                        color="green"
                        emptyMessage="삭제된 치료 항목이 없습니다."
                    />
                )}
            </Modal.Content>
        </Modal>
    );
};
