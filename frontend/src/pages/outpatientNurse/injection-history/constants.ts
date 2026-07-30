import type { InjectionHistoryTab } from "../types";

export const INJECTION_HISTORY_ROUTE: InjectionHistoryTab[] = [
    {id: "all", label: "전체"},
];

export const INJECTION_HISTORY_PERIOD: InjectionHistoryTab[] = [
    {id: "", label: "전체 시간"},
    {id: "morning", label: "오전 (9시~13시)"},
    {id: "afternoon", label: "오후 (13시~18시)"},
]