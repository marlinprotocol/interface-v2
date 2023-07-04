export type Environment = {
	environment_name: string;
	production: boolean;
	valid_chains: Record<number, ChainConfig>;
	default_chain_id: number;
};

export type ChainConfig = {
	chain_id: string;
	chain_name: string;
	contract_subgraph_url: string;
	contract_details_url: string;
	bridge: {
		contract_details_url: string;
		contract_subgraph_url: string;
	};
	oyster: {
		contract_address: string;
		contract_subgraph_url: string;
		instances_using_cp_url: string;
		instances_using_operator_address: string;
		provider_names_url: string;
		provider_instances_url: string;
		job_status_url: string;
		job_refresh_url: string;
		token: string;
	};
	tokens: Record<string, TokenMetadata>;
};

export type TokenMetadata = {
	token_address: string;
	subgraph_url: string;
	token_decimals: number;
	token_precision: number;
	symbol: string;
};
