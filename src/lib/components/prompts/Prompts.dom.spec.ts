import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import NetworkPrompt from './NetworkPrompt.svelte';

describe('NetworkPrompt', () => {
	it("render's the Network Prompt properly", async () => {
		const { container } = render(NetworkPrompt, { props: {} });
		expect(container).toMatchSnapshot();
	});

	it('should display the proper text and contain the ChainSwitcher component', async () => {
		const { container, getByText } = render(NetworkPrompt, { props: {} });

		const heading = getByText('Unsupported Network');
		const instruction = getByText(
			'Please switch to one of the chains in the dropdown to continue.'
		);

		const chainSwitcher = container.querySelector('#chain-dropdown');

		expect(heading).toBeTruthy();
		expect(instruction).toBeTruthy();
		expect(chainSwitcher).toBeTruthy();
	});
});
