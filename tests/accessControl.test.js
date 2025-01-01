import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Access Control Middleware', () => {
    it('should allow access for Admin', async () => {
        const response = await request(app)
            .get('/admin/manage')
            .set('Cookie', 'user=admin-session-token'); // Simulierte Admin-Session
        expect(response.statusCode).toBe(200);
    });

    it('should deny access for User', async () => {
        const response = await request(app)
            .get('/admin/manage')
            .set('Cookie', 'user=user-session-token'); // Simulierte User-Session
        expect(response.statusCode).toBe(403);
    });
});