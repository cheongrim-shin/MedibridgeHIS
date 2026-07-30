import { useEffect, useState } from 'react';
import { Table } from '../../../components/ui/Table';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/Select';
import { Pagination } from '../../../components/ui/Pagination';
import { QnaAnswerModal } from './QnaAnswerModal';
import styles from './QnaManagement.module.css';
import { getQnas, getCommonCodesByGroup, deleteQna } from '../admin.api';
import type { QnaItem, QnaStatus } from '../types/qna.types';
import { QNA_STATUS_LABEL } from '../types/qna.types';
import type { CommonCodeVO } from '../../pharmacist/commonCode.types';

const PAGE_SIZE = 10;

export const QnaManagement = () => {
    const [qnas, setQnas] = useState<QnaItem[]>([]);
    const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<QnaStatus | ''>('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQna, setSelectedQna] = useState<QnaItem | null>(null);

    const loadQnas = async (page = currentPage) => {
        const data = await getQnas({
            keyword: searchQuery.trim() || undefined,
            status: statusFilter || undefined,
            currentPage: page,
            size: PAGE_SIZE,
        });
        setQnas(data.items);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
    };

    const loadCategoryMap = async () => {
        const codes: CommonCodeVO[] = await getCommonCodesByGroup('Q');
        const map: Record<string, string> = {};
        codes.forEach((c) => { map[c.commonCodeNumber] = c.codeName1; });
        setCategoryMap(map);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCategoryMap().catch((err) => console.error('문의 분류 코드 조회 실패:', err));
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadQnas(1).catch((err) => console.error('문의 목록 조회 실패:', err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFilter]);

    const handleSearch = () => loadQnas(1);
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleRowClick = (qna: QnaItem) => {
        setSelectedQna(qna);
        setIsModalOpen(true);
    };

    const handleDelete = async (e: React.MouseEvent, qandaNumber: string) => {
        e.stopPropagation();
        if (!window.confirm('정말 이 문의를 삭제하시겠습니까?')) return;
        try {
            await deleteQna(qandaNumber);
            loadQnas(currentPage).catch((err) => console.error(err));
        } catch {
            window.alert('삭제에 실패했습니다.');
        }
    };

    const handleSaveSuccess = () => {
        setIsModalOpen(false);
        loadQnas(currentPage).catch((err) => console.error(err));
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <div className={styles.searchWrapper}>
                    <Input
                        color="indigo"
                        size="sm"
                        placeholder="제목, 회원번호, 분류 검색..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <Button color="indigo" size="sm" width="auto" onClick={handleSearch}>검색</Button>

                <div className={styles.statusFilterWrapper}>
                    <Select
                        color="indigo"
                        size="sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as QnaStatus | '')}
                    >
                        <option value="">전체 상태</option>
                        <option value="WAIT">답변대기</option>
                        <option value="COMPLETE">답변완료</option>
                    </Select>
                </div>
            </div>

            <Table color="indigo" widths={[10, 12, 38, 14, 14, 6, 6]}>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>문의번호</Table.Cell>
                        <Table.Cell>분류</Table.Cell>
                        <Table.Cell>제목</Table.Cell>
                        <Table.Cell>문의자</Table.Cell>
                        <Table.Cell>작성일</Table.Cell>
                        <Table.Cell align="center">상태</Table.Cell>
                        <Table.Cell align="center">삭제</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body emptyMessage="접수된 문의가 없습니다.">
                    {qnas.map((q) => (
                        <Table.Row key={q.qandaNumber} onClick={() => handleRowClick(q)}>
                            <Table.Cell>{q.qandaNumber}</Table.Cell>
                            <Table.Cell>{categoryMap[q.categoryCode] ?? q.categoryCode}</Table.Cell>
                            <Table.Cell><span className={styles.titleLink}>{q.subject}</span></Table.Cell>
                            <Table.Cell>{q.inquirer}</Table.Cell>
                            <Table.Cell>{q.dateWritten?.slice(0, 10)}</Table.Cell>
                            <Table.Cell align="center">
                                <span className={`${styles.statusBadge} ${q.status === 'COMPLETE' ? styles.statusComplete : styles.statusWait}`}>
                                    {QNA_STATUS_LABEL[q.status]}
                                </span>
                            </Table.Cell>
                            <Table.Cell align="center">
                                <button
                                    type="button"
                                    className={styles.deleteBtn}
                                    onClick={(e) => handleDelete(e, q.qandaNumber)}
                                >
                                    삭제
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={loadQnas} color="indigo" />

            {isModalOpen && selectedQna && (
                <QnaAnswerModal
                    qna={selectedQna}
                    categoryLabel={categoryMap[selectedQna.categoryCode] ?? selectedQna.categoryCode}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleSaveSuccess}
                />
            )}
        </div>
    );
};