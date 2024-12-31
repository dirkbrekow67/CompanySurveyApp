import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Dashboard Routes', () => {
    it('should return paginated logs for authenticated admin', async () => {
        const response = await request(app)
            .get('/dashboard?page=1&limit=2')
            .set('Authorization', 'Bearer validAdminToken');

        expect(response.statusCode).toBe(200);
        expect(response.body.accessLogs).toBeDefined();
        expect(response.body.errorLogs).toBeDefined();
        expect(response.body.securityLogs).toBeDefined();
        expect(response.body.accessLogs.length).toBeLessThanOrEqual(2);
    });

    it('should deny access for unauthenticated users', async () => {
        const response = await request(app).get('/dashboard');
        expect(response.statusCode).toBe(401);
    });
});