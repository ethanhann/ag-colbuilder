import type { ColDef } from 'ag-grid-community';

export const defaultTextPreset: Partial<ColDef> = {
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
};

export const defaultNumberPreset: Partial<ColDef> = {
    sortable: true,
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    resizable: true,
};

export const defaultDatePreset: Partial<ColDef> = {
    sortable: true,
    filter: 'agDateColumnFilter',
    resizable: true,
};
