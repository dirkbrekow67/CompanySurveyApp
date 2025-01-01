import { describe, it, expect } from 'vitest';
import { addAdmin, getAdmins } from '../models/adminModel';

describe('Admin Model', () => {
    it('should hash passwords before saving', async () => {
        await addAdmin({ username: 'TestAdmin', email: 'test@example.com', password: 'password123' });
        const admins = await getAdmins();
        expect(admins.some(admin => admin.email === 'test@example.com')).toBe(true);
        expect(admins.find(admin => admin.email === 'test@example.com').password).not.toBe('password123');
    });
});