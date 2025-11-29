import type {ColDef} from 'ag-grid-community';

export type ColumnOptions<T> = Partial<ColDef<T>>;

export interface IColumnBuilder<T> {
    text<K extends keyof T & string>(field: K, opts?: ColumnOptions<T>): this;
    number<K extends keyof T & string>(field: K, opts?: ColumnOptions<T>): this;
    date<K extends keyof T & string>(field: K, opts?: ColumnOptions<T>): this;

    custom(col: ColDef<T>): this;

    build(): ColDef<T>[];
}

// Currency type(s)
export type CurrencyCode = Intl.NumberFormatOptions['currency'];

// Set type(s)
export type StringUnion<T> = Extract<T, string>;
export type ValueMap<T> = Record<StringUnion<T>, string>;
