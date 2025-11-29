import {ColumnBuilderImpl} from './builder/ColumnBuilderImpl';

export * from './globalDefaults';
export * from './types';

/**
 * Creates a new column builder instance for the given row type.
 * @template T - The row data type
 * @returns A new ColumnBuilder instance
 * @example
 * const columns = col<User>()
 *   .text('name')
 *   .number('age')
 *   .build();
 */
export const col = <T>() => new ColumnBuilderImpl<T>();

/**
 * Converts a string to a human-readable format.
 * Exported in case library users want to use humanization logic elsewhere in their application (for consistency).
 */
export {humanize} from './humanize';
