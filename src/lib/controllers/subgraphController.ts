import type { Address, ContractAddress, ReceiverStakingData } from '$lib/types/storeTypes';
import {
	DEFAULT_BRIDGE_STORE,
	DEFAULT_RECEIVER_STAKING_DATA,
	DEFAULT_WALLET_BALANCE_STORE
} from '$lib/utils/constants/storeDefaults';
import {
	QUERY_TO_CHECK_IF_SIGNER_EXISTS,
	QUERY_TO_GET_ALL_PROVIDERS_DATA,
	QUERY_TO_GET_JOBS_DATA,
	QUERY_TO_GET_MERCHANT_JOBS_DATA,
	QUERY_TO_GET_MPOND_BALANCE,
	QUERY_TO_GET_MPOND_TO_POND_CONVERSION_HSTORY,
	QUERY_TO_GET_POND_AND_MPOND_ALLOWANCES,
	QUERY_TO_GET_POND_BALANCE_QUERY,
	QUERY_TO_GET_POND_TO_MPOND_CONVERSION_HSTORY,
	QUERY_TO_GET_PROVIDER_DATA,
	QUERY_TO_GET_RECEIVER_POND_BALANCE,
	QUERY_TO_GET_RECEIVER_REWARDS_DATA,
	QUERY_TO_GET_RECEIVER_STAKING_DATA,
	QUERY_TO_MPOND_REQUESTED_FOR_CONVERSION
} from '$lib/utils/constants/subgraphQueries';

import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
import type { ChainConfig } from '$lib/types/environmentTypes';
import type { ProviderData } from '$lib/types/oysterComponentType';
import { addToast } from '$lib/data-stores/toastStore';
import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
import { contractAddressStore } from '$lib/data-stores/contractStore';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';

let contractAddresses: ContractAddress;
let chainConfig: ChainConfig;

contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});
chainConfigStore.subscribe((value) => {
	chainConfig = value;
});
/**
 * Generate HTTP request headers for querying subgraph
 * @param query graphQL query in stringified format (shouuld be defined in constants/subgraphQueries.ts)
 * @param variable Object containing variables used in query
 * @returns HTTP request headers for subgraph
 */
// disabling eslint for this as variables can be query specific
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function subgraphQueryWrapper(
	url: string,
	query: string,
	variables: Record<string, any>
) {
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
	const result = await fetchHttpData(url, options);
	return result;
}

// ----------------------------- pond and mPond subgraph methods -----------------------------
/**
 * Get POND balance from subgraph API.
 */
export async function getPondBalanceFromSubgraph(address: Address): Promise<bigint> {
	const url = chainConfig.subgraph_urls.POND;

	const query = QUERY_TO_GET_POND_BALANCE_QUERY;
	const queryVariables = { address: address.toLowerCase() };

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const users = result['data']?.users;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && users?.length !== 0) {
			return BigInt(users[0]?.balance);
		} else {
			return DEFAULT_WALLET_BALANCE_STORE.pond;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error fetching Pond balance. ${error.message}`,
			timeout: 6000
		});
		console.log('Error fetching Pond balance', error);
		return DEFAULT_WALLET_BALANCE_STORE.pond;
	}
}

/**
 * Get MPOND balance from subgraph API.
 */
export async function getMPondBalanceFromSubgraph(address: Address): Promise<bigint> {
	const url = chainConfig.subgraph_urls.MPOND;

	const query = QUERY_TO_GET_MPOND_BALANCE;
	const queryVariables = { id: address.toLowerCase() };

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const balances = result['data']?.balances;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && balances?.length !== 0) {
			return BigInt(balances[0]?.amount);
		} else {
			return DEFAULT_WALLET_BALANCE_STORE.mPond;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error fetching MPond balance. ${error.message}`,
			timeout: 6000
		});
		console.log('Error fetching MPond balance', error);
		return DEFAULT_WALLET_BALANCE_STORE.mPond;
	}
}
// ----------------------------- receiver staking smart contract subgraph methods -----------------------------
export async function getReceiverPondBalanceFromSubgraph(address: Address): Promise<any> {
	const url = chainConfig.subgraph_urls.RECEIVER_STAKING;

	const query = QUERY_TO_GET_RECEIVER_POND_BALANCE;
	const queryVariables = { id: address.toLowerCase() };

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const receiverBalances = result['data']?.receiverBalances;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && receiverBalances?.length !== 0)
			return BigInt(receiverBalances[0]?.balance);
		else return DEFAULT_WALLET_BALANCE_STORE.mPond;
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error fetching receiver Pond balance from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error fetching receiver Pond balance from subgraph', error);
		return DEFAULT_WALLET_BALANCE_STORE.mPond;
	}
}

/**
 * Returns Staked, Queued POND for a specific Receiver address
 * @param address Address of the receiver in string format
 * @param epoch Epoch number
 */
export async function getReceiverStakingDataFromSubgraph(
	address: Address
): Promise<ReceiverStakingData> {
	const receiver_staking_address = contractAddresses.RECEIVER_STAKING || '0x00000000000';
	const url = chainConfig.subgraph_urls.RECEIVER_STAKING;

	const query = QUERY_TO_GET_RECEIVER_STAKING_DATA;
	const queryVariables = {
		address: address.toLowerCase(),
		contractAddress: receiver_staking_address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data']) {
			return result['data'];
		} else {
			return DEFAULT_RECEIVER_STAKING_DATA;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error fetching receiver staked, in queue data from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error fetching receiver staked, in queue data from subgraph', error);
		return DEFAULT_RECEIVER_STAKING_DATA;
	}
}

export async function checkIfSignerExistsInSubgraph(address: Address): Promise<boolean> {
	const url = chainConfig.subgraph_urls.RECEIVER_STAKING;

	const query = QUERY_TO_CHECK_IF_SIGNER_EXISTS;
	const queryVariables = { signer: address.toLowerCase() };

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && result['data']?.receiverBalances?.length === 0) {
			return true;
		} else {
			return false;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error checking if signer exists in subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error checking if signer exists in subgraph', error);
		return false;
	}
}

export async function getPondAndMPondBridgeAllowancesFromSubgraph(
	address: Address,
	contractAddress: Address
) {
	const url = chainConfig.subgraph_urls.RECEIVER_STAKING;

	const query = QUERY_TO_GET_POND_AND_MPOND_ALLOWANCES;
	const queryVariables = {
		address: address.toLowerCase(),
		contractAddress: contractAddress.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data']) {
			return result['data'];
		} else {
			return DEFAULT_BRIDGE_STORE.allowances;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error fetching receiver Pond and MPond allowances from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error fetching receiver pond and mPond allowances from subgraph', error);
		return DEFAULT_BRIDGE_STORE.allowances;
	}
}

// ----------------------------- bridge smart contract subgraph methods -----------------------------

export async function getRequestedMPondForConversionFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.BRIDGE;

	const query = QUERY_TO_MPOND_REQUESTED_FOR_CONVERSION;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const userData = result['data']?.user;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && userData !== null && userData?.totalMpondPlacedInRequest) {
			return BigInt(userData?.totalMpondPlacedInRequest);
		} else {
			return BIG_NUMBER_ZERO;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error fetching requested MPond from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error fetching requested MPond from subgraph', error);
		return BIG_NUMBER_ZERO;
	}
}

export async function getPondToMPondConversionHistoryFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.BRIDGE;

	const query = QUERY_TO_GET_POND_TO_MPOND_CONVERSION_HSTORY;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const usersData = result['data']?.users;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && usersData?.length) {
			return usersData;
		} else {
			return undefined;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error getting Pond to MPond history data from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error getting Pond to MPond history data from subgraph', error);
		return undefined;
	}
}

export async function getMPondToPondConversionHistoryFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.BRIDGE;

	const query = QUERY_TO_GET_MPOND_TO_POND_CONVERSION_HSTORY;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && result['data']?.users?.length && result['data']?.states?.length) {
			return result['data'];
		} else {
			return undefined;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error getting MPond to Pond history data from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error getting MPond to Pond history data from subgraph', error);
		return undefined;
	}
}

// ----------------------------- oyster smart contract subgraph methods -----------------------------

export async function getOysterJobsFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.OYSTER;

	const query = QUERY_TO_GET_JOBS_DATA;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const jobs = result['data']?.jobs;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && jobs?.length) {
			return jobs;
		} else {
			return [];
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error getting oyster jobs from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.error('Error getting oyster jobs from subgraph', error);
		return [];
	}
}

export async function getProviderDetailsFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.OYSTER;

	const query = QUERY_TO_GET_PROVIDER_DATA;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const provider: ProviderData = result['data']?.providers[0];

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && provider) {
			return provider;
		} else {
			return undefined;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error getting provider details from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error getting provider details from subgraph', error);
		return undefined;
	}
}

export async function getAllProvidersDetailsFromSubgraph() {
	const url = chainConfig.subgraph_urls.OYSTER;
	const query = QUERY_TO_GET_ALL_PROVIDERS_DATA;

	try {
		const result = await subgraphQueryWrapper(url, query, {});
		const providers = result['data']?.providers;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && providers?.length) {
			return providers;
		} else {
			return [];
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error getting all provider details from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error getting all provider details from subgraph', error);
		return [];
	}
}

export async function getApprovedOysterAllowancesFromSubgraph(address: Address) {
	const oysterContractAddress = contractAddresses.OYSTER;
	const url = chainConfig.subgraph_urls.RECEIVER_STAKING;

	const query = QUERY_TO_GET_POND_AND_MPOND_ALLOWANCES;
	const queryVariables = {
		address: address.toLowerCase(),
		contractAddress: oysterContractAddress.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const pondApprovals = result['data']?.pondApprovals;

		if (result['data'] && pondApprovals && pondApprovals.length > 0) {
			return BigInt(pondApprovals[0]?.value ?? 0);
		} else {
			return BIG_NUMBER_ZERO;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error fetching oyster allowances from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.log('Error fetching oyster allowances from subgraph', error);
		return BIG_NUMBER_ZERO;
	}
}

export async function getOysterMerchantJobsFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.OYSTER;

	const query = QUERY_TO_GET_MERCHANT_JOBS_DATA;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const jobs = result['data']?.jobs;

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data'] && jobs?.length) {
			return jobs;
		} else {
			return [];
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error getting oyster jobs from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.error('Error getting oyster jobs from subgraph', error);
		return [];
	}
}

// ----------------------------- receiver rewards subgraph methods -----------------------------

export async function getReceiverRewardsDataFromSubgraph(address: Address) {
	const receiverRewardContractAddress = contractAddresses.REWARD_DELEGATORS;
	const url = chainConfig.subgraph_urls.RECEIVER_STAKING;

	const query = QUERY_TO_GET_RECEIVER_REWARDS_DATA;
	const queryVariables = {
		address: address.toLowerCase(),
		contractAddress: receiverRewardContractAddress.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (result['data']) {
			return result['data'];
		} else {
			throw new Error('No receiver rewards data found for this address');
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: `Error getting receiver rewards data from subgraph. ${error.message}`,
			timeout: 6000
		});
		console.error('Error getting receiver rewards data from subgraph', error);
		return [];
	}
}
