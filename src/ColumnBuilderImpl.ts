import type {ColDef} from 'ag-grid-community';
import type {ColumnBuilder, ColumnOptions} from './types';
import {humanize} from './humanize';
import {getGlobalDefaults} from './globalDefaults';
import {defaultTextPreset, defaultNumberPreset, defaultDatePreset} from './defaultPresets';

export class ColumnBuilderImpl<T> implements ColumnBuilder<T> {
    private cols: ColDef<T>[] = [];

    private pushColumn<K extends keyof T>(
        field: K,
        preset: Partial<ColDef<T>>,
        opts?: ColumnOptions<T>,
    ) {
        const headerName = humanize(field as string);

        this.cols.push({
            ...getGlobalDefaults(),
            ...preset,
            field: field as any,
            headerName,
            ...(opts ?? {}),
        });
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

    custom(col: ColDef<T>) {
        this.cols.push({
            ...getGlobalDefaults(),
            ...col,
        });
        return this;
    }

    build(): ColDef<T>[] {
        return this.cols;
    }
}
