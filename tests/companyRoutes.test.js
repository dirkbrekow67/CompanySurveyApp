const request = require('supertest');
const app = require('../app'); // Importieren der Hauptanwendung

describe('Company Routes', () => {
    it('GET /companies/all - sollte alle Firmen zurückgeben', async () => {
        const response = await request(app).get('/companies/all');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /companies/edit/:id - sollte eine Firma bearbeiten', async () => {
        const response = await request(app)
            .post('/companies/edit/1')
            .send({
                name: 'BearbeiteteFirma',
                department: 'IT',
                startDate: '2024-01-01',
                endDate: '2024-12-31',
            });
        expect(response.statusCode).toBe(302); // Weiterleitung auf /dashboard
    });

    it('POST /companies/delete/:id - sollte eine Firma löschen', async () => {
        const response = await request(app).post('/companies/delete/1');
        expect(response.statusCode).toBe(302); // Weiterleitung auf /dashboard
    });
});