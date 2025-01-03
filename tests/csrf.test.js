const request = require('supertest');
const app = require('../app');

describe('CSRF Protection', () => {
    it('should accept requests with valid CSRF token', async () => {
        const agent = request.agent(app);
        const loginPage = await agent.get('/admin/login');
        const csrfToken = /<input type="hidden" name="_csrf" value="(.+?)"/.exec(loginPage.text)[1];

        const response = await agent.post('/admin/login')
            .send({ name: 'Admin', email: 'admin@example.com', password: 'password', _csrf: csrfToken });
        expect(response.statusCode).toBe(200);
    });

    it('should reject GET requests without CSRF token', async () => {
        const agent = request.agent(app);
        const response = await agent.get('/admin/dashboard');
        expect(response.statusCode).toBe(403);
    });

    it('should reject requests with invalid CSRF token', async () => {
        const agent = request.agent(app);

        const response = await agent.post('/admin/login')
            .send({ name: 'Admin', email: 'admin@example.com', password: 'password', _csrf: 'invalid-token' });
        expect(response.statusCode).toBe(403);
    });
    it('should reject POST requests with missing CSRF token', async () => {
        const response = await request(app).post('/admin/dashboard').send({});
        expect(response.statusCode).toBe(403);
        expect(response.body).toEqual({ error: 'Invalid CSRF token' });
    });
});