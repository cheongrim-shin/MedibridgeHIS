export type PharmacistMenuIconType = 'prescriptions' | 'settings' | 'medicine' | 'history';

export interface PharmacistMenuItem {
    id: string;
    label: string;
    icon: PharmacistMenuIconType;
    path: string;
}

export const PHARMACIST_MENU_ITEMS: PharmacistMenuItem[] = [
    {id: 'dispensing-order', label: '조제 오더', icon: 'prescriptions', path: '/pharmacist/dispensing-order'},
    {id: 'dispensing-history', label: '조제 이력', icon: 'history', path: '/pharmacist/dispensing-history'},
    {id: 'medicine-registration', label: '약품 목록', icon: 'medicine', path: '/pharmacist/medicine-registration'}
];