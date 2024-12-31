const auth = require('../middleware/auth');

describe('Auth Middleware', () => {
    it('sollte den Zugriff erlauben, wenn die Session eingeloggt ist', () => {
        const req = { session: { isLoggedIn: true } };
        const res = {};
        const next = jest.fn();

        auth(req, res, next);
        expect(next).toHaveBeenCalled(); // Nächste Middleware wird aufgerufen
    });

    it('sollte den Zugriff verweigern, wenn die Session nicht eingeloggt ist', () => {
        const req = { session: { isLoggedIn: false } };
        const res = { redirect: jest.fn() };
        const next = jest.fn();

        auth(req, res, next);
        expect(res.redirect).toHaveBeenCalledWith('/login'); // Weiterleitung zur Login-Seite
        expect(next).not.toHaveBeenCalled();
    });
});