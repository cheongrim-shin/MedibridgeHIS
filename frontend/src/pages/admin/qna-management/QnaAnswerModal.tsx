import { useState, type FormEvent } from 'react';
import { Modal } from '../../../components/Modal';
import { Input } from '../../../components/Input';
import { Textarea } from '../../../components/Textarea';
import { FormGroup } from '../../../components/FormGroup';
import { FormRow } from '../../../components/FormRow';
import { Button } from '../../../components/ui/Button';
import { answerQna } from '../admin.api';
import type { QnaItem } from '../types/qna.types';
import { QNA_STATUS_LABEL } from '../types/qna.types';

interface QnaAnswerModalProps {
    qna: QnaItem;
    categoryLabel: string;
    onClose: () => void;
    onSuccess: () => void;
}

export const QnaAnswerModal = ({ qna, categoryLabel, onClose, onSuccess }: QnaAnswerModalProps) => {
    const isAnswered = qna.status === 'COMPLETE';
    const [responseDetails, setResponseDetails] = useState(qna.responseDetails ?? '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!responseDetails.trim()) {
            setErrorMessage('답변 내용을 입력해 주세요.');
            return;
        }
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await answerQna(qna.qandaNumber, { responseDetails: responseDetails.trim() });
            onSuccess();
        } catch {
            setErrorMessage('답변 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal onClick={onClose}>
            <Modal.Header>
                <Modal.Title>문의 답변 {isAnswered ? '수정' : '등록'}</Modal.Title>
                <Modal.CloseBtn onClick={onClose} />
            </Modal.Header>
            <Modal.Content>
                <FormGroup size="md">
                    <FormRow columns={3}>
                        <Input label="문의번호" size="md" color="indigo" value={qna.qandaNumber} disabled readOnly />
                        <Input label="분류" size="md" color="indigo" value={categoryLabel} disabled readOnly />
                        <Input label="상태" size="md" color="indigo" value={QNA_STATUS_LABEL[qna.status]} disabled readOnly />
                    </FormRow>

                    <FormRow columns={2}>
                        <Input label="문의자" size="md" color="indigo" value={qna.inquirer} disabled readOnly />
                        <Input label="작성일" size="md" color="indigo" value={qna.dateWritten?.slice(0, 10) ?? ''} disabled readOnly />
                    </FormRow>

                    <FormRow columns={1}>
                        <Input label="제목" size="md" color="indigo" value={qna.subject} disabled readOnly />
                    </FormRow>

                    <FormRow columns={1}>
                        <Textarea
                            label="문의 내용"
                            size="md"
                            color="indigo"
                            value={qna.inquiryDetails}
                            disabled
                            readOnly
                            rows={4}
                        />
                    </FormRow>

                    <form onSubmit={handleSubmit}>
                        <FormRow columns={1}>
                            <Textarea
                                label="답변 내용"
                                size="md"
                                color="indigo"
                                placeholder="답변 내용을 입력하세요"
                                value={responseDetails}
                                onChange={(e) => setResponseDetails(e.target.value)}
                                rows={6}
                                required
                            />
                        </FormRow>

                        {errorMessage && <p style={{ color: '#dc2626', fontSize: 13, margin: '12px 0 0' }}>{errorMessage}</p>}

                        <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
                            <Button type="button" variant="outline" color="indigo" size="md" onClick={onClose}>취소</Button>
                            <Button type="submit" color="indigo" size="md" disabled={isSubmitting}>
                                {isSubmitting ? '저장 중...' : isAnswered ? '답변 수정' : '답변 등록'}
                            </Button>
                        </div>
                    </form>
                </FormGroup>
            </Modal.Content>
        </Modal>
    );
};