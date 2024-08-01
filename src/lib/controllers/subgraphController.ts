import type { Address, ContractAddress } from '$lib/types/storeTypes';
import {
	QUERY_TO_CHECK_OYSTER_CREDIT_BALANCE,
	QUERY_TO_GET_ALL_PROVIDERS_DATA,
	QUERY_TO_GET_CREDIT_JOBS_DATA,
	QUERY_TO_GET_JOBS_DATA,
	QUERY_TO_GET_JOBS_DATA_BY_ID,
	QUERY_TO_GET_MERCHANT_JOBS_DATA,
	QUERY_TO_GET_MPOND_TO_POND_CONVERSION_HSTORY,
	QUERY_TO_GET_POND_AND_MPOND_ALLOWANCES,
	QUERY_TO_GET_POND_TO_MPOND_CONVERSION_HSTORY,
	QUERY_TO_GET_PROVIDER_DATA,
	QUERY_TO_MPOND_REQUESTED_FOR_CONVERSION
} from '$lib/utils/constants/subgraphQueries';

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
			return 0n;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: {
				title: 'Contract Error',
				description: `Error fetching requested MPond from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.log('Error fetching requested MPond from subgraph', error);
		return 0n;
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
			message: {
				title: 'Contract Error',
				description: `Error getting POND to MPond history data from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.log('Error getting POND to MPond history data from subgraph', error);
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
			message: {
				title: 'Contract Error',
				description: `Error getting MPond to POND history data from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.log('Error getting MPond to POND history data from subgraph', error);
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
			message: {
				title: 'Contract Error',
				description: `Error getting oyster jobs from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.error('Error getting oyster jobs from subgraph', error);
		return [];
	}
}

export async function getOysterJobsFromSubgraphById(id: string[]) {
	const url = chainConfig.subgraph_urls.OYSTER;

	const query = QUERY_TO_GET_JOBS_DATA_BY_ID;
	const queryVariables = {
		id
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
			message: {
				title: 'Contract Error',
				description: `Error getting oyster jobs by id from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.error('Error getting oyster jobs by id from subgraph', error);
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
			message: {
				title: 'Contract Error',
				description: `Error getting provider details from subgraph. ${error.message}`
			},
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
			message: {
				title: 'Contract Error',
				description: `Error getting all provider details from subgraph. ${error.message}`
			},
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
			return 0n;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: {
				title: 'Contract Error',
				description: `Error fetching oyster allowances from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.log('Error fetching oyster allowances from subgraph', error);
		return 0n;
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
			message: {
				title: 'Contract Error',
				description: `Error getting oyster jobs from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.error('Error getting oyster jobs from subgraph', error);
		return [];
	}
}

// ----------------------------- oyster credit contract subgraph methods -----------------------------
export async function getOysterCreditFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.OYSTER_CREDIT;

	const query = QUERY_TO_CHECK_OYSTER_CREDIT_BALANCE;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		// console.log(url, query, queryVariables);
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		// console.log('credits', result);
		const userCreditsBudget = result['data']?.userCredits?.[0]?.userBudget;
		console.log('user credits from subgraph', userCreditsBudget);

		if (result['errors']) {
			throw new Error(result['errors'][0].message);
		}
		if (userCreditsBudget) {
			return BigInt(userCreditsBudget);
		} else {
			return undefined;
		}
	} catch (error: any) {
		addToast({
			variant: 'error',
			message: {
				title: 'Contract Error',
				description: `Error getting oyster user credit from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.error('Error getting oyster user credit from subgraph', error);
		return 0n;
	}
}

export async function getOysterCreditJobsFromSubgraph(address: Address) {
	const url = chainConfig.subgraph_urls.OYSTER_CREDIT;

	const query = QUERY_TO_GET_CREDIT_JOBS_DATA;
	const queryVariables = {
		address: address.toLowerCase()
	};

	try {
		const result = await subgraphQueryWrapper(url, query, queryVariables);
		const jobs = result['data']?.jobCredits;

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
			message: {
				title: 'Contract Error',
				description: `Error getting oyster credit jobs from subgraph. ${error.message}`
			},
			timeout: 6000
		});
		console.error('Error getting oyster credit jobs from subgraph', error);
		return [];
	}
}
