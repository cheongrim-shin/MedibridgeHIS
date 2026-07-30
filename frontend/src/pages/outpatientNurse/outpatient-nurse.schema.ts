export type OutpatientMenuIconType = 'list'|'clipboard' |'history'

export interface OutpatientMenuItem {
    id : string; // 고유식별자
    label : string; // 화면출력이름
    icon : OutpatientMenuIconType; // 아이콘종류
    path : string; // 이동할 경로
}

export const OUTPATIENT_MENU_ITEMS : OutpatientMenuItem[] = [
    {id : 'queue', label : '진료 대기열', icon: 'list', path: '/outpatient-nurse/queue'},
    {id : 'injection-order', label : '주사 오더', icon: 'clipboard', path: '/outpatient-nurse/injection-order'},
    {id : 'injection-history', label : '주사 이력', icon: 'history', path: '/outpatient-nurse/injection-history'}
]