import {ColumnBuilderImpl} from './ColumnBuilderImpl';

export * from './globalDefaults';
export * from './types';

export const col = <T>() => new ColumnBuilderImpl<T>();
