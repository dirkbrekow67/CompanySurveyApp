const { saveSurveyResults, getSurveyResults } = require('../models/surveyModel');

describe('Survey Model', () => {
    it('should save survey results', async () => {
        const sampleData = { company: 'TestFirma', department: 'IT', answers: { q1: 3, q2: 4 } };
        await saveSurveyResults(sampleData.company, sampleData.department, sampleData.answers);

        const results = await getSurveyResults();
        expect(results).toContainEqual(expect.objectContaining(sampleData));
    });
});