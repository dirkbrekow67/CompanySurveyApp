import { describe, it, expect } from 'vitest';
import validateInputs from '../middleware/validateInputs';

describe('Input Validation Middleware', () => {
    it('should return 400 if email or password is missing', () => {
        const req = { body: { email: '', password: '' } };
        const res = { status: vi.fn(() => res), json: vi.fn() };
        const next = vi.fn();

        validateInputs(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Email und Passwort sind erforderlich' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 for invalid email', () => {
        const req = { body: { email: 'invalid-email', password: 'password123' } };
        const res = { status: vi.fn(() => res), json: vi.fn() };
        const next = vi.fn();

        validateInputs(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Ungültige E-Mail-Adresse' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 400 for short passwords', () => {
        const req = { body: { email: 'user@example.com', password: 'short' } };
        const res = { status: vi.fn(() => res), json: vi.fn() };
        const next = vi.fn();

        validateInputs(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Passwort muss mindestens 8 Zeichen lang sein' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next for valid inputs', () => {
        const req = { body: { email: 'user@example.com', password: 'password123' } };
        const res = {};
        const next = vi.fn();

        validateInputs(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});