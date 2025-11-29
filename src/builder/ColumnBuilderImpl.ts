import type {ColDef, ColDefField} from 'ag-grid-community';
import {getGlobalDefaults} from '../globalDefaults';
import {humanize} from '../humanize';
import {type BasePreset, booleanPreset, datePreset, numberPreset, textPreset} from '../presets';
import type {ColumnBuilder, ColumnOptions} from '../types';
import type {LooseColDef} from './LooseColDef';
import {normalizeColDef} from './normalizeColDef';

/**
 * Implementation of a builder pattern for creating column definitions.
 * This class facilitates creating column definitions with predefined presets
 * or custom options, supporting text, number, and date columns.
 *
 * @template T Represents the type of the data to be rendered in the columns.
 */
export class ColumnBuilderImpl<T> implements ColumnBuilder<T> {
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
        this.pushColumn(field, booleanPreset, opts);
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
