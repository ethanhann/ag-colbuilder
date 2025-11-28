import type { ColDef } from 'ag-grid-community';

// AG-grid was looser field-like properties likeColDefField<T>
export type LooseColDef<T> = Omit<
    ColDef<T>,
    'field' | 'tooltipField' | 'headerTooltip' | 'valueGetter' | 'valueFormatter'
> & {
    field?: any;
    tooltipField?: any;
    headerTooltip?: any;
    valueGetter?: any;
    valueFormatter?: any;
};
