import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Data Search', () => {
    it('should return results matching the query', async () => {
        const response = await request(app).get('/data/search?query=test');
        expect(response.statusCode).toBe(200);
        expect(response.body.every(entry => entry.data.includes('test'))).toBe(true);
    });

    it('should filter results by date range', async () => {
        const response = await request(app).get('/data/search?start=2024-01-01&end=2024-12-31');
        expect(response.statusCode).toBe(200);
        expect(response.body.every(entry => {
            const createdAt = new Date(entry.createdAt);
            return createdAt >= new Date('2024-01-01') && createdAt <= new Date('2024-12-31');
        })).toBe(true);
    });
});