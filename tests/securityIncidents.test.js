import { describe, it, expect, vi } from 'vitest';
import { logSecurityIncident } from '../middleware/logger';

vi.mock('fs');

describe('Security Incident Logging', () => {
    it('should log a security incident with IP address', () => {
        const appendFileSyncSpy = vi.spyOn(fs, 'appendFileSync');

        const req = { ip: '192.168.1.1' };
        logSecurityIncident('Test Incident', req);

        expect(appendFileSyncSpy).toHaveBeenCalledWith(
            expect.stringContaining('/logs/security.log'),
            expect.stringContaining('192.168.1.1 Test Incident')
        );
    });
});