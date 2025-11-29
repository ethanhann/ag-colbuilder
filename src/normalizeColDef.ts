import type {ColDef, ColDefField} from 'ag-grid-community';
import type {LooseColDef} from './LooseColDef';

const FIELD_KEYS = new Set(['field', 'tooltipField', 'headerTooltip', 'valueGetter', 'valueFormatter']);

export function normalizeColDef<T>(def: LooseColDef<T>): ColDef<T> {
    const clone: any = {...def};

    for (const key of FIELD_KEYS) {
        if (typeof clone[key] === 'string') {
            clone[key] = clone[key] as ColDefField<T>;
        }
    }

    return clone as ColDef<T>;
}
