import type { WalletStore } from '$lib/types/storeTypes';
import { DEFAULT_WALLET_STORE } from '$lib/utils/constants/storeDefaults';
import type { WalletState } from '@web3-onboard/core';
import { writable, type Writable } from 'svelte/store';

const mockIsAnonymousWritable = writable<boolean>();
export const walletStoreValue: Writable<WalletStore> = writable(DEFAULT_WALLET_STORE);
export const web3WalletStoreValue = writable<WalletState[]>([]);

export const mockIsAnonymousStore = {
    subscribe: mockIsAnonymousWritable.subscribe,
    set: vi.fn(),
    mockSetSubscribeValue: (value: boolean): void => mockIsAnonymousWritable.set(value)
};


export const web3WalletStore = {
    subscribe: web3WalletStoreValue.subscribe,
    set: vi.fn(),
    mockSetSubscribeValue: (value: WalletState[]): void => web3WalletStoreValue.set(value)
};
export const walletStore = {
    subscribe: walletStoreValue.subscribe,
    set: vi.fn(),
    mockSetSubscribeValue: (value: WalletStore): void => walletStoreValue.set(value)
};