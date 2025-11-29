import type {ColDef, ColDefField} from 'ag-grid-community';
import {getGlobalDefaults} from '../globalDefaults';
import {humanize} from '../humanize';
import {type BasePreset, datePreset, numberPreset, setPreset, textPreset} from '../presets';
import type {ColumnOptions, CurrencyCode, IColumnBuilder, StringUnion, ValueMap} from '../types';
import type {LooseColDef} from './LooseColDef';
import {normalizeColDef} from './normalizeColDef';

/**
 * Implementation of a builder pattern for creating column definitions.
 * This class facilitates creating column definitions with predefined presets
 * or custom options, supporting text, number, and date columns.
 *
 * @template T Represents the type of the data to be rendered in the columns.
 */
export class ColumnBuilder<T> implements IColumnBuilder<T> {
    private cols: ColDef<T>[] = [];

    private pushColumn<K extends keyof T & string>(field: K, preset: BasePreset, opts?: Partial<LooseColDef<T>>) {
        if (!field || typeof field !== 'string') {
            throw new Error('Field name must be a non-empty string');
        }
        const headerName = humanize(field);

        const loose = {
            ...getGlobalDefaults(),
            ...preset,
            field: field as unknown as ColDefField<T>,
            headerName,
            ...(opts ?? {}),
        } as LooseColDef<T>;

        this.cols.push(normalizeColDef(loose));
    }

    text<K extends keyof T & string>(field: K, opts?: ColumnOptions<T>) {
        this.pushColumn(field, textPreset, opts);
        return this;
    }

    number<K extends keyof T & string>(field: K, opts?: ColumnOptions<T>) {
        this.pushColumn(field, numberPreset, opts);
        return this;
    }

    date<K extends keyof T & string>(field: K, opts?: ColumnOptions<T>) {
        this.pushColumn(field, datePreset, opts);
        return this;
    }

    boolean<K extends keyof T & string>(field: K, opts?: ColumnOptions<T>) {
        this.pushColumn(field, setPreset, opts);
        return this;
    }

    set<K extends keyof T & string>(
        field: K,
        opts: {
            map: ValueMap<T[K]>;
        } & ColumnOptions<T>,
    ) {
        this.pushColumn(field, setPreset, {
            valueFormatter: (params) => {
                const v = params.value as StringUnion<T[K]>;
                return opts.map[v];
            },
            ...opts,
        });
        return this;
    }

    currency<K extends keyof T & string>(
        field: K,
        opts: {
            currency?: CurrencyCode;
            minimumFractionDigits?: number;
            maximumFractionDigits?: number;
        } & ColumnOptions<T> = {},
    ) {
        const {currency = 'USD', minimumFractionDigits = 2, maximumFractionDigits = 2, ...rest} = opts;

        this.pushColumn(field, numberPreset, {
            valueFormatter: (params) =>
                new Intl.NumberFormat(undefined, {
                    style: 'currency',
                    currency,
                    minimumFractionDigits,
                    maximumFractionDigits,
                }).format(params.value ?? 0),
            ...rest,
        });

        return this;
    }

    custom(col: Partial<LooseColDef<T>>) {
        this.cols.push(normalizeColDef(col as LooseColDef<T>));
        return this;
    }

    build(): ColDef<T>[] {
        return this.cols;
    }
}
