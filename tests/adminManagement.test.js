import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Admin Management Routes', () => {
    it('should fetch all admins', async () => {
        const response = await request(app).get('/admin-management');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should add a new admin', async () => {
        const response = await request(app).post('/admin-management').send({
            username: 'TestAdmin',
            email: 'admin@example.com',
            password: 'password123',
        });
        expect(response.statusCode).toBe(201);
    });

    it('should remove an admin', async () => {
        const response = await request(app).delete('/admin-management/admin@example.com');
        expect(response.statusCode).toBe(200);
    });
});