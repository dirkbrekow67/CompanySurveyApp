import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import { logError, logAccess } from '../middleware/logger';

vi.mock('fs');

describe('Logger Middleware', () => {
    it('should log errors to errors.log', () => {
        const appendFileSyncSpy = vi.spyOn(fs, 'appendFileSync');

        const error = new Error('Test error');
        const req = {};
        const res = {};
        const next = vi.fn();

        logError(error, req, res, next);

        expect(appendFileSyncSpy).toHaveBeenCalledWith(
            expect.stringContaining('/logs/errors.log'),
            expect.stringContaining('Test error')
        );
        expect(next).toHaveBeenCalledWith(error);
    });

    it('should log access to access.log', () => {
        const appendFileSyncSpy = vi.spyOn(fs, 'appendFileSync');

        const req = { method: 'GET', url: '/' };
        const res = {};
        const next = vi.fn();

        logAccess(req, res, next);

        expect(appendFileSyncSpy).toHaveBeenCalledWith(
            expect.stringContaining('/logs/access.log'),
            expect.stringContaining('GET /')
        );
        expect(next).toHaveBeenCalled();
    });
});