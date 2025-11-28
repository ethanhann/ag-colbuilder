import type {ColDef} from 'ag-grid-community';
import type {ColumnBuilder, ColumnOptions} from './types';
import {humanize} from './humanize';
import {getGlobalDefaults} from './globalDefaults';
import {defaultTextPreset, defaultNumberPreset, defaultDatePreset} from './defaultPresets';
import type {LooseColDef} from './LooseColDef.ts';
import {normalizeColDef} from './normalizeColDef.ts';

export class ColumnBuilderImpl<T> implements ColumnBuilder<T> {
    private cols: ColDef<T>[] = [];

    private pushColumn<K extends keyof T>(
        field: K,
        preset: Partial<LooseColDef<T>>,
        opts?: Partial<LooseColDef<T>>,
    ) {
        const headerName = humanize(field as string);

        const loose: LooseColDef<T> = {
            ...getGlobalDefaults(),
            ...preset,
            field: field as any,
            headerName,
            ...(opts ?? {}),
        };

        this.cols.push(normalizeColDef(loose));
    }

    text<K extends keyof T>(field: K, opts?: ColumnOptions<T>) {
        this.pushColumn(field, defaultTextPreset, opts);
        return this;
    }

    number<K extends keyof T>(field: K, opts?: ColumnOptions<T>) {
        this.pushColumn(field, defaultNumberPreset, opts);
        return this;
    }

    date<K extends keyof T>(field: K, opts?: ColumnOptions<T>) {
        this.pushColumn(field, defaultDatePreset, opts);
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
