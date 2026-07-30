import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Pagination } from '../../../components/ui/Pagination';
import { FaqFormModal } from './FaqFormModal';
import styles from './FaqManagement.module.css';
import { getFaqs } from '../admin.api';
import type { FaqItem } from '../types/faq.types';

const PAGE_SIZE = 10;

export const FaqManagement = () => {
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

    const loadFaqs = async (page = currentPage) => {
        const data = await getFaqs({
            keyword: searchQuery.trim() || undefined,
            currentPage: page,
            size: PAGE_SIZE,
        });
        setFaqs(data.items);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadFaqs(1).catch((err) => console.error('FAQ 목록 조회 실패:', err));
    }, []);

    const handleSearch = () => loadFaqs(1);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleOpenRegister = () => {
        setEditingFaq(null);
        setIsModalOpen(true);
    };

    const handleEdit = (faq: FaqItem) => {
        setEditingFaq(faq);
        setIsModalOpen(true);
    };

    const toggleExpand = (faqNumber: number) => {
        setExpandedId((prev) => (prev === faqNumber ? null : faqNumber));
    };

    const handleSaveSuccess = () => {
        setIsModalOpen(false);
        loadFaqs(editingFaq ? currentPage : 1).catch((err) => console.error(err));
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.searchWrapper}>
                    <Input
                        color="indigo"
                        size="sm"
                        placeholder="질문 또는 답변 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Button color="indigo" size="sm" width="auto" onClick={handleSearch}>검색</Button>
                <Button color="indigo" size="sm" width="auto" onClick={handleOpenRegister}>
                    + FAQ 등록
                </Button>
            </div>

            <div className={styles.accordionList}>
                {faqs.length === 0 && (
                    <div className={styles.emptyMessage}>등록된 FAQ가 없습니다.</div>
                )}
                {faqs.map((f) => {
                    const isOpen = expandedId === f.faqNumber;
                    return (
                        <div key={f.faqNumber} className={styles.accordionItem}>
                            <button
                                type="button"
                                className={styles.accordionHead}
                                onClick={() => toggleExpand(f.faqNumber)}
                            >
                                <span className={styles.qMark}>Q</span>
                                <span className={styles.qTitle}>{f.faqTitle}</span>
                                <span className={styles.metaText}>{f.faqAuthor} · {f.faqDate?.slice(0, 10)}</span>
                                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>⌄</span>
                            </button>

                            {isOpen && (
                                <div className={styles.accordionBody}>
                                    <p className={styles.answerText}>{f.faqContent}</p>
                                    <div className={styles.rowActions}>
                                        <Button size="xs" width="auto" variant="outline" color="indigo" onClick={() => handleEdit(f)}>
                                            수정 / 삭제
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={loadFaqs} color="indigo" />

            {isModalOpen && (
                <FaqFormModal
                    faq={editingFaq}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleSaveSuccess}
                />
            )}
        </div>
    );
};