const request = require('supertest');
const app = require('../app');

describe('CSRF Protection', () => {
    it('should reject requests without CSRF token', async () => {
        const response = await request(app)
            .post('/admin/login')
            .send({ name: 'Admin', email: 'admin@example.com', password: 'password' });

        expect(response.statusCode).toBe(403); // Verboten
    });

    it('should accept requests with valid CSRF token', async () => {
        const agent = request.agent(app);

        // Holen des CSRF-Tokens
        const loginPage = await agent.get('/admin/login');
        const csrfToken = /<input type="hidden" name="_csrf" value="(.+?)"/.exec(loginPage.text)[1];

        // Senden der POST-Anfrage mit CSRF-Token
        const response = await agent.post('/admin/login')
            .send({ name: 'Admin', email: 'admin@example.com', password: 'password', _csrf: csrfToken });

        expect(response.statusCode).toBe(200); // Erfolgreich
    });
});