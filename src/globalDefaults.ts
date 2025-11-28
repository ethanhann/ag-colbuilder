import type { ColDef } from 'ag-grid-community';

let globalDefaults: Partial<ColDef> = {};

export function setGlobalDefaults(defaults: Partial<ColDef>) {
    globalDefaults = { ...globalDefaults, ...defaults };
}

export function getGlobalDefaults(): Partial<ColDef> {
    return globalDefaults;
}
