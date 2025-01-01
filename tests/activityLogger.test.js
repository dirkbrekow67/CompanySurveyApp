import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import activityLogger from '../middleware/activityLogger';

vi.mock('fs');

describe('Activity Logger Middleware', () => {
    it('should log user activities to activity.log', () => {
        const appendFileSyncSpy = vi.spyOn(fs, 'appendFileSync');
        activityLogger('Testaktion', 'testuser@example.com');
        expect(appendFileSyncSpy).toHaveBeenCalledWith(
            expect.stringContaining('/logs/activity.log'),
            expect.stringContaining('Testaktion')
        );
    });
});