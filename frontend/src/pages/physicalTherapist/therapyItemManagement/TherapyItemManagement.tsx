// ============================================================
// [페이지] TherapyItemManagement.tsx  (조립 전담)
// 상태/로직은 useTherapyItems 훅이, 화면 조각은 각 컴포넌트가 담당.
// ============================================================
import styles from './TherapyItemManagement.module.css';
import { THERAPY_TABS, THERAPY_TYPE_LABEL } from './therapyItem.types';
import type { TabType } from './therapyItem.types';
import { useTherapyItems } from './useTherapyItems';
import { TherapyItemFilter } from './components/TherapyItemFilter';
import { TherapyItemTable } from './components/TherapyItemTable';
import { TherapyItemModal } from './components/TherapyItemModal';
import { TherapyItemDeletedModal } from './components/TherapyItemDeletedModal';
import { Tabs } from '../therapyQueue/components/Tabs';
import { Button } from '../therapyQueue/components/Button';

export const TherapyItemManagement = () => {
    const {
        filteredItems, isLoading, error,
        selectedTab, setSelectedTab, searchQuery, setSearchQuery,
        modal, openRegister, openView, toEdit, closeModal, saveItem, removeItem,
        // 삭제 내역/복원
        deleted, openDeleted, closeDeleted, restoreItem,
    } = useTherapyItems();

    if (isLoading) return <div>불러오는 중…</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.mainCard}>
                <p className={styles.pageDesc}>
                    <b>[시연용]</b> 물리치료 항목(치료 구분·수가·급여 여부)을 등록·수정·삭제하는 마스터 관리 화면입니다.</p>
                {/* 검색 + 등록 버튼 */}
                <TherapyItemFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onRegister={openRegister}
                />

                {/* 탭(왼쪽) + 삭제 내역 버튼(오른쪽) */}
                <div
                    className={styles.tabContainer}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                    <Tabs activeTab={selectedTab} onChange={(val) => setSelectedTab(val as TabType)} color="green">
                        <Tabs.List>
                            {THERAPY_TABS.map((tab) => (
                                <Tabs.Tab key={tab} value={tab}>{tab === '전체' ? '전체' : THERAPY_TYPE_LABEL[tab]}</Tabs.Tab>
                            ))}
                        </Tabs.List>
                    </Tabs>
                </div>

                {/* 테이블 */}
                <div className={styles.tableSection}>
                    <TherapyItemTable items={filteredItems} onRowClick={openView} />
                </div>

                {/*추가: 표(수가 항목) 아래 오른쪽 정렬 */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                    <Button type="button" color="gray" size="sm" variant="outline" onClick={openDeleted}>
                        삭제 내역
                    </Button>
                </div>
            </div>

            {/* 등록/수정/조회 모달 */}
            {modal.open && (
                <TherapyItemModal
                    mode={modal.mode}
                    initial={modal.target}
                    onSubmit={saveItem}
                    onDelete={removeItem}
                    onToEdit={toEdit}
                    onClose={closeModal}
                />
            )}

            {/* 삭제 내역/복원 모달 */}
            {deleted.open && (
                <TherapyItemDeletedModal
                    items={deleted.items}
                    loading={deleted.loading}
                    onRestore={restoreItem}
                    onClose={closeDeleted}
                />
            )}
        </div>
    );
};
