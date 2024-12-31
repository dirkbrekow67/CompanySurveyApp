import { describe, it, expect } from 'vitest';
import { saveSurveyResults, getSurveyResults } from '../models/surveyModel';

describe('Survey Model', () => {
    it('should save survey results', async () => {
        const sampleData = { company: 'TestFirma', department: 'IT', q1: 'Yes', q2: 'No' };
        await saveSurveyResults(sampleData);

        const results = await getSurveyResults('TestFirma', 'IT');

        console.log('Stored Results:', results); // Debug-Ausgabe

        expect(results).toEqual(expect.arrayContaining([
            expect.objectContaining({
                company: expect.objectContaining({
                    company: 'TestFirma',
                    department: 'IT',
                    q1: 'Yes',
                    q2: 'No',
                }),
                submittedAt: expect.any(String), // Irgendein Datum
            }),
        ]));
    });
});