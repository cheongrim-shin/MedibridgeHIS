//관리자 메뉴 아이콘 타입 
export type AdminMenuIconType =
    | 'patient-management'
    | 'employee-management'
    | 'fee-management'
    | 'statistics-management'
    | 'role-shortcuts'
    | 'notice-management'
    | 'faq-management'
    | 'qna-management';

//메뉴 아이템 구조 
export interface AdminMenuItem {
    id: string;
    label: string;
    icon : AdminMenuIconType;
    path: string;
}

//실제 메뉴 목록 
export const ADMIN_MENU_ITEMS: AdminMenuItem[] =[
    {
        id: 'patient-management',
        label: '환자 관리',
        icon : 'patient-management',
        path: '/admin/patient-management',
    },
    {
        id: 'employee-management',
        label: '직원 관리',
        icon: 'employee-management',
        path: '/admin/employee-management',
    },
    // {
    //     id: 'fee-management',
    //     label: '기본진료비 관리',
    //     icon: 'fee-management',
    //     path: '/admin/fee-management',
    // },
    {
        id: 'notice-management',
        label: '공지사항 관리',
        icon: 'notice-management',
        path: '/admin/notice-management'
    },
    {
        id: 'faq-management',
        label: 'FAQ 관리',
        icon: 'faq-management',
        path: '/admin/faq-management'
    },
    {
        id: 'qna-management',
        label: '문의 관리',
        icon: 'qna-management',
        path: '/admin/qna-management'
    },
    {
        id: 'statistics-management',
        label: '통계',
        icon: 'statistics-management',
        path: '/admin/statistics-management',
    },
    {
        id: 'role-shortcuts',
        label: '통합 업무 화면',
        icon: 'role-shortcuts',
        path: '/admin/role-shortcuts',
    },
];