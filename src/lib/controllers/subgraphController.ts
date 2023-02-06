import ENVIRONMENT from '$lib/environments/environment';
import type { Address, EpochStore, ReceiverStakingData } from '$lib/types/storeTypes';
import {
	DEFAULT_EPOCH_STORE,
	DEFAULT_RECEIVER_STAKING_DATA,
	DEFAULT_WALLET_BALANCE
} from '$lib/utils/constants/storeDefaults';
import {
	QUERY_TO_GET_EPOCH_START_TIME_AND_LENGTH_QUERY,
	QUERY_TO_GET_MPOND_BALANCE,
	QUERY_TO_GET_POND_BALANCE_QUERY,
	QUERY_TO_GET_RECEIVER_STAKING_DATA,
	QUERY_TO_GET_RECIEVER_POND_BALANCE
} from '$lib/utils/constants/subgraphQueries';
import { fetchHttpData } from '$lib/utils/helpers/httpHelper';
import { BigNumber } from 'ethers';

/**
 * Generate HTTP request headers for querying subgraph
 * @param query: graphQL query in stringified format
 * @param variable: Object containing variables used in query
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

// ----------------------------- pond and mpond subgraph methods -----------------------------

/**
 * Get POND balance from subgraph API.
 */
export async function getPondBalance(address: Address): Promise<BigNumber> {
	const url = ENVIRONMENT.public_pond_subgraph_url;
	const query = QUERY_TO_GET_POND_BALANCE_QUERY;
	const queryVariables = { address: address.toLowerCase() };

	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (result['data'] && result['data']?.users?.length != 0)
			return BigNumber.from(result['data']?.users[0]?.balance);
		else return DEFAULT_WALLET_BALANCE.pond;
	} catch (error) {
		console.log('Error fetching Pond balance', error);
		return DEFAULT_WALLET_BALANCE.pond;
	}
}

/**
 * Get MPOND balance from subgraph API.
 */
export async function getMpondBalance(address: Address): Promise<BigNumber> {
	const url = ENVIRONMENT.public_mpond_subgraph_url;
	const query = QUERY_TO_GET_MPOND_BALANCE;
	const queryVariables = { id: address.toLowerCase() };

	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		if (result['data'] && result['data']?.balances?.length != 0)
			return BigNumber.from(result['data']?.balances[0]?.amount);
		else return DEFAULT_WALLET_BALANCE.mpond;
	} catch (error) {
		console.log('Error fetching Mpond balance', error);
		return DEFAULT_WALLET_BALANCE.mpond;
	}
}
// ----------------------------- smart contract subgraph methods -----------------------------
//TODO: add return types
export async function getReceiverPondBalanceFromSubgraph(address: Address): Promise<any> {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_RECIEVER_POND_BALANCE;

	const queryVariables = { id: address.toLowerCase() };
	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);
	try {
		const result = await fetchHttpData(url, options);
		console.log('subgraph result object', result);
		console.log('upacked object', result['data']?.receiverBalances);
		console.log('Receiver Balance: ', result['data']?.receiverBalances[0]?.balance);
		if (result['data'] && result['data']?.receiverBalances?.length != 0)
			return result['data']?.receiverBalances[0]?.balance;
		else return DEFAULT_WALLET_BALANCE.mpond;
	} catch (error) {
		console.log('Error fetching receiver pond balance from subgraph', error);
		return DEFAULT_WALLET_BALANCE.mpond;
	}
}

/**
 * Returns Staked, Queued Pond for a specific Receiver address
 * @param address: Address of the receiver in string format
 * @param epoch: Epoch number
 */
export async function getReceiverStakingDataFromSubgraph(
	address: Address,
	epoch: EpochStore['epochCycle']
): Promise<ReceiverStakingData> {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_RECEIVER_STAKING_DATA;

	const queryVariables = { address: address.toLowerCase(), epoch: epoch.toString() };
	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);
	try {
		const result = await fetchHttpData(url, options);
		const balance = result['data']?.receiverBalance?.balance;
		const balanceSnapshots = result['data']?.receiverBalanceSnapshots;
		const pondUser = result['data']?.pondUser;

		let stakeData: ReceiverStakingData = DEFAULT_RECEIVER_STAKING_DATA;

		//update in queue balance
		if (!!balanceSnapshots?.length) {
			const balanceSnapshot = balanceSnapshots[0];
			stakeData = {
				...stakeData,
				queued: {
					balance:
						BigNumber.from(balanceSnapshot.balance) ?? DEFAULT_RECEIVER_STAKING_DATA.queued.balance,
					epoch: parseInt(balanceSnapshot.epoch) ?? DEFAULT_RECEIVER_STAKING_DATA.queued.epoch
				}
			};
		}
		//update staked balance
		if (!!balance) {
			//staked amount is the difference of balance and balance snapshot
			const stakedAmount = BigNumber.from(balance).sub(stakeData.queued.balance);
			stakeData = {
				...stakeData,
				stakedBalance: stakedAmount ?? DEFAULT_RECEIVER_STAKING_DATA.stakedBalance
			};
		}
		//update approved POND balance
		// TODO: remove this once the subgraph is updated
		if (!!pondUser) {
			stakeData = {
				...stakeData,
				approvedBalance:
					BigNumber.from('2000000000000000000') ?? DEFAULT_RECEIVER_STAKING_DATA.approvedBalance
			};
		}

		return stakeData;
	} catch (error) {
		console.log('Error fetching receiver staked, in queue data from subgraph', error);
		return DEFAULT_RECEIVER_STAKING_DATA;
	}
}

/**
 * Get start time and epoch length from subgraph API.
 */
export async function getCurrentEpoch(): Promise<EpochStore> {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_EPOCH_START_TIME_AND_LENGTH_QUERY;

	const queryVariables = { first: 2 };

	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);

	try {
		const result = await fetchHttpData(url, options);
		const params = result['data']?.params;

		if (!params?.length || params?.length !== 2) return DEFAULT_EPOCH_STORE;

		const startTimeMap = params.find((param: any) => param.id === 'START_TIME');
		const epochLengthMap = params.find((param: any) => param.id === 'EPOCH_LENGTH');

		if (!!!startTimeMap?.value || !!!epochLengthMap?.value) return DEFAULT_EPOCH_STORE;

		const epochStartTime = parseInt(startTimeMap.value);
		const epochLength = parseInt(epochLengthMap.value);

		if (epochLength === 0) return DEFAULT_EPOCH_STORE;

		const currentEpoch = new Date().getTime() / 1000;
		const epochCycle = Math.floor((currentEpoch - epochStartTime) / epochLength) + 1;

		return {
			epochStartTime,
			epochLength,
			epochCycle
		};
	} catch (error) {
		console.log('Error fetching current epoch', error);
		return DEFAULT_EPOCH_STORE;
	}
}
