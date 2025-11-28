import { expectTypeOf } from 'expect-type';
import { col } from '../src';
import {describe, it} from 'vitest';

interface Sample {
    id: number;
    name: string;
    created_at: string;
    count: number;
}

describe('ColumnBuilder types', () => {
    it('only allows keys of the row type', () => {
        col<Sample>()
            .text('name')
            .text('count')
            .date('created_at');

        // @ts-expect-error - invalid field name, must not compile
        col<Sample>().text('invalid_field');
    });

    it('ensures build() returns ColDef<Sample>[]', () => {
        const result = col<Sample>()
            .text('name')
            .build();

        expectTypeOf(result).toMatchTypeOf<Array<any>>();
    });
});
