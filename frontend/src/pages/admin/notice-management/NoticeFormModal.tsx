import { useState, type FormEvent } from 'react';
import { Modal } from '../../../components/Modal';
import { Select } from '../../../components/Select';
import { Input } from '../../../components/Input';
import { Textarea } from '../../../components/Textarea';
import { FormGroup } from '../../../components/FormGroup';
import { FormRow } from '../../../components/FormRow';
import { Button } from '../../../components/ui/Button';
import { createNotice, updateNotice, deleteNotice } from '../admin.api';
import type { NoticeItem, NoticeCategory } from '../types/notice.types';
import { NOTICE_CATEGORIES } from '../types/notice.types';

interface NoticeFormModalProps {
    notice: NoticeItem | null; // null이면 등록, 있으면 수정
    onClose: () => void;
    onSuccess: () => void;
}

export const NoticeFormModal = ({ notice, onClose, onSuccess }: NoticeFormModalProps) => {
    const isEdit = notice !== null;

    const [title, setTitle] = useState(notice?.noticeTitle ?? '');
    const [category, setCategory] = useState<NoticeCategory>(notice?.noticeCategory ?? NOTICE_CATEGORIES[0]);
    const [content, setContent] = useState(notice?.noticeContent ?? '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setErrorMessage('제목과 내용을 모두 입력해 주세요.');
            return;
        }
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            const body = { noticeTitle: title.trim(), noticeContent: content.trim(), noticeCategory: category };
            if (isEdit) {
                await updateNotice(notice.noticeNumber, body);
            } else {
                await createNotice(body);
            }
            onSuccess();
        } catch {
            setErrorMessage('저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!notice) return;
        if (!window.confirm('정말 이 공지사항을 삭제하시겠습니까?')) return;
        try {
            await deleteNotice(notice.noticeNumber);
            onSuccess();
        } catch {
            window.alert('삭제에 실패했습니다.');
        }
    };

    return (
        <Modal onClick={onClose}>
            <Modal.Header>
                <Modal.Title>{isEdit ? '공지사항 수정' : '공지사항 등록'}</Modal.Title>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>
            <Modal.Content>
                <form onSubmit={handleSubmit}>
                    <FormGroup size="md">
                        <FormRow columns={2}>
                            <Select
                                label="분류"
                                size="md"
                                color="indigo"
                                value={category}
                                onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                                required
                            >
                                {NOTICE_CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </Select>
                            <Input label="작성자" size="md" color="indigo" value={notice?.noticeAuthor ?? '로그인 계정'} disabled readOnly />
                        </FormRow>

                        <FormRow columns={1}>
                            <Input
                                label="공지 제목"
                                size="md"
                                color="indigo"
                                placeholder="공지사항 제목을 입력하세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </FormRow>

                        <FormRow columns={1}>
                            <Textarea
                                label="상세 내용"
                                size="md"
                                color="indigo"
                                placeholder="공지사항 내용을 입력하세요"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={8}
                                required
                            />
                        </FormRow>
                    </FormGroup>

                    {errorMessage && <p style={{ color: '#dc2626', fontSize: 13, margin: '16px 0 0' }}>{errorMessage}</p>}

                    <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
                        {isEdit && (
                            <Button type="button" variant="outline" color="red" size="md" width="auto" onClick={handleDelete}>
                                삭제
                            </Button>
                        )}
                        <Button type="button" variant="outline" color="indigo" size="md" onClick={onClose}>취소</Button>
                        <Button type="submit" color="indigo" size="md" disabled={isSubmitting}>
                            {isSubmitting ? '저장 중...' : '저장'}
                        </Button>
                    </div>
                </form>
            </Modal.Content>
        </Modal>
    );
};