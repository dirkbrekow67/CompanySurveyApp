import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Password Reset Route', () => {
    it('should send a password reset email', async () => {
        const response = await request(app).post('/password-reset/request').send({ email: 'test@example.com' });
        expect(response.statusCode).toBe(200);
    });

    it('should reset the password with a valid token', async () => {
        const response = await request(app).post('/password-reset/reset/validToken').send({ password: 'newPassword123' });
        expect(response.statusCode).toBe(200);
    });

    it('should return an error for invalid or expired token', async () => {
        const response = await request(app).post('/password-reset/reset/invalidToken').send({ password: 'newPassword123' });
        expect(response.statusCode).toBe(400);
    });
});