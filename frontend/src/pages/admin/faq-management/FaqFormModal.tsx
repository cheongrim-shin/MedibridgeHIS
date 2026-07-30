import { useState, type FormEvent } from 'react';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { Textarea } from '../../../components/Textarea';
import { FormGroup } from '../../../components/FormGroup';
import { FormRow } from '../../../components/FormRow';
import { Button } from '../../../components/ui/Button';
import { createFaq, updateFaq, deleteFaq } from '../admin.api';
import type { FaqItem } from '../types/faq.types';

interface FaqFormModalProps {
    faq: FaqItem | null;
    onClose: () => void;
    onSuccess: () => void;
}

export const FaqFormModal = ({ faq, onClose, onSuccess }: FaqFormModalProps) => {
    const isEdit = faq !== null;

    const [title, setTitle] = useState(faq?.faqTitle ?? '');
    const [content, setContent] = useState(faq?.faqContent ?? '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setErrorMessage('질문과 답변을 모두 입력해 주세요.');
            return;
        }
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            const body = { faqTitle: title.trim(), faqContent: content.trim() };
            if (isEdit) {
                await updateFaq(faq.faqNumber, body);
            } else {
                await createFaq(body);
            }
            onSuccess();
        } catch {
            setErrorMessage('저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!faq) return;
        if (!window.confirm('정말 이 FAQ를 삭제하시겠습니까?')) return;
        try {
            await deleteFaq(faq.faqNumber);
            onSuccess();
        } catch {
            window.alert('삭제에 실패했습니다.');
        }
    };

    return (
        <Modal onClick={onClose}>
            <Modal.Header>
                <Modal.Title>{isEdit ? 'FAQ 수정' : 'FAQ 등록'}</Modal.Title>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>
            <Modal.Content>
                <form onSubmit={handleSubmit}>
                    <FormGroup size="md">
                        <FormRow columns={1}>
                            <Input
                                label="질문 (Q)"
                                size="md"
                                color="indigo"
                                placeholder="자주 묻는 질문을 입력하세요"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </FormRow>
                        <FormRow columns={1}>
                            <Textarea
                                label="답변 (A)"
                                size="md"
                                color="indigo"
                                placeholder="답변 내용을 입력하세요"
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