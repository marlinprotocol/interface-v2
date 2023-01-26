import ENVIRONMENT from '$lib/environments/environment';
import { DEFAULT_WALLET_BALANCE } from '$lib/utils/constants/storeDefaults';
import {
	QUERY_TO_GET_MPOND_BALANCE,
	QUERY_TO_GET_POND_BALANCE_QUERY
} from '$lib/utils/constants/subgraphQueries';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import type { BigNumber } from 'ethers';

/**
 * Generate HTTP request headers for querying subgraph
 * @param query: graphQL query in stringified format
 * @param variable: Object containing variables used in query
 * @returns HTTP request headers for subgraph
 */
// disabling eslint for this as variables can be query specific
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function subgraphQueryWrapper(query: string, variables: any): RequestInit {
	const options = {
		method: 'POST',
		body: JSON.stringify({
			query,
			variables: { ...variables }
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	};
	return options;
}

/**
 * Get POND balance from subgraph API.
 */
export async function getPondBalance(address: Lowercase<string>): Promise<BigNumber> {
	const url = ENVIRONMENT.public_pond_balance_api_url;
	const query = QUERY_TO_GET_POND_BALANCE_QUERY;
	const queryVariables = { address: address };

	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (result['data'] && result['data']?.users?.length != 0)
			return result['data']?.users[0]?.balance;
		else return DEFAULT_WALLET_BALANCE.pond;
	} catch (error) {
		return DEFAULT_WALLET_BALANCE.pond;
	}
}

/**
 * Get MPOND balance from subgraph API.
 */
export async function getMpondBalance(address: Lowercase<string>): Promise<BigNumber> {
	const url = ENVIRONMENT.public_mpond_balance_api_url;
	const query = QUERY_TO_GET_MPOND_BALANCE;
	const queryVariables = { id: address };

	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (result['data'] && result['data']?.balances?.length != 0)
			return result['data']?.balances[0]?.amount;
		else return DEFAULT_WALLET_BALANCE.mpond;
	} catch (error) {
		return DEFAULT_WALLET_BALANCE.mpond;
	}
}
