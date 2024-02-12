import { cleanup, fireEvent, render } from '@testing-library/svelte';
import NameWithAddress from './NameWithAddress.svelte';
import PageTitle from './PageTitle.svelte';
import TableHeadingText from './TableHeadingText.svelte';
import { staticImages } from '../images/staticImages';
import TextInputCard from './TextInputCard.svelte';
import TxnHashText from './TxnHashText.svelte';

describe('Text', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('NameWithAdress Component render with default props', () => {
		const { getByTestId, container } = render(NameWithAddress);
		expect(getByTestId('name-with-address').firstElementChild?.innerHTML).toBeFalsy();
		expect(getByTestId('name-with-address').id === 'name-with-address').toBe(true);
		expect(container).toMatchSnapshot();
	});

	test('NameWithAdress Component render with props', () => {
		const { getByTestId } = render(NameWithAddress, {
			props: { address: 'xyz street , city:abc', name: 'Robert', rowIndex: 2 }
		});
		expect(getByTestId('name-with-address').id === 'name-with-address').toBe(true);
		expect(
			getByTestId('name-with-address').firstElementChild?.firstElementChild?.innerHTML === 'Ro'
		).toBe(true);
		expect(
			getByTestId('name-with-address').lastElementChild?.firstElementChild?.getAttribute(
				'data-tip'
			) === 'Robert'
		).toBe(true);
	});

	test('PageTitle Component render with default props', () => {
		const { getByTestId, container } = render(PageTitle, { props: { title: '' } });
		expect(getByTestId('page-title').contains(getByTestId('text'))).toBe(true);
		expect(getByTestId('text').innerHTML).toBeFalsy();
		expect(container).toMatchSnapshot();
	});

	test('PageTitle Component render with props', () => {
		const { getByTestId } = render(PageTitle, {
			props: { title: 'Test Page', backHref: 'https://test.com' }
		});
		expect(getByTestId('page-title').contains(getByTestId('text'))).toBe(true);
		expect(getByTestId('page-title').contains(getByTestId('back-button'))).toBe(true);
		expect(getByTestId('text').innerHTML === 'Test Page').toBeTruthy();
	});

	test('TableHeadingText Component render with default props', () => {
		const { getByTestId, container } = render(TableHeadingText, {
			props: { heading: { id: '', title: '' } }
		});
		expect(
			getByTestId('table-heading-text').firstElementChild?.firstElementChild?.classList.contains(
				'tracking-widest'
			)
		).toBe(true);
		expect(
			getByTestId('table-heading-text').firstElementChild?.firstElementChild?.innerHTML
		).toBeFalsy();
		expect(container).toMatchSnapshot();
	});

	test('TableHeadingText Component render with custom props', () => {
		const { getByTestId, getByAltText } = render(TableHeadingText, {
			props: {
				heading: {
					id: 'test-table-heading-text',
					title: 'Table Heading',
					tooltipText: 'Table Heading Tooltip',
					sorting: true
				},
				iconWidth: '14px',
				styleClass: 'additional-child-class',
				tooltipDirection: 'tooltip-bottom'
			}
		});
		expect(getByTestId('table-heading-text').contains(getByAltText('sort'))).toBeTruthy();
		expect(getByTestId('table-heading-text').contains(getByAltText('Info'))).toBeTruthy();
		expect(getByAltText('sort').getAttribute('src') === staticImages.Sort).toBeTruthy();
		expect(getByAltText('Info').getAttribute('src') === staticImages.Alert).toBeTruthy();
	});

	test('TextInputCard Component render with default props', () => {
		const { getByTestId, getAllByTestId, container } = render(TextInputCard, {
			props: { title: '' }
		});
		expect(getByTestId('input-card').contains(getAllByTestId('text')[0])).toBeTruthy();
		expect(getByTestId('input-card').contains(getAllByTestId('text')[1])).toBeTruthy();
		expect(getAllByTestId('text')[0].innerHTML).toBeFalsy();
		expect(getAllByTestId('text')[1].innerHTML).toBeFalsy();
		expect(container).toMatchSnapshot();
	});

	test('TextInputCard Component render with custom props', () => {
		const { getByTestId, getAllByTestId } = render(TextInputCard, {
			props: {
				title: 'Text input card title',
				value: 'Text input card value',
				centered: true
			}
		});
		expect(getByTestId('input-card').contains(getAllByTestId('text')[0])).toBeTruthy();
		expect(getByTestId('input-card').contains(getAllByTestId('text')[1])).toBeTruthy();
		expect(getAllByTestId('text')[0].innerHTML === 'Text input card title').toBeTruthy();
		expect(getAllByTestId('text')[1].innerHTML === 'Text input card value').toBeTruthy();
		expect(getByTestId('input-card').firstElementChild?.classList.contains('justify-center')).toBe(
			true
		);
		expect(getByTestId('input-card').lastElementChild?.classList.contains('justify-center')).toBe(
			true
		);
	});

	test('TextInputCard Component render with cliboardContent props', async () => {
		const { getByTestId, getAllByTestId, getByAltText } = render(TextInputCard, {
			props: {
				title: 'Text input card title',
				cliboardContent: 'copy clipbard content'
			}
		});
		expect(getByTestId('input-card').contains(getAllByTestId('text')[0])).toBeTruthy();
		expect(getAllByTestId('text')[0].innerHTML === 'Text input card title').toBeTruthy();
		const button = getByAltText('Copy').parentElement as Element;
		expect(button.id).toBeFalsy();
		await fireEvent.click(button);
		expect(button.id === 'text-input-card-button').toBeTruthy();
	});

	test('TxnHashText Component render with default props', () => {
		const { getByTestId, getByAltText, container } = render(TxnHashText, {
			props: { txnHash: '', txnHashUrl: '' }
		});
		expect(getByTestId('txn-hash-text').contains(getByAltText('txn link'))).toBe(true);
		expect(getByAltText('txn link').getAttribute('src') === staticImages.OpenInNew).toBe(true);
		expect(getByAltText('txn link').parentElement?.getAttribute('href')).toBeFalsy();
		expect(container).toMatchSnapshot();
	});

	test('TxnHashText Component render with custom props', () => {
		const { getByTestId, getByAltText } = render(TxnHashText, {
			props: {
				txnHash: 'Text txnHash',
				txnHashUrl: 'https://test-txnhash.com',
				startInt: 4,
				endInt: 3
			}
		});
		expect(getByTestId('txn-hash-text').contains(getByAltText('txn link'))).toBe(true);
		expect(getByAltText('txn link').getAttribute('src') === staticImages.OpenInNew).toBe(true);
		expect(
			getByAltText('txn link').parentElement?.getAttribute('href') === 'https://test-txnhash.com'
		).toBe(true);
		expect(getByTestId('txn-hash-text').innerHTML.includes('Text...ash')).toBe(true);
	});
});
