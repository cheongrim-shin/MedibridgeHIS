export interface FaqItem {
    faqNumber: number;
    faqTitle: string;
    faqContent: string;
    faqDate: string;
    faqAuthor: string;
}

export interface FaqRequest {
    faqTitle: string;
    faqContent: string;
}