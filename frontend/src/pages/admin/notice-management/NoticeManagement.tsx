import { useEffect, useState } from 'react';
import { Table } from '../../../components/ui/Table';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/Select';
import { Pagination } from '../../../components/ui/Pagination';
import { NoticeFormModal } from './NoticeFormModal';
import styles from './NoticeManagement.module.css';
import { getNotices } from '../admin.api';
import type { NoticeItem } from '../types/notice.types';
import { NOTICE_CATEGORIES } from '../types/notice.types';

const PAGE_SIZE = 10;

export const NoticeManagement = () => {
    const [notices, setNotices] = useState<NoticeItem[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<NoticeItem | null>(null);

    const loadNotices = async (page = currentPage) => {
        const data = await getNotices({
            keyword: searchQuery.trim() || undefined,
            category: categoryFilter || undefined,
            currentPage: page,
            size: PAGE_SIZE,
        });
        setNotices(data.items);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadNotices(1).catch((err) => console.error('공지사항 목록 조회 실패:', err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryFilter]);

    const handleSearch = () => loadNotices(1);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleOpenRegister = () => {
        setEditingNotice(null);
        setIsModalOpen(true);
    };

    const handleRowClick = (notice: NoticeItem) => {
        setEditingNotice(notice);
        setIsModalOpen(true);
    };

    const handleSaveSuccess = () => {
        setIsModalOpen(false);
        loadNotices(editingNotice ? currentPage : 1).catch((err) => console.error(err));
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.searchWrapper}>
                    <Input
                        color="indigo"
                        size="sm"
                        placeholder="제목 또는 내용 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Button color="indigo" size="sm" width="auto" onClick={handleSearch}>검색</Button>

                <div className={styles.categoryFilterWrapper}>
                    <Select
                        color="indigo"
                        size="sm"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">전체 분류</option>
                        {NOTICE_CATEGORIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </Select>
                </div>

                <Button color="indigo" size="sm" width="auto" onClick={handleOpenRegister}>
                    + 공지 등록
                </Button>
            </div>

            <Table color="indigo" widths={[8, 12, 50, 12, 12, 6]}>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>번호</Table.Cell>
                        <Table.Cell>분류</Table.Cell>
                        <Table.Cell>제목</Table.Cell>
                        <Table.Cell>작성자</Table.Cell>
                        <Table.Cell>작성일</Table.Cell>
                        <Table.Cell align="center">조회수</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body emptyMessage="등록된 공지사항이 없습니다.">
                    {notices.map((n) => (
                        <Table.Row key={n.noticeNumber} onClick={() => handleRowClick(n)}>
                            <Table.Cell>{n.noticeNumber}</Table.Cell>
                            <Table.Cell><span className={styles.categoryBadge}>{n.noticeCategory}</span></Table.Cell>
                            <Table.Cell><span className={styles.titleLink}>{n.noticeTitle}</span></Table.Cell>
                            <Table.Cell>{n.noticeAuthor}</Table.Cell>
                            <Table.Cell>{n.noticeDate?.slice(0, 10)}</Table.Cell>
                            <Table.Cell align="center">{n.views}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={loadNotices} color="indigo" />

            {isModalOpen && (
                <NoticeFormModal
                    notice={editingNotice}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleSaveSuccess}
                />
            )}
        </div>
    );
};