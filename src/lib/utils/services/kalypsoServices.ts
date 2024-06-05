import { registerInKalypso } from '$lib/controllers/contract/kalypso';
import { approveToken } from '$lib/controllers/contract/token';
import {
	registerInKalypsoStore,
	updateApprovedFundsInKalypsoStore
} from '$lib/data-stores/kalypsoStore';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import type { Address } from '$lib/types/storeTypes';

export async function handleRegisterInKalypso(
	rewardAddress: Address,
	declaredCompute: bigint,
	initialStake: bigint,
	generatorData: string
) {
	try {
		await registerInKalypso(rewardAddress, declaredCompute, initialStake, generatorData);
		registerInKalypsoStore(rewardAddress, declaredCompute, initialStake, generatorData);
	} catch (e) {
		console.log('e :>> ', e);
	}
}

export async function handleApproveFundForKalypso(
	amount: bigint,
	kalypsoToken: TokenMetadata,
	kalypsoContractAddress: string
) {
	try {
		await approveToken(kalypsoToken, amount, kalypsoContractAddress);
		updateApprovedFundsInKalypsoStore(amount);
	} catch (e) {
		console.log('e :>> ', e);
	}
}
