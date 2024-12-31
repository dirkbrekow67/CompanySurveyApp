import { describe, it, expect, vi } from 'vitest';
import auth from '../middleware/auth';

describe('Auth Middleware', () => {
    it('should allow access if the session is valid', () => {
        const req = { session: { isLoggedIn: true } };
        const res = {};
        const next = vi.fn();

        auth(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should deny access if the session is invalid', () => {
        const req = { session: null };
        const res = { status: vi.fn(() => res), send: vi.fn() };
        const next = vi.fn();

        auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Unauthorized: Please log in.');
        expect(next).not.toHaveBeenCalled();
    });
});