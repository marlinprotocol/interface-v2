export const GET_OPTIONS = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

export const MEMORY_SUFFIX = ' MB';

export const TABLE_ITEMS_PER_PAGE = 10;

export const DEFAULT_CURRENCY_DECIMALS = 18; // we use POND as a default currency which has its lowest unit in 18 decimals
export const DEFAULT_PRECISION = 4;

export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_DAY = 86400;
export const SECONDS_IN_HUNDRED_YEARS = 60 * 60 * 24 * 365 * 100; //not accounting for leap years

export const POND_PRECISIONS = 2;
export const MPOND_PRECISIONS = 6;

export const SIDEBAR_DROPDOWN_LINK_IDS = {
	oyster: 'oyster-sidebar-link',
	relay: 'relay-sidebar-link',
	bridge: 'bridge-sidebar-link'
};
