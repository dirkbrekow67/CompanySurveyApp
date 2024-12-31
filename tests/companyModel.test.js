import { describe, it, expect } from 'vitest';
import { saveCompany, getCompany } from '../models/companyModel';

describe('Company Model', () => {
    it('should save a company', async () => {
        const company = { name: 'TestFirma', department: 'IT', password: 'securePassword123' };
        await saveCompany(company);

        const savedCompany = await getCompany('TestFirma', 'IT');

        expect(savedCompany).toEqual(expect.objectContaining({
            name: 'TestFirma',
            department: 'IT',
            password: expect.any(String),
        }));
    });

    it('should throw error for missing password', async () => {
        const company = { name: 'TestFirma', department: 'IT' };
        await expect(saveCompany(company)).rejects.toThrow('Password is required to save a company');
    });
});