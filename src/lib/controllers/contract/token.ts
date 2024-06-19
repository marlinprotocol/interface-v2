import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { Address } from '@web3-onboard/core/dist/types';
import { ERC20_ABI } from '$lib/utils/abis/erc20';
import { MESSAGES } from '$lib/utils/constants/messages';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
import { removeTrailingZeros } from '$lib/utils/helpers/commonHelper';

export async function approveToken(
	tokenToApprove: TokenMetadata,
	amount: bigint,
	toAddress: Address
) {
	const tokenContract = createSignerContract(tokenToApprove.address, ERC20_ABI);

	try {
		const initiateTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.APPROVING(
			removeTrailingZeros(
				bigNumberToString(amount, tokenToApprove.decimal, tokenToApprove.precision)
			),
			tokenToApprove.currency
		);
		const successTxnMessage = MESSAGES.TOAST.ACTIONS.APPROVE.APPROVED(
			removeTrailingZeros(
				bigNumberToString(amount, tokenToApprove.decimal, tokenToApprove.precision)
			),
			tokenToApprove.currency
		);
		const initiateTxnTitle = MESSAGES.TOAST.APPROVAL.CREATED;
		const successTxnTitle = MESSAGES.TOAST.APPROVAL.SUCCESS;
		const failedTxnTitle = MESSAGES.TOAST.APPROVAL.FAILED;
		const titles = {
			initiateTxnTitle,
			successTxnTitle,
			failedTxnTitle
		};
		const errorTxnMessage = 'Unable to approve staking token';
		const parentFunctionName = 'approveToken';
		const { txn } = await createTransaction(
			() => tokenContract.approve(toAddress, amount),
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
