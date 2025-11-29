/**
 * Base preset type containing only non-generic column properties.
 * This type is used for default presets that don't need type-specific fields.
 */
export interface BasePreset {
    sortable?: boolean;
    filter?: string;
    resizable?: boolean;
    type?: string | string[];
}

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
