export type DoctorMenuIconType = 'history' | 'emr';

export interface DoctorMenuItem {
    id: string;
    label: string;
    icon: DoctorMenuIconType;
    path: string;
}

export const DOCTOR_MENU_ITEMS: DoctorMenuItem[] = [
    { id: 'today-call-list', label: '진료 대기', icon: 'emr', path: '/doctor/today-call-list' },
    { id: 'history', label: '진료 이력', icon: 'history', path: '/doctor/history' },
];

