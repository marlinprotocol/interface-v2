// import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import type { Address, OysterLocalStorageDataModel } from '$lib/types/storeTypes';
import { OYSTER_INVENTORY_DATA_MODEL_BIG_INT_KEYS } from '$lib/utils/constants/oysterConstants';
import { get, writable } from 'svelte/store';

// these replacer and reviver functions are used to convert bigInts to strings and back, ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const replacer = (key: any, value: any) => (typeof value === 'bigint' ? value.toString() : value);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reviver = (key: any, value: any) =>
	OYSTER_INVENTORY_DATA_MODEL_BIG_INT_KEYS.includes(key) ? BigInt(value) : value;

// Get the value out of storage on load.
const oysterLocalStorageData = localStorage.getItem('oysterLocalStorageStore');

// Set the stored value or a sane default.
export const oysterLocalStorageStore = writable<OysterLocalStorageDataModel>(
	oysterLocalStorageData ? JSON.parse(oysterLocalStorageData, reviver) : '{}'
);

// Anytime the store changes, update the local storage value.
oysterLocalStorageStore.subscribe(
	(value) => (localStorage.oysterLocalStorageStore = JSON.stringify(value, replacer))
);

export function removeJobFromOysterLocalStorageStore(
	chainId: number,
	walletAddress: Address,
	job: OysterInventoryDataModel
) {
	console.log(
		'removed entry from local storage for chainId :>> ',
		chainId,
		'walletAddress :>>',
		walletAddress,
		'job :>>',
		job
	);
	const stringChainId = chainId.toString();
	oysterLocalStorageStore.update((value) => {
		return {
			...value,
			[stringChainId]: {
				...value[stringChainId],
				[walletAddress]: [
					...value[stringChainId][walletAddress].filter((entry) => entry.id !== job.id)
				]
			}
		};
	});
}

export function addJobToOysterLocalStorageStore(
	chainId: number,
	walletAddress: Address,
	jobEntry: OysterInventoryDataModel
) {
	console.log(
		'added entry to local storage for chainId :>> ',
		chainId,
		'walletAddress :>>',
		walletAddress,
		'jobEntry :>>',
		jobEntry
	);

	const oysterLocalStorageData: OysterLocalStorageDataModel | null = get(oysterLocalStorageStore);
	const jobAlreadyInLocalStorage =
		oysterLocalStorageData &&
		oysterLocalStorageData[chainId] &&
		oysterLocalStorageData[chainId][walletAddress] &&
		oysterLocalStorageData[chainId][walletAddress].find((entry) => entry.id === jobEntry.id);
	if (jobAlreadyInLocalStorage) {
		return;
	}
	if (!oysterLocalStorageData || !oysterLocalStorageData[chainId]) {
		oysterLocalStorageStore.update((value) => {
			return {
				...value,
				[chainId]: {
					[walletAddress]: [jobEntry]
				}
			};
		});
	} else if (oysterLocalStorageData[chainId] && !oysterLocalStorageData[chainId][walletAddress]) {
		oysterLocalStorageStore.update((value) => {
			return {
				...value,
				[chainId]: {
					...value[chainId],
					[walletAddress]: [jobEntry]
				}
			};
		});
	} else if (oysterLocalStorageData[chainId] && oysterLocalStorageData[chainId][walletAddress]) {
		oysterLocalStorageStore.update((value) => {
			return {
				...value,
				[chainId]: {
					...value[chainId],
					[walletAddress]: [...oysterLocalStorageData[chainId][walletAddress], jobEntry]
				}
			};
		});
	}
}
