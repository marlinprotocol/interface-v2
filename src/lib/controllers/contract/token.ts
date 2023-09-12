import type { TokenMetadata, Tokens } from '$lib/types/environmentTypes';
import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { Address } from '@web3-onboard/core/dist/types';
import type { ContractAddress } from '$lib/types/storeTypes';
import { ERC20_ABI } from '$lib/utils/abis/erc20';
import { MESSAGES } from '$lib/utils/constants/messages';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { contractAddressStore } from '$lib/data-stores/contractStore';

let contractAddresses: ContractAddress;
contractAddressStore.subscribe((value) => {
	contractAddresses = value;
});

export async function approveToken(
	tokenToApprove: TokenMetadata,
	amount: bigint,
	toAddress: Address
) {
	const tokenContract = createSignerContract(
		contractAddresses[tokenToApprove.symbol as keyof Tokens],
		ERC20_ABI
	);

	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.APPROVING(
			bigNumberToString(amount, tokenToApprove.decimal, tokenToApprove.precision),
			tokenToApprove.symbol
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.APPROVED(
			bigNumberToString(amount, tokenToApprove.decimal, tokenToApprove.precision),
			tokenToApprove.symbol
		);
		const errorTxnMessage = 'Unable to approve staking token';
		const parentFunctionName = 'approveToken';
		const { txn } = await createTransaction(
			() => tokenContract.approve(toAddress, amount),
			initiateTxnMessage,
			successTxnMessage,
			errorTxnMessage,
			parentFunctionName
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
