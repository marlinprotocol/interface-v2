import { describe, test, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import InfoButtonLink from './InfoButtonLink.svelte';

describe('InfoButtonLink', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('it should render a link', () => {
		const { getByRole } = render(InfoButtonLink);

		expect(() => getByRole('link')).not.toThrow();
	});

	test('it should render a img with alt open', () => {
		const { getByAltText } = render(InfoButtonLink);

		expect(() => getByAltText('Open')).not.toThrow();
	});

	test('it should render the text that is being passed as a prop', () => {
		const { getByText } = render(InfoButtonLink, { text: 'Test Text' });

		expect(() => getByText('Test Text')).not.toThrow();
	});
});
