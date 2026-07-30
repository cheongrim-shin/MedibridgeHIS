export interface InjectionRoute {
    id: string;
    label: string;
}

export const INJECTION_ORDER_ROUTE: InjectionRoute[] = [
    { id: "all", label: "전체" },
];

export interface InjectionUnit {
    id: string;
    label: string;
}

export const INJECTION_ORDER_UNIT: InjectionUnit[] = [
    { id: "T201", label: "ml" },
    { id: "T202", label: "정" },
    { id: "T203", label: "vial" },
    { id: "T204", label: "amp" },
    { id: "T205", label: "Ea" },
];

export const getUnitLabel = (unitId: string) => {
    const found = INJECTION_ORDER_UNIT.find((r) => r.id === unitId);
    return found ? found.label : unitId;
};