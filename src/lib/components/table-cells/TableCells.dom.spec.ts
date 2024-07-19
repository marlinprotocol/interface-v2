import { cleanup, render } from '@testing-library/svelte';
import html from '@playpilot/svelte-htm';
import TableDataWithButton from './TableDataWithButton.svelte';

describe('Table Cells', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it('renders TableDataWithButton successfully', () => {
		const { getByTestId, container } = render(TableDataWithButton, {
			styleClass: 'table-data-with-button-test-class'
		});
		expect(getByTestId('table-data-with-button')).toBeTruthy();
		expect(
			getByTestId('table-data-with-button').classList.contains('table-data-with-button-test-class')
		).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	it('renders TableDataWithButton  with slots', () => {
		const { getByTestId, findByText } = render(
			html`<${TableDataWithButton}>
            <button slot='line1'>Test Component First Chidren</button>
            <button slot='line2'>Test Component Second Chidren</button>
            </${TableDataWithButton}>`
		);
		expect(getByTestId('table-data-with-button')).toBeTruthy();
		expect(findByText('Test Component First Chidren')).toBeTruthy();
		expect(findByText('Test Component Second Chidren')).toBeTruthy();
	});
});
