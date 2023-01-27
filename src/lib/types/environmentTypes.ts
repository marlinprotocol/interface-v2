export type Environment = {
	environment_name: string;
	production: boolean;
	public_network_id: string;
	public_pond_token_address: string;
	public_mpond_token_address: string;
	public_pond_balance_api_url: string;
	public_mpond_balance_api_url: string;
	public_contract_details_url: string;
	valid_chain_ids: number[];
};
