import type { ContractAddress } from '$lib/types/storeTypes';

export type Environment = {
	environment_name: string;
	production: boolean;
	valid_chains: Record<number, ChainConfig>;
	default_chain_id: number;
	supported_chains: Record<RouteNames, number[]>;
	dapp_url: string;
	trezor_email: string;
};

export type ChainConfig = {
	chain_id: string;
	chain_name: string;
	chain_token: string;
	block_explorer_url: string;
	rpc_url: string;
	contract_addresses: ContractAddress;
	subgraph_urls: SubgraphUrls;
	oyster_urls: {
		instances_using_cp_url: string;
		instances_using_operator_address: string;
		provider_names_url: string;
		provider_instances_url: string;
		job_status_url: string;
		job_refresh_url: string;
	};
	oyster_token: keyof Tokens;
	tokens: Tokens;
};

export type Tokens = {
	POND: TokenMetadata;
	MPOND: TokenMetadata;
	USDC: TokenMetadata;
};

export type TokenMetadata = {
	decimal: number;
	precision: number;
	symbol: string;
	currency: string;
};

export type SubgraphUrls = {
	RECEIVER_STAKING: string;
	BRIDGE: string;
	OYSTER: string;
	POND: string;
	MPOND: string;
};

type RouteNames = 'bridge' | 'oyster' | 'receiver';
