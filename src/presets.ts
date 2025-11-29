import type {ColDef} from 'ag-grid-community';

/**
 * Base preset type using AG Grid's ColDef as the foundation.
 * This type is used for default presets that don't need type-specific fields.
 * Using Partial<ColDef> provides type safety and ensures compatibility with AG Grid.
 */
export type BasePreset = Partial<ColDef>;

export const textPreset: BasePreset = {
    sortable: true,
    filter: 'agTextColumnFilter',
    resizable: true,
};

export const numberPreset: BasePreset = {
    sortable: true,
    filter: 'agNumberColumnFilter',
    type: 'numericColumn',
    resizable: true,
};

export const datePreset: BasePreset = {
    sortable: true,
    filter: 'agDateColumnFilter',
    resizable: true,
};

export const booleanPreset: BasePreset = {
    sortable: true,
    filter: 'agSetColumnFilter',
    cellDataType: 'boolean',
    resizable: true,
};
