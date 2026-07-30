import type { ReactNode } from 'react';

export interface ReceptionistMenuItem {
    id: string;
    label: string;
    path: string;
    icon: ReactNode;
}

export const RECEPTIONIST_MENU_ITEMS: ReceptionistMenuItem[] = [
    {
        id: 'counter',
        label: '접수/수납',
        path: '/receptionist/counter',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
    },
    
    {
        id: 'appointments',
        label: '예약 관리',
        path: '/receptionist/appointments',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="14" x2="8.01" y2="14" />
                <line x1="12" y1="14" x2="12.01" y2="14" />
                <line x1="16" y1="14" x2="16.01" y2="14" />
                <line x1="8" y1="18" x2="8.01" y2="18" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
                <line x1="16" y1="18" x2="16.01" y2="18" />
            </svg>
        ),
    },
    {
        id: 'patient-document',
        label: '서류 발급',
        path: '/receptionist/patient-document',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <polyline points="9 15 11 17 15 13" />
            </svg>
        ),
    },
];
