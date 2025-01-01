import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Security Dashboard', () => {
    it('should return logs for login errors, CSRF incidents, and search errors', async () => {
        const response = await request(app).get('/security/logs');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('loginErrors');
        expect(response.body).toHaveProperty('csrfIncidents');
        expect(response.body).toHaveProperty('searchErrors');
    });
});