import type {ColDef} from 'ag-grid-community';

let globalDefaults: Partial<ColDef> = {};

/**
 * Sets global defaults for all column definitions.
 * @param defaults
 */
export function setGlobalDefaults(defaults: Partial<ColDef>) {
    globalDefaults = {...globalDefaults, ...defaults};
}

export function getGlobalDefaults(): Partial<ColDef> {
    return globalDefaults;
}

/**
 * Resets global defaults to an empty object.
 */
export function resetGlobalDefaults(): void {
    globalDefaults = {};
}
