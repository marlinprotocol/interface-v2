import { cleanup, render } from '@testing-library/svelte';
import TableDataCell from './TableDataCell.svelte';
import TestTableCell from './TestTableCell.svelte';
import TableGridDataCell from './TableGridDataCell.svelte';
import TableDataWithButton from './TableDataWithButton.svelte';
import TestTableDataWithButton from './TestTableDataWithButton.svelte';

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
		const { getByTestId, getByLabelText } = render(TestTableCell, { Component: TableDataCell });
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
		const { getByTestId, getByLabelText } = render(TestTableCell, { Component: TableGridDataCell });
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
		const { getByTestId, getAllByRole } = render(TestTableDataWithButton, {
			Component: TableDataWithButton
		});
		expect(getByTestId('table-data-with-button')).toBeTruthy();
		expect(getAllByRole('button')[0].getAttribute('slot') === 'line1').toBeTruthy();
		expect(getAllByRole('button')[1].getAttribute('slot') === 'line2').toBeTruthy();
	});
});
