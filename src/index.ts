import {ColumnBuilderImpl} from './builder/ColumnBuilderImpl.ts';

export * from './globalDefaults';
export * from './types';

export const col = <T>() => new ColumnBuilderImpl<T>();
