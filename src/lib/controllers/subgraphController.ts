import { contractAddressStore } from '$lib/data-stores/contractStore';
import ENVIRONMENT from '$lib/environments/environment';
import type { PondToMPondHistoryDataModel } from '$lib/types/bridgeComponentType';
import type { Address, ContractAddress, ReceiverStakingData } from '$lib/types/storeTypes';
import { BigNumberZero } from '$lib/utils/constants/constants';
import {
	DEFAULT_RECEIVER_STAKING_DATA,
	DEFAULT_WALLET_BALANCE
} from '$lib/utils/constants/storeDefaults';
import {
	QUERY_TO_CHECK_IF_SIGNER_EXISTS,
	QUERY_TO_GET_MPOND_BALANCE,
	QUERY_TO_GET_MPOND_TO_POND_CONVERSION_HSTORY,
	QUERY_TO_GET_POND_AND_MPOND_BRIDGE_ALLOWANCES,
	QUERY_TO_GET_POND_BALANCE_QUERY,
	QUERY_TO_GET_POND_TO_MPOND_CONVERSION_HSTORY,
	QUERY_TO_GET_RECEIVER_POND_BALANCE,
	QUERY_TO_GET_RECEIVER_STAKING_DATA,
	QUERY_TO_MPOND_REQUESTED_FOR_CONVERSION
} from '$lib/utils/constants/subgraphQueries';
import { getModifiedMPondToPondHistory } from '$lib/utils/helpers/bridgeHelpers';
import { getCurrentEpochCycle } from '$lib/utils/helpers/commonHelper';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { BigNumber } from 'ethers';

let contractAddresses: ContractAddress;

contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

/**
 * Generate HTTP request headers for querying subgraph
 * @param query graphQL query in stringified format
 * @param variable Object containing variables used in query
 * @returns HTTP request headers for subgraph
 */
// disabling eslint for this as variables can be query specific
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function subgraphQueryWrapper(query: string, variables: Record<string, any>): RequestInit {
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

// ----------------------------- pond and mPond subgraph methods -----------------------------

/**
 * Get POND balance from subgraph API.
 */
export async function getPondBalance(address: Address): Promise<BigNumber> {
	const url = ENVIRONMENT.public_pond_subgraph_url;
	const query = QUERY_TO_GET_POND_BALANCE_QUERY;
	const queryVariables = { address: address.toLowerCase() };

	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (result['data'] && result['data']?.users?.length != 0)
			return BigNumber.from(result['data']?.users[0]?.balance);
		else return DEFAULT_WALLET_BALANCE.pond;
	} catch (error) {
		console.log('Error fetching POND balance', error);
		return DEFAULT_WALLET_BALANCE.pond;
	}
}

/**
 * Get MPOND balance from subgraph API.
 */
export async function getMPondBalance(address: Address): Promise<BigNumber> {
	const url = ENVIRONMENT.public_mPond_subgraph_url;
	const query = QUERY_TO_GET_MPOND_BALANCE;
	const queryVariables = { id: address.toLowerCase() };

	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (result['data'] && result['data']?.balances?.length != 0)
			return BigNumber.from(result['data']?.balances[0]?.amount);
		else return DEFAULT_WALLET_BALANCE.mPond;
	} catch (error) {
		console.log('Error fetching MPond balance', error);
		return DEFAULT_WALLET_BALANCE.mPond;
	}
}
// ----------------------------- smart contract subgraph methods -----------------------------
//TODO: add return types
export async function getReceiverPondBalanceFromSubgraph(address: Address): Promise<any> {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_RECEIVER_POND_BALANCE;

	const queryVariables = { id: address.toLowerCase() };
	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);
	try {
		const result = await fetchHttpData(url, options);
		if (result['data'] && result['data']?.receiverBalances?.length != 0)
			return result['data']?.receiverBalances[0]?.balance;
		else return DEFAULT_WALLET_BALANCE.mPond;
	} catch (error) {
		console.log('Error fetching receiver pond balance from subgraph', error);
		return DEFAULT_WALLET_BALANCE.mPond;
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
	const receiver_staking_address = contractAddresses.ReceiverStaking || '0x00000000000';
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_RECEIVER_STAKING_DATA;

	const queryVariables = {
		address: address.toLowerCase(),
		contractAddress: receiver_staking_address.toLowerCase()
	};

	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);
	try {
		const result = await fetchHttpData(url, options);
		const balance = result['data']?.receiverBalance?.balance;
		const signer = result['data']?.receiverBalance?.signer;
		const balanceSnapshots = result['data']?.receiverBalanceSnapshots;
		const approvals = result['data']?.pondUser?.approvals;
		const params = result['data']?.params;

		let stakingData: ReceiverStakingData = DEFAULT_RECEIVER_STAKING_DATA;

		let epochData = DEFAULT_RECEIVER_STAKING_DATA.epochData;

		if (params?.length === 2) {
			let startTime = params.find((param: any) => param.id === 'START_TIME').value;
			let epochLength = params.find((param: any) => param.id === 'EPOCH_LENGTH').value;
			//string to number
			startTime = parseInt(startTime);
			epochLength = parseInt(epochLength);
			const epochCycle = getCurrentEpochCycle(startTime, epochLength);
			epochData = { startTime, epochLength, epochCycle };
		}

		//update staked and queued balance
		if (balance) {
			const totalBalance = BigNumber.from(balance);
			let queuedBalance = DEFAULT_RECEIVER_STAKING_DATA.queuedBalance;
			let stakedBalance = DEFAULT_RECEIVER_STAKING_DATA.stakedBalance;

			let balanceSnapshot = BigNumberZero;

			if (balanceSnapshots?.length === 1 && balanceSnapshots[0].epoch == epochData.epochCycle) {
				//if balance snapshot for current epoch cycle is present, then update staked and queued balance
				balanceSnapshot = BigNumber.from(balanceSnapshots[0].balance ?? 0);
				//queued amount is the difference of balance and balance snapshot at current epoch cycle
				stakedBalance = balanceSnapshot;
				queuedBalance = totalBalance.sub(stakedBalance);
			} else {
				//if balance snapshot for current epoch cycle is not present, then update staked balance
				stakedBalance = totalBalance;
			}

			stakingData = {
				...stakingData,
				queuedBalance,
				stakedBalance,
				epochData,
				signer
			};
		}
		//update approved POND balance
		if (approvals?.length) {
			const approvalData = approvals[0];
			stakingData = {
				...stakingData,
				approvedBalance:
					BigNumber.from(approvalData.value) ?? DEFAULT_RECEIVER_STAKING_DATA.approvedBalance
			};
		}

		return stakingData;
	} catch (error) {
		console.log('Error fetching receiver staked, in queue data from subgraph', error);
		return DEFAULT_RECEIVER_STAKING_DATA;
	}
}

export async function checkIfSignerExistsInSubgraph(address: Address): Promise<boolean> {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_CHECK_IF_SIGNER_EXISTS;

	const queryVariables = { signer: address.toLowerCase() };
	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		// TODO: remove this when pushing to prod
		if (result['errors']) return true;
		if (result['data'] && result['data']?.receiverBalances?.length == 0) return true;
		else return false;
	} catch (error) {
		console.log('Error checking if signer exists in subgraph', error);
		return false;
	}
}

export async function getPondAndMPondBridgeAllowances(address: Address, contractAddress: Address) {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_POND_AND_MPOND_BRIDGE_ALLOWANCES;

	const queryVariables = {
		address: address.toLowerCase(),
		contractAddress: contractAddress.toLowerCase()
	};

	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);
	let mPond = BigNumberZero;
	let pond = BigNumberZero;
	try {
		const result = await fetchHttpData(url, options);
		console.log('pond mPond allowances', result);

		if (!result['data']) {
			return { pond, mPond };
		}

		const pondApprovals = result['data']?.pondApprovals;
		const mpondApprovals = result['data']?.mpondApprovals;

		// convert all to BigNumber
		if (pondApprovals?.length > 0) {
			pond = BigNumber.from(pondApprovals[0]?.value ?? 0);
		}
		if (mpondApprovals?.length > 0) {
			mPond = BigNumber.from(mpondApprovals[0]?.value ?? 0);
		}
		return { pond, mPond };
	} catch (error) {
		console.log('Error fetching receiver pond and mPond allowances from subgraph', error);
		return { pond, mPond };
	}
}

export async function getRequestedMPondForConversion(address: Address) {
	const url = ENVIRONMENT.public_bridge_contract_subgraph_url;
	const query = QUERY_TO_MPOND_REQUESTED_FOR_CONVERSION;

	const queryVariables = {
		address: address.toLowerCase()
	};

	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);

	let requestedMPond = BigNumberZero;

	try {
		const result: any | undefined = await fetchHttpData(url, options);
		console.log('mPond requested', result);

		if (!result['data']) {
			return requestedMPond;
		}

		const totalMpondPlacedInRequest = result['data']?.user?.totalMpondPlacedInRequest;

		if (totalMpondPlacedInRequest) {
			requestedMPond = BigNumber.from(totalMpondPlacedInRequest ?? 0);
		}
		return requestedMPond;
	} catch (error) {
		console.log('Error fetching requested mPond from subgraph', error);
		return requestedMPond;
	}
}

export async function getPondToMPondConversionHistory(address: Address) {
	const url = ENVIRONMENT.public_bridge_contract_subgraph_url;
	const query = QUERY_TO_GET_POND_TO_MPOND_CONVERSION_HSTORY;

	const queryVariables = {
		address: address.toLowerCase()
	};

	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (!result['data']?.users?.length) return undefined;
		const user = result['data']['users'][0];

		const pondToMpondConversions: PondToMPondHistoryDataModel[] | undefined =
			user?.pondToMpondConversions?.map((conversion: any) => {
				return {
					pondConverted: BigNumber.from(conversion.pondConverted),
					mpondReceived: BigNumber.from(conversion.mpondReceived),
					timestamp: Number(conversion.timestamp),
					transactionHash: conversion.transactionHash
				};
			});
		return pondToMpondConversions;
	} catch (error) {
		console.log('Error pond to mPond history data from subgraph', error);
		return undefined;
	}
}

export async function getMPondToPondConversionHistory(address: Address) {
	const url = ENVIRONMENT.public_bridge_contract_subgraph_url;
	const query = QUERY_TO_GET_MPOND_TO_POND_CONVERSION_HSTORY;

	const queryVariables = {
		address: address.toLowerCase()
	};

	const options: RequestInit = subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (!result['data']?.users?.length || !result['data']?.states?.length) return undefined;
		const user = result['data']['users'][0];
		const state = result['data']['states'][0];
		if (!user || !state) return undefined;

		const { mpondToPondConversions, requests } = user;
		const data = getModifiedMPondToPondHistory(mpondToPondConversions, requests, state);

		return data;
	} catch (error) {
		console.log('Error pond to mPond history data from subgraph', error);
		return undefined;
	}
}
