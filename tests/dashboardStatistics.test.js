import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Dashboard Statistics Route', () => {
    it('should return statistics for survey results', async () => {
        const response = await request(app).get('/dashboard/statistics');
        expect(response.statusCode).toBe(200);
        expect(response.body.totalResponses).toBeGreaterThan(0);
        expect(response.body.averageRatings).toBeDefined();
    });

    it('should return 404 if no results are found', async () => {
        const response = await request(app).get('/dashboard/statistics');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Keine Ergebnisse gefunden' });
    });
});