import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, findAdminByEmail } from '../models/adminModel';

describe('Admin Model Tests', () => {
    it('should hash passwords securely', () => {
        const password = 'securePassword123';
        const hash = hashPassword(password);

        expect(hash).not.toEqual(password);
        expect(hash.length).toBeGreaterThan(0);
    });

    it('should throw error for empty password', () => {
        expect(() => hashPassword('')).toThrow('Password cannot be empty');
    });

    it('should compare passwords correctly', () => {
        const password = 'securePassword123';
        const hash = hashPassword(password);

        expect(comparePassword(password, hash)).toBe(true);
        expect(comparePassword('wrongPassword', hash)).toBe(false);
    });

    it('should find admin by email', () => {
        const email = 'admin1@example.com';
        const admin = findAdminByEmail(email);

        expect(admin).toBeDefined();
        expect(admin.email).toBe(email);
    });

    it('should not find non-existent admin', () => {
        const email = 'nonexistent@example.com';
        const admin = findAdminByEmail(email);

        expect(admin).toBeUndefined();
    });
});