import ENVIRONMENT from '$lib/environments/environment';
import type { Address, ReceiverStakeBalanceSnapshotData } from '$lib/types/storeTypes';
import {
	DEFAULT_RECEIVER_BALANCE_SNAPSHOT_DATA,
	DEFAULT_RECEIVER_BALANCE_DATA,
	DEFAULT_WALLET_BALANCE
} from '$lib/utils/constants/storeDefaults';
import {
	QUERY_TO_GET_MPOND_BALANCE,
	QUERY_TO_GET_POND_BALANCE_QUERY,
	QUERY_TO_GET_RECEIVER_BALANCE_SNAPSHOT_POND,
	QUERY_TO_GET_RECEIVER_STAKE_BALANCE_POND,
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
 * Returns Staked + Queued Pond for a specific Receiver address
 * @param address: Address of the receiver in string format
 * @returns Balance snapshot for the receiver
 */
export async function getReceiverStakeBalanceSnapshotFromSubgraph(
	address: Address
): Promise<ReceiverStakeBalanceSnapshotData> {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_RECEIVER_BALANCE_SNAPSHOT_POND;

	const currentEpochCycle = 152; //TODO: get real epoch cycle
	const queryVariables = { address: address.toLowerCase(), epoch: currentEpochCycle };
	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);
	try {
		const result = await fetchHttpData(url, options);
		const snapshots = result['data']?.receiverBalanceSnapshots;

		console.log('getReceiverStakeBalanceSnapshotFromSubgraph :>>', snapshots);
		if (!!!snapshots?.length) return DEFAULT_RECEIVER_BALANCE_SNAPSHOT_DATA;

		return {
			balance: snapshots[0].balance ?? DEFAULT_RECEIVER_BALANCE_SNAPSHOT_DATA.balance,
			epoch: snapshots[0].epoch ?? DEFAULT_RECEIVER_BALANCE_SNAPSHOT_DATA.epoch
		};
	} catch (error) {
		console.log('Error fetching receiver stake balance snapshot from subgraph', error);
		return DEFAULT_RECEIVER_BALANCE_SNAPSHOT_DATA;
	}
}

/**
 * Return Receiver balance for a specific Receiver address
 * @param address: Address of the receiver in string format
 * @returns balance bigInt for the receiver
 */
export async function getReceiverStakeBalanceFromSubgraph(address: Address): Promise<BigInt> {
	const url = ENVIRONMENT.public_contract_subgraph_url;
	const query = QUERY_TO_GET_RECEIVER_STAKE_BALANCE_POND;

	const queryVariables = { id: address.toLowerCase() };
	const options: RequestInit = await subgraphQueryWrapper(query, queryVariables);
	try {
		const result = await fetchHttpData(url, options);
		const receiverBalance = result['data']?.receiverBalance;

		console.log('getReceiverStakeBalanceFromSubgraph :>>', receiverBalance);

		if (!!!receiverBalance) return DEFAULT_RECEIVER_BALANCE_DATA;

		return receiverBalance.balance ?? DEFAULT_RECEIVER_BALANCE_DATA;
	} catch (error) {
		console.log('Error fetching receiver staked balance from subgraph', error);
		return DEFAULT_RECEIVER_BALANCE_DATA;
	}
}
