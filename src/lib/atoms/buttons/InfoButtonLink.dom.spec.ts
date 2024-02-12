import { describe, test, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import InfoButtonLink from './InfoButtonLink.svelte';

describe('InfoButtonLink', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('it should render a link', () => {
		const { getByRole } = render(InfoButtonLink, { text: 'test text for infobutton' });

		expect(() => getByRole('link')).not.toThrow();
		/**  Note: the textContent rendered has a space infront of if since in the markup itself the text
		 * is on a new line, to remove this space we can make the markup in the same line as the image
		 */
		expect(getByRole('link').textContent).toBe(' test text for infobutton');
	});

	test('it should render a img with alt open withing the link', () => {
		const { getByAltText, getByRole } = render(InfoButtonLink, { text: 'Test Text' });

		expect(() => getByRole('link')).not.toThrow();
		expect(getByRole('link').children.length).toBe(1);
		expect(getByRole('link').children[0].tagName).toBe('IMG');
		expect(() => getByAltText('Open')).not.toThrow();
	});
});
