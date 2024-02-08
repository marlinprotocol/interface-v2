import { cleanup, render } from '@testing-library/svelte';
import PageWrapper from './PageWrapper.svelte';
import html from 'svelte-htm';

describe('PageWrapper', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('PageWrapper render', () => {
		const { getByTestId, container } = render(PageWrapper);
		expect(getByTestId('page-wrapper')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('PageWrapper render with slot', () => {
		const { getByTestId } = render(
			html`<${PageWrapper}><div data-testid="test-page-wrapper">Test Page Wrapper</div></${PageWrapper}>`
		);
		expect(getByTestId('page-wrapper').contains(getByTestId('test-page-wrapper'))).toBe(true);
	});

	test('PageWrapper render with correct slot', () => {
		const { getByTestId } = render(
			html`<${PageWrapper}><div data-testid="test-page-wrapper">Test Page Wrapper</div></${PageWrapper}>`
		);
		expect(getByTestId('page-wrapper').contains(getByTestId('test-page-wrapper'))).toBeTruthy();
		expect(getByTestId('test-page-wrapper').innerHTML === 'Test Page Wrapper').toBe(true);
	});
});
