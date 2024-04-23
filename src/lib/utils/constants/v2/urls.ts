// _LINK: complete url
// _URL: internal app routing url

//dashboard page
const HUB_DASHBOARD_URL = '/v2/dashboard';

//bridge
const BRIDGE_URL = '/v2/bridge';
const POND_HISTORY_PAGE_URL = '/v2/bridge/pondToMPondHistory';
const MPOND_HISTORY_PAGE_URL = '/v2/bridge/mPondToPondHistory';
const ETH_ARB_BRIDGE_LINK =
	'https://bridge.arbitrum.io/?destinationChain=arbitrum-one&sourceChain=ethereum';
const BRIDGE_LEARN_LINK = 'https://docs.marlin.org/learn/bridges';

//relay
const RELAY_URL = '/v2/relay';
const RELAY_CLUSTERS_LINK = 'https://arb1.marlin.org/relay/operator';
const RELAY_REGISTRATION_LINK = 'https://arb1.marlin.org/relay/operator/register';
const RELAY_DELEGATION_LINK = 'https://arb1.marlin.org/relay/stash';
const RELAY_RECEIVER_LINK = 'https://receivers.marlin.org/';

//oyster
const OYSTER_URL = '/v2/oyster';
const OYSTER_MARKETPLACE_URL = '/v2/oyster/marketplace';
const OYSTER_OPERATOR_URL = '/v2/oyster/operator';
const OYSTER_INVENTORY_URL = '/v2/oyster/inventory';
const OYSTER_AUDITORS_URL = '/v2/oyster/auditors';
const OYSTER_INVENTORY_HISTORY_URL = '/v2/oyster/inventory/history';
const OYSTER_OPERATOR_JOBS_URL = '/v2/oyster/operator/jobs';

//kalypso
const KALYPSO_URL = '/v2/kalypso';
const KALYPSO_LINK_1_URL = '/v2/kalypso';

//ecosystem
const ECOSYSTEM_URL = '/v2/ecosystem';

export const ROUTES = {
	HUB_DASHBOARD_URL,
	BRIDGE_URL,
	POND_HISTORY_PAGE_URL,
	MPOND_HISTORY_PAGE_URL,
	ETH_ARB_BRIDGE_LINK,
	BRIDGE_LEARN_LINK,
	RELAY_URL,
	RELAY_CLUSTERS_LINK,
	RELAY_REGISTRATION_LINK,
	RELAY_DELEGATION_LINK,
	RELAY_RECEIVER_LINK,
	OYSTER_URL,
	OYSTER_MARKETPLACE_URL,
	OYSTER_OPERATOR_URL,
	OYSTER_INVENTORY_URL,
	OYSTER_AUDITORS_URL,
	KALYPSO_URL,
	KALYPSO_LINK_1_URL,
	ECOSYSTEM_URL,
	OYSTER_INVENTORY_HISTORY_URL,
	OYSTER_OPERATOR_JOBS_URL
};
