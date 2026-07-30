export type NoticeCategory = '운영안내' | '시설안내' | '시스템';

export const NOTICE_CATEGORIES: NoticeCategory[] = ['운영안내', '시설안내', '시스템'];

export interface NoticeItem {
    noticeNumber: number;
    noticeTitle: string;
    noticeContent: string;
    noticeDate: string;
    views: number;
    noticeCategory: NoticeCategory;
    noticeAuthor: string;
}

export interface NoticeRequest {
    noticeTitle: string;
    noticeContent: string;
    noticeCategory: NoticeCategory;
}