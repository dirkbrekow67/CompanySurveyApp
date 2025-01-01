import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Export Survey Results Route', () => {
    it('should export survey results as CSV', async () => {
        const response = await request(app).get('/export-survey-results');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('text/csv; charset=utf-8');
    });

    it('should return 404 if no results are found', async () => {
        const response = await request(app).get('/export-survey-results');
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({ error: 'Keine Ergebnisse gefunden' });
    });
});