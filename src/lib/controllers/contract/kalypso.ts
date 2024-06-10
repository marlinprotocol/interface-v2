import { contractAddressStore } from '$lib/data-stores/contractStore';
import type { Address, ContractAddress } from '$lib/types/storeTypes';
import { KALYPSO_ABI } from '$lib/utils/abis/kalypso';
import { MESSAGES } from '$lib/utils/constants/messages';
import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';
import type { BytesLike } from 'ethers';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function registerInKalypso(
	rewardAddress: Address,
	declaredCompute: bigint,
	initialStake: bigint,
	generatorData: BytesLike
) {
	const kalypsoContract = createSignerContract(contractAddresses.KALYPSO, KALYPSO_ABI);
	try {
		const initiateTxnMessage = MESSAGES.TOAST.REGISTER_KALYPSO.CREATED;
		const successTxnMessage = MESSAGES.TOAST.REGISTER_KALYPSO.SUCCESS;
		const errorTxnMessage = MESSAGES.TOAST.REGISTER_KALYPSO.FAILED;
		const parentFunctionName = 'registerInKalypso';
		// const initiateTxnTitle = MESSAGES.TOAST.CONVERSION.CREATED;
		// const successTxnTitle = MESSAGES.TOAST.CONVERSION.SUCCESS;
		// const failedTxnTitle = MESSAGES.TOAST.CONVERSION.FAILED;
		const initiateTxnTitle = 'Registering you in Kalypso?';
		const successTxnTitle = 'Successfully registered in Kalypso!';
		const failedTxnTitle = 'Failed to register in Kalypso';
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const { txn } = await createTransaction(
			() => kalypsoContract.register(rewardAddress, declaredCompute, initialStake, generatorData),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName,
			titles
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
