import {ColumnBuilderImpl} from './builder/ColumnBuilderImpl';

export * from './globalDefaults';
export * from './types';

export const col = <T>() => new ColumnBuilderImpl<T>();
