import type {ReactNode} from 'react';
import {
    IconBuilding,
    IconNurse,
    IconDoctor,
    IconPill,
    IconTherapist,
    IconPatient,
} from './roleShortcuts.icons';

export interface RoleShortcut {
    id: string;
    label: string;
    icon: ReactNode;
    path: string | null;
    external?: boolean; // true면 새창(window.open), false/undefined면 내부 라우팅(navigate)
}

export const ROLE_SHORTCUTS: RoleShortcut[] = [
    {id: 'receptionist', label: '원무 행정', icon: <IconBuilding />, path: '/receptionist'},
    {id: 'outpatient-nurse', label: '외래 간호사', icon: <IconNurse />, path: '/outpatient-nurse'},
    {id: 'doctor', label: '의사', icon: <IconDoctor />, path: '/doctor'},
    {id: 'pharmacist', label: '약사', icon: <IconPill />, path: '/pharmacist'},
    {id: 'physical-therapist', label: '물리치료사', icon: <IconTherapist />, path: '/physical-therapist'},
    {id: 'patient-portal', label: '환자포털', icon: <IconPatient />, path: 'http://localhost/patient/main', external: true},
];