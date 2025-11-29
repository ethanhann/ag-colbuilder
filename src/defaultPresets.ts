import type {ColDef} from 'ag-grid-community';

/**
 * Base preset type using AG Grid's ColDef as the foundation.
 * This type is used for default presets that don't need type-specific fields.
 * Using Partial<ColDef> provides type safety and ensures compatibility with AG Grid.
 */
export type BasePreset = Partial<ColDef>;

export const defaultTextPreset: BasePreset = {
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
};

export const defaultNumberPreset: BasePreset = {
    sortable: true,
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    resizable: true,
};

export const defaultDatePreset: BasePreset = {
    sortable: true,
    filter: 'agDateColumnFilter',
    resizable: true,
};
