import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Security Headers', () => {
    it('should set Content-Security-Policy header', async () => {
        const response = await request(app).get('/');
        expect(response.headers['content-security-policy']).toContain("default-src 'self'");
    });

    it('should set X-Content-Type-Options header', async () => {
        const response = await request(app).get('/');
        expect(response.headers['x-content-type-options']).toBe('nosniff');
    });

    it('should set X-Frame-Options header', async () => {
        const response = await request(app).get('/');
        expect(response.headers['x-frame-options']).toBe('DENY');
    });
});