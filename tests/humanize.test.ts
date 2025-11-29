import {describe, it, expect} from 'vitest';
import {humanize} from '../src';

describe('humanize', () => {
    it('converts snake_case to title case with spaces', () => {
        expect(humanize('created_at')).toBe('Created At');
        expect(humanize('first_name')).toBe('First Name');
    });

    it('splits camelCase into words and capitalizes', () => {
        expect(humanize('createdAt')).toBe('Created At');
        expect(humanize('firstName')).toBe('First Name');
    });

    it('handles mixed snake_case and camelCase', () => {
        expect(humanize('created_atDate')).toBe('Created At Date');
    });

    it('capitalizes single lowercase word', () => {
        expect(humanize('name')).toBe('Name');
    });

    it('leaves empty string unchanged', () => {
        expect(humanize('')).toBe('');
    });

    it('splits lowercase-to-uppercase boundaries but not acronym sequences', () => {
        // lower->upper splits
        expect(humanize('userID')).toBe('User ID');
        // number-to-upper does not split with current implementation
        expect(humanize('version2Number')).toBe('Version2Number');
    });
});
