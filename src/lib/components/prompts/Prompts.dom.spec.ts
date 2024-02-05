import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import NetworkPrompt from './NetworkPrompt.svelte';
import SmallScreePrompt from './SmallScreenPrompt.svelte';
import UnderConstructionPrompt from './UnderConstructionPrompt.svelte';
import { DISCORD_LINK } from '$lib/utils/constants/urls';

describe('NetworkPrompt', () => {

    it(`render's the Network Prompt properly`, async () => {
        const { container } = render(NetworkPrompt, { props: {} });
        expect(container).toMatchSnapshot();
    });

    it('should display the proper text and contain the ChainSwitcher component', async () => {

        const { container, getByText } = render(NetworkPrompt, { props: {} });

        const heading = getByText('Unsupported Network');
        const instruction = getByText('Please switch to one of the chains in the dropdown to continue.');

        const chainSwitcher = container.querySelector('#chain-dropdown')

        expect(heading).toBeTruthy();
        expect(instruction).toBeTruthy();
        expect(chainSwitcher).toBeTruthy();
    });
});

describe('SmallScreePrompt', () => {
    // Store the original window.innerWidth value to restore it after each test
    const originalInnerWidth = window.innerWidth;
    // Restore the original window.innerWidth value after each test
    afterEach(() => {
        window.innerWidth = originalInnerWidth;
    });

    it('should not show the small screen prompt by default', () => {
        const { queryByText, container } = render(SmallScreePrompt);

        const smallScreenPrompt = queryByText('Please note that this site is not optimized for mobile devices.');
        expect(smallScreenPrompt).toBeNull();
        expect(container).toMatchSnapshot();
    });

    it('should show the small screen prompt when innerWidth is less than 950', async () => {
        // Act by setting "innerWidth" less than "950"
        window.innerWidth = 600;
        window.dispatchEvent(new Event('resize'));

        const { container, queryByText } = render(SmallScreePrompt);

        // Assertion: Check if the prompt appears
        expect(queryByText('Please note that this site is not optimized for mobile devices.')).toBeTruthy();
        expect(container).toMatchSnapshot();
    });

    it('should hide the small screen prompt when the "Enter Site" button is clicked', async () => {
        window.innerWidth = 600;
        window.dispatchEvent(new Event('resize'))

        const { queryByText, getByText } = render(SmallScreePrompt);

        // Pre-Assertion: Check if the prompt appears
        expect(queryByText('Please note that this site is not optimized for mobile devices.')).toBeTruthy();

        // Find the button and click it
        const button = getByText('Enter Site');
        await fireEvent.click(button);

        // Assertion: Check if the prompt disappears
        expect(queryByText('Please note that this site is not optimized for mobile devices.')).toBeNull();
    });

    it('should not show the small screen prompt when innerWidth is greater than 950', async () => {
        window.innerWidth = 960;
        window.dispatchEvent(new Event('resize'))

        const { queryByText } = render(SmallScreePrompt);

        // Assertion: Check if the prompt does not appear
        expect(queryByText('Please note that this site is not optimized for mobile devices.')).toBeNull();
    });
});

describe('UnderConstructionPrompt', () => {
    it('renders a heading with the correct text', () => {
        const { getByText } = render(UnderConstructionPrompt);
        expect(getByText('UH OH!')).toBeTruthy();
    });

    it('renders the under-construction message with a link to Discord', () => {
        const { getByRole, getByText } = render(UnderConstructionPrompt);
        const discordLinkElement = getByRole('link', { name: 'discord' });
        expect(discordLinkElement.getAttribute('href')).toBe(DISCORD_LINK);
        expect(getByText('FISHY')).toBeTruthy(); // If 'FISHY' is not alone, use a regex or specify more context.
    });

    it('should display the strong tag within the paragraph', () => {
        const { getByText } = render(UnderConstructionPrompt);
        expect(getByText('FISHY', { selector: 'strong' })).toBeTruthy();
    });

    it('renders a button that directs the user to the homepage', () => {
        const { getByRole } = render(UnderConstructionPrompt);
        const homeButton = getByRole('button', { name: 'GO BACK HOME' });
        expect(homeButton.closest('a')?.getAttribute('href')).toBe('/');
    });
});