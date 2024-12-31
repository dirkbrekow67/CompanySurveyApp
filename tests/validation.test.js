const { JSDOM } = require('jsdom');

describe('Client-Side Validation', () => {
    it('sollte das Absenden verhindern, wenn das Enddatum vor dem Startdatum liegt', () => {
        const dom = new JSDOM(`
            <form>
                <input id="startDate" value="2024-12-31" />
                <input id="endDate" value="2024-01-01" />
                <button type="submit"></button>
            </form>
        `);

        const form = dom.window.document.querySelector('form');
        const startDate = dom.window.document.getElementById('startDate');
        const endDate = dom.window.document.getElementById('endDate');
        const submitEvent = new dom.window.Event('submit');

        const preventDefault = jest.fn();
        submitEvent.preventDefault = preventDefault;

        form.dispatchEvent(submitEvent);

        expect(preventDefault).toHaveBeenCalled();
    });
});