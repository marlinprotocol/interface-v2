import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
	oysterLocalStorageStore,
	addJobToOysterLocalStorageStore,
	removeJobFromOysterLocalStorageStore
} from './localStorageStore';
import type { Address, OysterLocalStorageDataModel } from '$lib/types/storeTypes';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';

const mockJob = { id: '123' } as OysterInventoryDataModel;
const mockAddress: Address = '0x123';
const mockChainId = 1;

beforeEach(() => {
	localStorage.clear();
	oysterLocalStorageStore.set({});
});

describe('localStorageStore', () => {
	it('should add a job to the local storage store', () => {
		addJobToOysterLocalStorageStore(mockChainId, mockAddress, mockJob);
		const storeData: OysterLocalStorageDataModel = get(oysterLocalStorageStore);
		expect(storeData[mockChainId][mockAddress]).toContainEqual(mockJob);
	});

	it('should not add a duplicate job to the local storage store', () => {
		addJobToOysterLocalStorageStore(mockChainId, mockAddress, mockJob);
		addJobToOysterLocalStorageStore(mockChainId, mockAddress, mockJob);
		const storeData: OysterLocalStorageDataModel = get(oysterLocalStorageStore);
		expect(storeData[mockChainId][mockAddress].length).toBe(1);
	});

	it('should remove a job from the local storage store', () => {
		addJobToOysterLocalStorageStore(mockChainId, mockAddress, mockJob);
		removeJobFromOysterLocalStorageStore(mockChainId, mockAddress, mockJob);
		const storeData: OysterLocalStorageDataModel = get(oysterLocalStorageStore);
		expect(storeData[mockChainId][mockAddress]).not.toContainEqual(mockJob);
	});

	it('should handle adding a job to a new chainId and walletAddress', () => {
		const newChainId = 2;
		const newAddress: Address = '0x456';
		addJobToOysterLocalStorageStore(newChainId, newAddress, mockJob);
		const storeData: OysterLocalStorageDataModel = get(oysterLocalStorageStore);
		expect(storeData[newChainId][newAddress]).toContainEqual(mockJob);
	});
});
