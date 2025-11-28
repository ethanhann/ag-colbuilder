import { describe, it, expect, beforeEach } from 'vitest';
import { col, setGlobalDefaults } from '../src';
import type { ColDef } from 'ag-grid-community';

interface Sample {
    id: number;
    name: string;
    created_at: string;
    count: number;
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
        const c = result[0] as ColDef<Sample>;

        // Assert
        expect(result.length).toBe(1);
        expect(c.field).toBe('name');
        expect(c.headerName).toBe('Name');
        expect(c.filter).toBe('agTextColumnFilter');
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

    it('supports date preset', () => {
        // Arrange
        const builder = col<Sample>().date('created_at');

        // Act
        const result = builder.build();

        // Assert
        expect( result[0]?.filter).toBe('agDateColumnFilter');
    });

    it('merges global defaults', () => {
        // Arrange
        setGlobalDefaults({ sortable: true });
        const builder = col<Sample>().text('name');

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.sortable).toBe(true);
    });

    it('applies options override', () => {
        // Arrange
        const builder = col<Sample>().text('name', { width: 200 });

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.width).toBe(200);
    });

    it('normalizes field-like properties', () => {
        // Arrange
        const builder = col<Sample>().custom({ field: 'name' });

        // Act
        const result = builder.build();

        // Assert
        expect(result[0]?.field).toBe('name');
    });
});
