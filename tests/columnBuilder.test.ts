import {describe, it, expect, beforeEach} from 'vitest';
import {col, setGlobalDefaults, resetGlobalDefaults, getGlobalDefaults} from '../src';
import type {ColDef, ValueFormatterParams} from 'ag-grid-community';

interface Address {
    country: string;
}

enum State {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

interface Sample {
    id: number;
    name: string;
    createdAt: string;
    count: number;
    address: Address;
    cost: number;
    state: State;
}

describe('ColumnBuilder', () => {
    beforeEach(() => {
        // Arrange
        setGlobalDefaults({});
    });

    it('creates a simple text column', () => {
        // Arrange
        const builder = col<Sample>().text('name');

        // Act
        const result = builder.build();
        const column = result[0] as ColDef<Sample>;

        // Assert
        expect(result.length).toBe(1);
        expect(column.field).toBe('name');
        expect(column.headerName).toBe('Name');
        expect(column.filter).toBe('agTextColumnFilter');
    });

    it('supports enum preset', () => {
        // Arrange
        const params = {value: State.ACTIVE} as ValueFormatterParams;
        const expected = 'Active';
        const builder = col<Sample>().set('state', {
            map: {
                [State.ACTIVE]: 'Active',
                [State.INACTIVE]: 'Inactive',
            },
        });

        // Act
        const result = builder.build();
        const column = result[0];
        // Assert
        expect(column?.filter).toBe('agSetColumnFilter');
        if (typeof (column?.valueFormatter) !== 'function') throw new Error(
            'valueFormatter must be a function to test currency preset'
        )
        expect(column?.valueFormatter(params)).toBe(expected);
    });


    it('supports number preset', () => {
        // Arrange
        const builder = col<Sample>().number('count');

        // Act
        const result = builder.build();
        const column = result[0];

        // Assert
        expect(column?.filter).toBe('agNumberColumnFilter');
        expect(column?.type).toBe('numericColumn');
    });

    it('supports currency preset', () => {
        // Arrange
        const builder = col<Sample>().currency('cost');

        // Act
        const result = builder.build();
        const column = result[0];

        // Assert
        expect(column?.filter).toBe('agNumberColumnFilter');
        expect(column?.type).toBe('numericColumn');
    });

    it('supports currency preset in USD', () => {
        // Arrange
        const params = {value: 10} as ValueFormatterParams;
        const expected = '$10.00';
        const builder = col<Sample>().currency('cost');

        // Act
        const result = builder.build();
        const column = result[0];

        // Assert
        expect(column?.filter).toBe('agNumberColumnFilter');
        expect(column?.type).toBe('numericColumn');
        if (typeof (column?.valueFormatter) !== 'function') throw new Error(
            'valueFormatter must be a function to test currency preset'
        )
        expect(column?.valueFormatter(params)).toBe(expected);
    });

    it('supports currency preset in JPY', () => {
        // Arrange
        const params = {value: 10} as ValueFormatterParams;
        const expected = '¥10.00';
        const builder = col<Sample>().currency('cost', {currency: 'JPY'});

        // Act
        const result = builder.build();
        const column = result[0];

        // Assert
        expect(column?.filter).toBe('agNumberColumnFilter');
        expect(column?.type).toBe('numericColumn');
        if (typeof (column?.valueFormatter) !== 'function') throw new Error(
            'valueFormatter must be a function to test currency preset'
        )
        expect(column?.valueFormatter(params)).toBe(expected);
    });

    it('supports date preset', () => {
        // Arrange
        const builder = col<Sample>().date('createdAt');

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.filter).toBe('agDateColumnFilter');
    });

    it('supports boolean preset and chaining', () => {
        // Arrange
        interface Row {
            active: boolean
        }

        const builder = col<Row>().boolean('active').text('active');

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.filter).toBe('agSetColumnFilter');
        expect(result[0]?.cellDataType).toBe('boolean');
        // Ensure chaining kept both columns
        expect(result.length).toBe(2);
    });

    it('merges global defaults', () => {
        // Arrange
        setGlobalDefaults({sortable: true});
        const builder = col<Sample>().text('name');

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.sortable).toBe(true);
    });

    it('applies options override', () => {
        // Arrange
        const builder = col<Sample>().text('name', {width: 200});

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.width).toBe(200);
    });

    it('normalizes field-like properties', () => {
        // Arrange
        const builder = col<Sample>().custom({field: 'name'});

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.field).toBe('name');
    });

    it('supports compound field names', () => {
        // Arrange
        const builder = col<Sample>().custom({field: 'address.country'});

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.field).toBe('address.country');
    });

    it('throws when field name is invalid', () => {
        // Arrange
        const builder = col<any>();

        // Act + Assert
        expect(() => builder.text('' as any)).toThrowError('Field name must be a non-empty string');
    });

    it('resetGlobalDefaults clears previously set defaults', () => {
        // Arrange
        setGlobalDefaults({sortable: true});
        expect(getGlobalDefaults().sortable).toBe(true);

        // Act
        resetGlobalDefaults();

        // Assert
        expect(getGlobalDefaults()).toEqual({});
    });
});
