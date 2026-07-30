export type AdminMenuIconType = 'dashboard' | 'staff' | 'patients' | 'settings' | 'notice' | 'list';

export interface AdminMenuItem {
    id: string;
    label: string;
    icon: AdminMenuIconType;
    path: string;
}

export const ADMIN_MENU_ITEMS: AdminMenuItem[] = [
    { id: 'patients', label: '환자 관리', icon: 'patients', path: '/admin/patients' },
    { id: 'employee', label: '직원 관리', icon: 'staff', path: '/admin/employee' },
    { id: 'notice', label: '공지사항 관리', icon: 'notice', path: '/admin/notice' },
    { id: 'disease-code', label: '상병 코드 항목', icon: 'list', path: '/admin/disease-code' },
    { id: 'fee', label: '기본 진료비 설정', icon: 'settings', path: '/admin/fee' }
];
