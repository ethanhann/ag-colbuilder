import type {ColDef} from 'ag-grid-community';

/**
 * A relaxed version of AG Grid's ColDef type that allows 'any' type for specific fields.
 * This type is used for intermediate column definition processing before normalization.
 * It loosens the strict typing on fields that are commonly used with dynamic values.
 */
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
