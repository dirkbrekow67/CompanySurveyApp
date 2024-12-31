import { describe, it, expect } from 'vitest';
import { validateDates } from '../utils/validation';

describe('Client-Side Validation', () => {
    it('should prevent submission if the end date is before the start date', () => {
        const startDate = '2024-01-01';
        const endDate = '2023-12-31';
        expect(validateDates(startDate, endDate)).toBe(false);
    });

    it('should allow submission if the dates are valid', () => {
        const startDate = '2024-01-01';
        const endDate = '2024-01-02';
        expect(validateDates(startDate, endDate)).toBe(true);
    });

    it('should handle invalid date formats', () => {
        const startDate = 'invalid-date';
        const endDate = '2024-01-02';
        expect(validateDates(startDate, endDate)).toBe(false);
    });

    it('should handle empty dates', () => {
        expect(validateDates('', '')).toBe(false);
    });
});