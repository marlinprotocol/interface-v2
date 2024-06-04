import type { ContractAddress } from '$lib/types/storeTypes';

export type Environment = {
	environment_name: string; // we define environments based on what user base we are targetting for example: 'development' if its for dev purposes, 'mainnet' if we are live and 'testnet' if its for testing/qa purposes
	production: boolean; // if true then we remove all the console logs for the client side
	valid_chains: Record<number, ChainConfig>; // all the chains that we support for that environment
	default_chain_id: number; // default chain id for that environment, this is done because we need to show oyster marketplace data whether the user has connected their wallet or not, so unless they connect their wallet we dont know which chain they are on, so we show them the data for the default chain
	supported_chains: Record<RouteNames, number[]>; // all the chains that are supported for a particular route, we support different chains for different routes for example: we support only arb goerli for bridge, but we support both arb goerli and linea goerli for oyster in development environment
	dapp_url: string; // this dapp url is used in config for trezor wallet
	trezor_email: string; // this trezor email is used in config for trezor manifest, refer: https://docs.trezor.io/trezor-suite/packages/connect/index.html?highlight=email#how-to-use
	backend_url: string; // this is the backend url which we use as a proxy while sending requests to control plane, and for other things like getting/refreshing oyster job statuses, getting provider names etc.
};

export type ChainConfig = {
	// TODO: add a check for hex string
	chain_id: string; // hex string i.e. for arbitrum goerli: '0x66eed'
	chain_name: string; // chain name that you want to see in the UI
	chain_token: string; // native token for that chain for example: 'AGOR' for arbitrum goerli
	chain_image: string; // path to static image
	block_explorer_name: string; // block explorer name for that chain for example: 'Arbiscan' for arbitrum goerli
	block_explorer_url: string; // block explorer url for that chain for example: 'https://goerli.arbiscan.io' for arbitrum goerli
	rpc_url: string; // rpc url for that chain for example: 'https://goerli-rollup.arbitrum.io/rpc' for arbitrum goerli
	backend_network_id: string; // currently we have a same backend for each chain so to diffentiate between them we use this field
	contract_addresses: ContractAddress; // contract addresses for that chain (all keys are neccessary, but values can be empty strings)
	subgraph_urls: SubgraphUrls; // subgraph urls for that chain (all keys are neccessary, but values can be empty strings)
	oyster_token: keyof Tokens; // token that is used for oyster transactions should be one of the keys of tokens object
	oyster_rate_metadata: OysterRateMetadata; // metadata related to oyster requests
	tokens: Tokens; // tokens that are used in the dapp
};

export type OysterUrls = {
	instances_using_cp_url: string;
	instances_using_operator_address: string;
	provider_names_url: string;
	provider_instances_url: string;
	job_status_url: string;
	job_refresh_url: string;
};

export type OysterRateMetadata = {
	rateUnit: string;
	rateCPUrlUnitInSeconds: number;
	rateReviseWaitingTime: number;
};

export type Tokens = {
	POND?: TokenMetadata;
	MPOND?: TokenMetadata;
	USDC?: TokenMetadata;
	OYSTER_CREDIT?: TokenMetadata;
};

export type TokenMetadata = {
	decimal: number;
	precision: number;
	symbol: string;
	address: string;
	currency: keyof Tokens;
};

export type SubgraphUrls = {
	RECEIVER_STAKING: string;
	BRIDGE: string;
	OYSTER: string;
	POND: string;
	MPOND: string;
	OYSTER_CREDIT: string;
};

type RouteNames =
	| 'bridge'
	| 'oyster'
	| 'receiver_staking'
	| 'receiver_rewards'
	| 'dashboard'
	| 'kalypso';
