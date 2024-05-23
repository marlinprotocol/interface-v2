import { cleanup, render } from '@testing-library/svelte';
import html from '@playpilot/svelte-htm';
import Tab from './Tab.svelte';
import { TabList, TabPanel, Tabs } from './tabs';

describe('Tabs', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it('renders the tab', () => {
		const { getByTestId } = render(Tab, { props: { id: 'tab_test' } });
		const tabElement = getByTestId('tab');
		expect(tabElement.childNodes).toHaveLength(1);
		expect((tabElement.firstChild as Element)?.id === 'tab_test-tabhead').toBe(true);
		expect(tabElement).toMatchSnapshot();
	});

	it('renders the tab with slot', () => {
		const { getByTestId } = render(html`<${Tab} id="tab_test">Tab</${Tab}>`);
		const tabElement = getByTestId('tab');
		expect(tabElement).toBeTruthy();
		expect(tabElement.childNodes).toHaveLength(1);
		expect((tabElement.firstChild as Element)?.id === 'tab_test-tabhead').toBe(true);
	});

	it('renders the tab and verifies it using getByTestId & getByRole ', () => {
		const { getByTestId, getByRole } = render(Tab, { props: { id: 'tab_test' } });
		expect(getByTestId('tab')).toEqual(getByRole('presentation'));
	});

	it('renders the tab with all atributes', () => {
		const { getByTestId } = render(Tab, {
			props: { liClass: 'list', id: 'tab_test' }
		});
		const tabElement = getByTestId('tab');
		expect(tabElement.classList.contains('list')).toBeTruthy();
		expect((tabElement.firstChild as Element).classList.contains('bg-white')).toBe(true);
	});

	it('renders the default tabs', () => {
		const { getByTestId } = render(Tabs);
		const tabElement = getByTestId('tabs');
		expect(tabElement.classList.contains('w-full')).toBe(true);
	});

	it('renders the tabs with slot', () => {
		const { getByTestId, getByText } = render(
			html`<${Tabs}><div id="tabs-slot">Tabs</div></${Tabs}>`
		);
		const tabElement = getByTestId('tabs');
		expect(tabElement.classList.contains('w-full')).toBe(true);
		expect(getByText('Tabs').id).toEqual('tabs-slot');
	});

	it('renders the tabs with divClass', () => {
		const { getByTestId } = render(Tabs, { props: { divClass: 'tabs-primary' } });
		const tabElement = getByTestId('tabs');
		expect(tabElement.classList.contains('tabs-primary')).toBe(true);
	});

	it('renders the default tablist', () => {
		const { getByTestId, getByRole } = render(TabList);
		const tabListElement = getByTestId('tab-list');
		expect(tabListElement.contains(getByRole('tablist'))).toBe(true);
		expect(tabListElement).toMatchSnapshot();
	});

	it('renders tablist with divClass', () => {
		const { getByTestId } = render(TabList, { props: { divClass: 'tablist-divclass' } });
		const tabListElement = getByTestId('tab-list');
		expect(tabListElement.classList.contains('tablist-divclass')).toBe(true);
	});

	it('renders tablist with slot', () => {
		const { getByTestId, getByText } = render(
			html`<${TabList} divClass='tablist-divclass' ><div id="tablist-slot">Tablist</div></${TabList}>`
		);
		const tabListElement = getByTestId('tab-list');
		expect(tabListElement.classList.contains('tablist-divclass')).toBe(true);
		expect(getByText('Tablist').id === 'tablist-slot').toBe(true);
	});

	it('does not render TabPanel', () => {
		const { queryAllByTestId } = render(TabPanel, { props: { activeTabValue: '10', id: '20' } });
		expect(queryAllByTestId('tab-panel')).toHaveLength(0);
	});

	it('renders TabPanel', () => {
		const { getByTestId } = render(TabPanel, { props: { activeTabValue: '10', id: '10' } });
		expect(getByTestId('tab-panel').id === '10-tabitem').toBeTruthy();
		expect(getByTestId('tab-panel')).toMatchSnapshot();
	});

	it('renders TabPanel with slot', () => {
		const { getByTestId, getByText } = render(
			html`<${TabPanel} id="10" activeTabValue='10'><div id="tab-panel-slot">TabPanel</div></${TabPanel}>`
		);
		expect(getByTestId('tab-panel').id === '10-tabitem').toBeTruthy();
		expect(getByText('TabPanel').id === 'tab-panel-slot').toBe(true);
	});

	it('renders TabPanel using getByRole', () => {
		const { getByRole } = render(TabPanel, { props: { activeTabValue: '50', id: '50' } });
		expect(getByRole('tabpanel').getAttribute('data-testid') === 'tab-panel').toBe(true);
	});
});
