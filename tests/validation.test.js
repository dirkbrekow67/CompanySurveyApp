import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Client-Side Validation', () => {
    it('sollte das Absenden verhindern, wenn das Enddatum vor dem Startdatum liegt', () => {
        const dom = new JSDOM(`
            <form id="form">
                <input id="startDate" value="2024-01-01">
                <input id="endDate" value="2023-12-31">
                <button type="submit">Submit</button>
            </form>
        `);
        const document = dom.window.document;

        const form = document.getElementById('form');
        const startDate = document.getElementById('startDate');
        const endDate = document.getElementById('endDate');

        // Validierungslogik
        form.addEventListener('submit', (event) => {
            if (new Date(endDate.value) < new Date(startDate.value)) {
                event.preventDefault();
            }
        });

        const event = new dom.window.Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true); // Das Absenden sollte verhindert werden
    });
});