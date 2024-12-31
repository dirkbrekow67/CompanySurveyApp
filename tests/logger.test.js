import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

vi.mock('fs');

describe('Logger Middleware', () => {
    it('should log requests to a file', () => {
        const writeFileSyncSpy = vi.spyOn(fs, 'writeFileSync');

        const logger = (req, res, next) => {
            const log = `${req.method} ${req.url}`;
            fs.writeFileSync(path.join(__dirname, 'log.txt'), log);
            next();
        };

        const req = { method: 'GET', url: '/' };
        const res = {};
        const next = vi.fn();

        logger(req, res, next);

        expect(writeFileSyncSpy).toHaveBeenCalledWith(expect.any(String), 'GET /');
        expect(next).toHaveBeenCalled();
    });

    it('should handle file write errors', () => {
        vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('File write failed');
        });

        const logger = (req, res, next) => {
            try {
                const log = `${req.method} ${req.url}`;
                fs.writeFileSync(path.join(__dirname, 'log.txt'), log);
            } catch (error) {
                next(error);
            }
        };

        const req = { method: 'GET', url: '/' };
        const res = {};
        const next = vi.fn();

        logger(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});