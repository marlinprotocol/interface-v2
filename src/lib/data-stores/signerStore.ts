import type { SignerAddressStore } from '$lib/types/storeTypes';
import { DEFAULT_SIGNER_ADDRESS_STORE } from '$lib/utils/constants/storeDefaults';
import { writable, type Writable } from 'svelte/store';

export const signerAddressStore: Writable<SignerAddressStore> = writable(
	DEFAULT_SIGNER_ADDRESS_STORE
);
