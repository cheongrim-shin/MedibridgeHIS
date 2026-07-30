export type PhysicalTherapistMenuIconType = 'therapy-queue' | 'therapy-item-management';

export interface PhysicalTherapistMenuItem {
    id: string;
    label: string;
    icon: PhysicalTherapistMenuIconType;
    path: string;
}

export const PHYSICAL_THERAPIST_MENU_ITEMS: PhysicalTherapistMenuItem[] = [
    { id: 'therapy-queue', label: '물리치료 대기열', icon: 'therapy-queue', path: '/physical-therapist/therapy-queue' },
    { id: 'therapy-item-management', label: '치료 항목', icon: 'therapy-item-management', path: '/physical-therapist/therapy-item-management' },
];
