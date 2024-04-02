import { cleanup, render } from '@testing-library/svelte';
import HeaderLinksGroup from './HeaderLinksGroup.svelte';
import { BRIDGE_URL, OYSTER_MARKETPLACE_URL, RELAY_OPERATOR_LINK } from '$lib/utils/constants/urls';

describe('HeaderLinksGroup', () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks();
	});

	it('renders HeaderLinksGroup correctly', async () => {
		const { getAllByTestId } = render(HeaderLinksGroup);
		const headerLinkElementList = getAllByTestId('header-links-group');
		expect(headerLinkElementList.length).toEqual(4);
		expect(headerLinkElementList).toMatchSnapshot();
	});

	it('renders with activeLink and no children', async () => {
		const { getAllByTestId } = render(HeaderLinksGroup, { props: { activeLink: BRIDGE_URL } });
		const headerLinkElementList = getAllByTestId('header-links-group');
		expect(headerLinkElementList.length).toEqual(4);
		expect(headerLinkElementList[1].firstElementChild?.getAttribute('href') === BRIDGE_URL).toBe(
			true
		);
	});

	it('renders with activeLink with children links', async () => {
		const { getAllByTestId } = render(HeaderLinksGroup, {
			props: { activeLink: OYSTER_MARKETPLACE_URL }
		});
		expect(getAllByTestId('header-links-group').length).toEqual(4);
		const activeLinkHeaderLinkElement =
			getAllByTestId('header-links-group')[2].firstElementChild?.lastElementChild?.firstElementChild
				?.firstElementChild;
		expect(
			activeLinkHeaderLinkElement?.getAttribute('href') === OYSTER_MARKETPLACE_URL
		).toBeTruthy();
	});

	it('renders with activeLink with children & check style correct apply', async () => {
		const { getAllByTestId } = render(HeaderLinksGroup, {
			props: { activeLink: OYSTER_MARKETPLACE_URL }
		});
		expect(getAllByTestId('header-links-group').length).toEqual(4);
		const activeLinkHeaderLinkElement =
			getAllByTestId('header-links-group')[2].firstElementChild?.lastElementChild?.firstElementChild
				?.firstElementChild;
		expect(
			activeLinkHeaderLinkElement?.getAttribute('href') === OYSTER_MARKETPLACE_URL
		).toBeTruthy();
		expect(activeLinkHeaderLinkElement?.classList.contains('bg-primary')).toBe(true);
	});

	it('renders and checks with activeLink with no chidren & Label & openInNewTab is same', async () => {
		const { getAllByTestId, getAllByRole } = render(HeaderLinksGroup, {
			props: { activeLink: RELAY_OPERATOR_LINK }
		});
		const headerLinkElementList = getAllByTestId('header-links-group');
		expect(headerLinkElementList.length).toEqual(4);
		expect(
			headerLinkElementList[0].firstElementChild?.getAttribute('href') === RELAY_OPERATOR_LINK
		).toBe(true);
		expect(headerLinkElementList[0].firstElementChild?.getAttribute('target')).toEqual('_blank');
		expect(getAllByRole('button')[0].innerHTML).toEqual('Relay');
	});

	it('renders and checks with activeLink with chidren & Label & openInNewTab is correct', async () => {
		const { getAllByTestId, getAllByRole } = render(HeaderLinksGroup, {
			props: { activeLink: OYSTER_MARKETPLACE_URL }
		});
		const headerLinkElementList = getAllByTestId('header-links-group');
		expect(headerLinkElementList.length).toEqual(4);
		const activeLinkHeaderLinkElement =
			getAllByTestId('header-links-group')[2].firstElementChild?.lastElementChild?.firstElementChild
				?.firstElementChild;
		expect(activeLinkHeaderLinkElement?.getAttribute('href') === OYSTER_MARKETPLACE_URL).toBe(true);
		expect(activeLinkHeaderLinkElement?.getAttribute('target')).toBeFalsy();
		expect(getAllByRole('button')[2].innerHTML).toEqual('Marketplace');
	});
});
