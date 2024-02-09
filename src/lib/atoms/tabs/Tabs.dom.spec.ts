import { cleanup, render } from '@testing-library/svelte';
import html from '@playpilot/svelte-htm';
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

	test('tab Render with slot', () => {
		const { getByTestId, getByText } = render(
			html`<${Tab} id="tab_test" ><div id="tab-slot">Tab</div></${Tab}>`
		);
		const tabElement = getByTestId('tab');
		expect(tabElement.childNodes).toHaveLength(1);
		expect((tabElement.firstChild as Element)?.id === 'tab_test-tabhead').toBe(true);
		expect(getByText('Tab').id === 'tab-slot').toBeTruthy();
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

	test('tabs render with slot', () => {
		const { getByTestId, getByText } = render(
			html`<${Tabs}><div id="tabs-slot">Tabs</div></${Tabs}>`
		);
		const tabElement = getByTestId('tabs');
		expect(tabElement.classList.contains('w-full')).toBe(true);
		expect(getByText('Tabs').id).toEqual('tabs-slot');
	});

	test('tabs render with divClass', () => {
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

	test('tablist render with slot', () => {
		const { getByTestId, getByText } = render(
			html`<${TabList} divClass='tablist-divclass' ><div id="tablist-slot">Tablist</div></${TabList}>`
		);
		const tabListElement = getByTestId('tab-list');
		expect(tabListElement.classList.contains('tablist-divclass')).toBe(true);
		expect(getByText('Tablist').id === 'tablist-slot').toBe(true);
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

	test('TabPanel render with slot', () => {
		const { getByTestId, getByText } = render(
			html`<${TabPanel} id="10" activeTabValue='10'><div id="tab-panel-slot">TabPanel</div></${TabPanel}>`
		);
		expect(getByTestId('tab-panel').id === '10-tabitem').toBeTruthy();
		expect(getByText('TabPanel').id === 'tab-panel-slot').toBe(true);
	});

	test('TabPanel render using getByRole ', () => {
		const { getByRole } = render(TabPanel, { props: { activeTabValue: '50', id: '50' } });
		expect(getByRole('tabpanel').getAttribute('data-testid') === 'tab-panel').toBe(true);
	});
});
