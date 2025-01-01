import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Data Routes', () => {
    it('should fetch all data for an Administrator', async () => {
        const response = await request(app).get('/data').set('Cookie', 'user=admin-session-token');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should fetch only user-created data for a User', async () => {
        const response = await request(app).get('/data').set('Cookie', 'user=user-session-token');
        expect(response.statusCode).toBe(200);
        expect(response.body.every(entry => entry.createdBy === 'user@example.com')).toBe(true);
    });

    it('should delete a data entry if created by the user', async () => {
        const response = await request(app).delete('/data/123').set('Cookie', 'user=user-session-token');
        expect(response.statusCode).toBe(200);
    });
});