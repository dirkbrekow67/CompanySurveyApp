import { describe, it, expect } from 'vitest';
import auth from '../middleware/auth';

describe('Auth Middleware', () => {
    it('sollte den Zugriff erlauben, wenn die Session aktiv ist', () => {
        const req = { session: { isLoggedIn: true } };
        const res = {};
        const next = vi.fn();

        auth(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});