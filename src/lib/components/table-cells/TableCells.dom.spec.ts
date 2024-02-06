import { cleanup, render } from '@testing-library/svelte';
import TableDataCell from './TableDataCell.svelte';
import html from 'svelte-htm';
import TableGridDataCell from './TableGridDataCell.svelte';
import TableDataWithButton from './TableDataWithButton.svelte';

describe('Table Cells', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('TableDataCell component renders ', () => {
		const { getByTestId, container } = render(TableDataCell, {
			styleClass: 'table-data-test-class'
		});
		expect(getByTestId('table-data-cell')).toBeTruthy();
		expect(getByTestId('table-data-cell').classList.contains('table-data-test-class')).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('TableDataCell component renders with slot ', () => {
		const { getByTestId, getByLabelText } = render(
			html`<${TableDataCell}><div aria-label="test-component-chidren">Test Component Chidren</div></${TableDataCell}>`
		);
		expect(getByTestId('table-data-cell')).toBeTruthy();
		expect(
			getByTestId('table-data-cell').contains(getByLabelText('test-component-chidren'))
		).toBeTruthy();

		expect(
			getByLabelText('test-component-chidren').innerHTML === 'Test Component Chidren'
		).toBeTruthy();
	});

	test('TableGridDataCell component renders ', () => {
		const { getByTestId, container } = render(TableGridDataCell, {
			styleClass: 'table-grid-data-test-class'
		});
		expect(getByTestId('table-grid-data-cell')).toBeTruthy();
		expect(
			getByTestId('table-grid-data-cell').classList.contains('table-grid-data-test-class')
		).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('TableGridDataCell component renders with slot ', () => {
		const { getByTestId, getByLabelText } = render(
			html`<${TableGridDataCell}><div aria-label="test-component-chidren">Test Component Chidren</div></${TableGridDataCell}>`
		);
		expect(getByTestId('table-grid-data-cell')).toBeTruthy();
		expect(
			getByTestId('table-grid-data-cell').contains(getByLabelText('test-component-chidren'))
		).toBeTruthy();

		expect(
			getByLabelText('test-component-chidren').innerHTML === 'Test Component Chidren'
		).toBeTruthy();
	});

	test('TableDataWithButton component renders ', () => {
		const { getByTestId, container } = render(TableDataWithButton, {
			styleClass: 'table-data-with-button-test-class'
		});
		expect(getByTestId('table-data-with-button')).toBeTruthy();
		expect(
			getByTestId('table-data-with-button').classList.contains('table-data-with-button-test-class')
		).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('TableDataWithButton component renders with slots', () => {
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
