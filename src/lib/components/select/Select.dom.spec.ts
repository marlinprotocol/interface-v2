import { cleanup, fireEvent, render } from '@testing-library/svelte';
import Select from './Select.svelte';

const dataList = ['test1', 'test2', 'test3', 'test4'];

describe('Select', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('Select component renders with default props', () => {
		const { getByTestId, container } = render(Select);
		expect(getByTestId('select')).toBeTruthy();
		expect(getByTestId('select').classList.contains('search-container')).toBeTruthy();
		expect(getByTestId('select').contains(getByTestId('collapse-button'))).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test('Select component renders with label & datalist props', () => {
		const { getByTestId } = render(Select, { props: { showLabel: true, dataList } });
		expect(getByTestId('select')).toBeTruthy();
		expect(getByTestId('select').contains(getByTestId('collapse-button'))).toBeTruthy();
		expect(getByTestId('select').firstElementChild?.innerHTML).toBeFalsy();
	});

	test('Select component render with List Toggle', async () => {
		const { getByTestId } = render(Select, { props: { dataList } });
		expect(getByTestId('select')).toBeTruthy();
		expect(getByTestId('select').contains(getByTestId('collapse-button'))).toBeTruthy();
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBeFalsy();
		await fireEvent.click(getByTestId('select'));
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBe(true);
		await fireEvent.click(getByTestId('select'));
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBeFalsy();
	});

	test('select item in Select Component', async () => {
		const { getByTestId } = render(Select, { props: { dataList, showLabel: true } });
		expect(getByTestId('select')).toBeTruthy();
		expect(getByTestId('select').contains(getByTestId('collapse-button'))).toBeTruthy();
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBeFalsy();
		await fireEvent.click(getByTestId('select'));
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBe(true);
		const firstListItem = getByTestId('select').lastElementChild?.children[1]
			.firstElementChild as Element;
		await fireEvent.click(firstListItem);
		expect(getByTestId('select').firstElementChild?.innerHTML === 'test1').toBeTruthy();
	});

	test('default open select and use setValue props', async () => {
		let selectedItem = '';
		const { getByTestId } = render(Select, {
			props: {
				dataList,
				showLabel: true,
				showSuggestions: true,
				suggestions: dataList,
				setValue: (value) => {
					selectedItem = value as string;
				}
			}
		});
		expect(getByTestId('select')).toBeTruthy();
		expect(getByTestId('select').contains(getByTestId('collapse-button'))).toBeTruthy();
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBe(true);
		const firstListItem = getByTestId('select').lastElementChild?.children[1]
			.firstElementChild as Element;
		expect(selectedItem).toBeFalsy();
		await fireEvent.click(firstListItem);
		expect(getByTestId('select').firstElementChild?.innerHTML === selectedItem).toBeTruthy();
	});

	test('outside click select list item close', async () => {
		const { getByTestId, container } = render(Select, {
			props: {
				dataList,
				showSuggestions: true,
				suggestions: dataList
			}
		});
		expect(getByTestId('select')).toBeTruthy();
		expect(getByTestId('select').contains(getByTestId('collapse-button'))).toBeTruthy();
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBe(true);
		await fireEvent.click(container);
		expect(getByTestId('select').lastElementChild?.classList.contains('absolute')).toBe(false);
	});
});
