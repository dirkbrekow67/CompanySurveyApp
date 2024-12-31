import { describe, it, expect } from 'vitest';
import jsonValidation from '../middleware/jsonValidation';

describe('JSON Validation Middleware', () => {
    it('should return 400 for invalid JSON payload', () => {
        const req = { body: null };
        const res = { status: vi.fn(() => res), json: vi.fn() };
        const next = vi.fn();

        const error = new SyntaxError('Invalid JSON');
        error.status = 400;

        jsonValidation(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid JSON payload' });
        expect(next).not.toHaveBeenCalled();
    });
});