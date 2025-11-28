import { ColumnBuilderImpl } from './ColumnBuilderImpl';
export * from './types';
export * from './globalDefaults';

export const col = <T>() => new ColumnBuilderImpl<T>();
