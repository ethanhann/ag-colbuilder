import type { ColDef } from 'ag-grid-community';

export type ColumnOptions<T> = Partial<ColDef<T>>;

export interface ColumnBuilder<T> {
    text<K extends keyof T>(field: K, opts?: ColumnOptions<T>): this;
    number<K extends keyof T>(field: K, opts?: ColumnOptions<T>): this;
    date<K extends keyof T>(field: K, opts?: ColumnOptions<T>): this;

    custom(col: ColDef<T>): this;

    build(): ColDef<T>[];
}
