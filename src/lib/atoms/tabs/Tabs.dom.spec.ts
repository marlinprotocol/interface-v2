import { cleanup, render } from '@testing-library/svelte';
import Tab from './Tab.svelte';
import { TabList, TabPanel, Tabs } from './tabs';

describe('Tabs', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	test('tab Render', () => {
		const { getByTestId } = render(Tab, { props: { id: 'tab_test' } });
		const tabElement = getByTestId('tab');
		expect(tabElement.childNodes).toHaveLength(1);
		expect((tabElement.firstChild as Element)?.id === 'tab_test-tabhead').toBe(true);
		expect(tabElement).toMatchSnapshot();
	});

	test('tab Render check using getByTestId & getByRole ', () => {
		const { getByTestId, getByRole } = render(Tab, { props: { id: 'tab_test' } });
		expect(getByTestId('tab')).toEqual(getByRole('presentation'));
	});

	test('tab Render with all atributes', () => {
		const { getByTestId } = render(Tab, {
			props: { buttonClass: 'primary-class', liClass: 'list', id: 'tab_test' }
		});
		const tabElement = getByTestId('tab');
		expect(tabElement.classList.contains('list')).toBeTruthy();
		expect((tabElement.firstChild as Element)?.classList.contains('primary-class')).toBe(true);
	});

	test('Default tabs Render', () => {
		const { getByTestId } = render(Tabs);
		const tabElement = getByTestId('tabs');
		expect(tabElement.classList.contains('w-full')).toBe(true);
	});

	test(' tabs render with divClass', () => {
		const { getByTestId } = render(Tabs, { props: { divClass: 'tabs-primary' } });
		const tabElement = getByTestId('tabs');
		expect(tabElement.classList.contains('tabs-primary')).toBe(true);
	});

	test('Default tablist render', () => {
		const { getByTestId, getByRole } = render(TabList);
		const tabListElement = getByTestId('tab-list');
		expect(tabListElement.contains(getByRole('tablist'))).toBe(true);
		expect(tabListElement).toMatchSnapshot();
	});

	test('tablist render divClass', () => {
		const { getByTestId } = render(TabList, { props: { divClass: 'tablist-divclass' } });
		const tabListElement = getByTestId('tab-list');
		expect(tabListElement.classList.contains('tablist-divclass')).toBe(true);
	});

	test('TabPanel not render', () => {
		const { queryAllByTestId } = render(TabPanel, { props: { activeTabValue: '10', id: '20' } });
		expect(queryAllByTestId('tab-panel')).toHaveLength(0);
	});

	test('TabPanel render', () => {
		const { getByTestId } = render(TabPanel, { props: { activeTabValue: '10', id: '10' } });
		expect(getByTestId('tab-panel').id === '10-tabitem').toBeTruthy();
		expect(getByTestId('tab-panel')).toMatchSnapshot();
	});

	test('TabPanel render using getByRole ', () => {
		const { getByRole } = render(TabPanel, { props: { activeTabValue: '50', id: '50' } });
		expect(getByRole('tabpanel').getAttribute('data-testid') === 'tab-panel').toBe(true);
	});
});
