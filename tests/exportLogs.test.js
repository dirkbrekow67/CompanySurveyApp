import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Export Logs Route', () => {
    it('should export access logs as CSV', async () => {
        const response = await request(app).get('/export-logs/access');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('text/csv; charset=utf-8');
    });

    it('should return 400 for invalid log type', async () => {
        const response = await request(app).get('/export-logs/invalid');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Ungültiger Log-Typ' });
    });
});