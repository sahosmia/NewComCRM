export interface SelectOption<V = string | number, M = Record<string, unknown>> {
    value: V;
    label: string;
    meta?: M;
}

export interface LookupData {
    customers?: SelectOption[];
    requirements?: SelectOption[];
    users?: SelectOption[];
    companies?: SelectOption[];
    [key: string]: SelectOption[] | undefined;
}
