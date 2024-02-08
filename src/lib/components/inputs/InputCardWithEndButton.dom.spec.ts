import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import InputCardWithEndButton from './InputCardWithEndButton.svelte';
import html from '@playpilot/svelte-htm';

describe('InputCardWithEndButton', () => {

    it(`render's the component properly`, () => {
        const { container } = render(InputCardWithEndButton, { title: 'Test Title' });
        expect(container).toMatchSnapshot();
    });

    it('renders the title properly', () => {
        const { getByText } = render(InputCardWithEndButton, { title: 'Test Title' });

        // Check if the title is rendered
        const titleElement = getByText('Test Title');
        expect(titleElement).toBeTruthy();
    });

    it('renders the tooltip when tooltipText is provided', () => {
        // Render the component with a tooltip
        const { container } = render(InputCardWithEndButton, { tooltipText: 'Tooltip Information', title: 'Test Title' });
        expect(container.innerHTML).contain('Tooltip Information')
    });

    it('does not render the tooltip when tooltipText is not provided', () => {
        // Render the component without passing tooltipText
        const { queryByAltText } = render(InputCardWithEndButton, { title: 'Test Title' });

        // Check if the tooltip is not rendered
        expect(queryByAltText('Info')).not.toBeTruthy()
    });

    it('renders content in designated slot', async () => {
        // Render component with content passed to default slot
        const { findByText } = render(html`
            <${InputCardWithEndButton} title=${'Test Titme'}>
             <div>content</div>
             <div slot='titleEndButton'>titleEndButton</div>
             <div slot='endButton'>endButton</div>
            </${InputCardWithEndButton}>
          `);
        // Assert slot content is present
        expect(await findByText('content')).toBeTruthy()
        expect(await findByText('titleEndButton')).toBeTruthy()
        expect(await findByText('endButton')).toBeTruthy()
    });
});