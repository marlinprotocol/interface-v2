import type { ChainStore, WalletStore } from '$lib/types/storeTypes';
import { DEFAULT_CHAIN_STORE, DEFAULT_WALLET_STORE } from '$lib/utils/constants/storeDefaults';
import type { WalletState } from '@web3-onboard/core';
import { writable, type Writable } from 'svelte/store';

const connectedValue = writable<boolean>();
export const walletStoreValue: Writable<WalletStore> = writable(DEFAULT_WALLET_STORE);
export const web3WalletStoreValue = writable<WalletState[]>([]);

export const connected = {
    subscribe: connectedValue.subscribe,
    set: vi.fn(),
    mockSetSubscribeValue: (value: boolean): void => connectedValue.set(value)
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

export const chainConfigStoreValue = writable<{ block_explorer_name: string, block_explorer_url: string }>({ block_explorer_name: 'Block Explorer', block_explorer_url: 'https://blockexplorer.com' });
export const chainConfigStore = {
    subscribe: chainConfigStoreValue.subscribe,
    set: vi.fn(),
    mockSetSubscribeValue: (value: { block_explorer_name: string, block_explorer_url: string }): void => chainConfigStoreValue.set(value)
};

export const chainStoreValue: Writable<ChainStore> = writable(DEFAULT_CHAIN_STORE);
export const chainStore = {
    subscribe: chainStoreValue.subscribe,
    set: vi.fn(),
    mockSetSubscribeValue: (value: ChainStore): void => chainStoreValue.set(value)
};