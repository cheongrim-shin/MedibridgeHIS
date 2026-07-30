// ============================================================
// [메인 훅] useTherapyItems.ts
// 화면(컴포넌트)이 가져야 할 상태와 로직을 전부 이 훅이 소유합니다.
// ============================================================
import { useEffect, useState } from 'react';
import {
    ApiError,
    createTherapyItem,
    deleteTherapyItem,
    fetchDeletedTherapyItems,
    fetchTherapyItems,
    restoreTherapyItem,
    updateTherapyItem,
} from './therapyItem.api';
import type { TherapyItem, TabType, ModalMode } from './therapyItem.types';

// 등록/수정/조회 모달 상태
interface ModalState {
    open: boolean;
    mode: ModalMode;
    target: TherapyItem | null;
}

// 삭제 내역 모달 상태
interface DeletedState {
    open: boolean;
    items: TherapyItem[];
    loading: boolean;
}

// 핸들러 결과(성공여부+메시지)
export interface ActionResult {
    ok: boolean;
    message: string;
}

// 에러 → 사용자 메시지 변환 (서버 메시지 우선)
const toMessage = (e: unknown, fallback: string): string =>
    e instanceof Error ? e.message : fallback;

export const useTherapyItems = () => {
    const [items, setItems] = useState<TherapyItem[]>([]);
    const [selectedTab, setSelectedTab] = useState<TabType>('전체');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modal, setModal] = useState<ModalState>({ open: false, mode: 'register', target: null });
    // 삭제 내역 모달
    const [deleted, setDeleted] = useState<DeletedState>({ open: false, items: [], loading: false });

    // ── 목록 로딩 ──
    useEffect(() => {
        fetchTherapyItems()
            .then(setItems)
            .catch(() => setError('치료 항목을 불러오지 못했습니다.'))
            .finally(() => setIsLoading(false));
    }, []);

    // ── 등록/수정/조회 모달 ──
    const openRegister = () => setModal({ open: true, mode: 'register', target: null });
    const openView = (item: TherapyItem) => setModal({ open: true, mode: 'view', target: item });
    const toEdit = () => setModal((prev) => ({ ...prev, mode: 'edit' }));
    const closeModal = () => setModal({ open: false, mode: 'register', target: null });

    // ── 저장(등록/수정 공통 진입점) ──
    const saveItem = async (item: TherapyItem, mode: ModalMode): Promise<ActionResult> => {
        if (mode === 'register') {
            // FE 1차 중복(활성 목록 기준) — 즉시 차단으로 서버 왕복 절약
            const dup = items.some((i) => i.code.toUpperCase() === item.code.toUpperCase());
            if (dup) return { ok: false, message: '이미 등록된 항목 코드입니다.' };

            try {
                await createTherapyItem(item);
                setItems(await fetchTherapyItems());
                return { ok: true, message: '정상 등록되었습니다.' };
            } catch (e) {
                // 안내만 (복원은 '삭제 내역'에서)
                if (e instanceof ApiError && e.errorCode === 'DELETED_CODE_EXISTS') {
                    return {
                        ok: false,
                        message: `이미 삭제 내역에 있는 치료 코드입니다.\n(복원은 '삭제 내역'에서 확인해 주세요)`,
                    };
                }
                return { ok: false, message: toMessage(e, '등록 중 오류가 발생했습니다.') };
            }
        }

        if (mode === 'edit') {
            try {
                await updateTherapyItem(item);
                setItems(await fetchTherapyItems());
                return { ok: true, message: '수정되었습니다.' };
            } catch (e) {
                return { ok: false, message: toMessage(e, '수정 중 오류가 발생했습니다.') };
            }
        }
        return { ok: false, message: '' };
    };

    // ── 삭제(소프트 삭제) ──
    const removeItem = async (code: string): Promise<ActionResult> => {
        try {
            await deleteTherapyItem(code);
            setItems(await fetchTherapyItems());
            return { ok: true, message: '치료 항목이 삭제되었습니다.' };
        } catch (e) {
            return { ok: false, message: toMessage(e, '삭제 중 오류가 발생했습니다.') };
        }
    };

    // ── 삭제 내역 모달 열기/닫기 ──
    const openDeleted = async () => {
        setDeleted({ open: true, items: [], loading: true });
        try {
            const list = await fetchDeletedTherapyItems();
            setDeleted({ open: true, items: list, loading: false });
        } catch {
            setDeleted({ open: true, items: [], loading: false });
            alert('삭제 내역을 불러오지 못했습니다.');
        }
    };
    const closeDeleted = () => setDeleted({ open: false, items: [], loading: false });

    // ── 복원 (삭제 내역 모달에서 호출) ──
    const restoreItem = async (code: string): Promise<ActionResult> => {
        try {
            await restoreTherapyItem(code);
            // 활성 목록 + 삭제 목록 동시 갱신
            const [active, del] = await Promise.all([fetchTherapyItems(), fetchDeletedTherapyItems()]);
            setItems(active);
            setDeleted((prev) => ({ ...prev, items: del }));
            return { ok: true, message: '복원되었습니다.' };
        } catch (e) {
            return { ok: false, message: toMessage(e, '복원 중 오류가 발생했습니다.') };
        }
    };

    // ── 파생: 탭 + 검색 필터 ──
    const filteredItems = items.filter((item) => {
        const matchesTab = selectedTab === '전체' || item.type === selectedTab;
        const q = searchQuery.trim().toLowerCase();
        const matchesSearch =
            q === '' ||
            item.name.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q);
        return matchesTab && matchesSearch;
    });

    return {
        filteredItems,
        isLoading,
        error,
        selectedTab,
        setSelectedTab,
        searchQuery,
        setSearchQuery,
        modal,
        openRegister,
        openView,
        toEdit,
        closeModal,
        saveItem,
        removeItem,
        // 삭제 내역/복원
        deleted,
        openDeleted,
        closeDeleted,
        restoreItem,
    };
};
