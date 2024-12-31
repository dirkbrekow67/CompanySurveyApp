const fs = require('fs');
const logger = require('../middleware/logger');
const path = require('path');

jest.mock('fs'); // Mock-FS, um Dateizugriffe zu testen

describe('Logger Middleware', () => {
    it('sollte Logs in die Datei schreiben', () => {
        const req = { method: 'GET', url: '/test' };
        const res = {};
        const next = jest.fn();

        logger(req, res, next);

        expect(fs.appendFile).toHaveBeenCalledWith(
            path.join(__dirname, '../logs/requests.log'),
            expect.stringContaining('GET /test'),
            expect.any(Function)
        );
        expect(next).toHaveBeenCalled();
    });
});