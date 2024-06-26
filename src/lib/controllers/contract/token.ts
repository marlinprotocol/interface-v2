import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { Address } from '@web3-onboard/core/dist/types';
import { ERC20_ABI } from '$lib/utils/abis/erc20';
import { TOKEN_TXN_MESSAGES } from '$lib/utils/constants/messages';
import type { TokenMetadata } from '$lib/types/environmentTypes';
import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';

export async function approveToken(
	tokenToApprove: TokenMetadata,
	amount: bigint,
	toAddress: Address
) {
	const tokenContract = createSignerContract(tokenToApprove.address, ERC20_ABI);

	try {
		const parentFunctionName = 'approveToken';
		const amountInString = bigNumberToString(
			amount,
			tokenToApprove.decimal,
			tokenToApprove.precision
		);
		const tokenName = tokenToApprove.currency;
		const messages = {
			initiate: {
				title: TOKEN_TXN_MESSAGES.INITIATING.title,
				message: TOKEN_TXN_MESSAGES.INITIATING.message(amountInString, tokenName)
			},
			created: {
				title: TOKEN_TXN_MESSAGES.APPROVING.title,
				message: TOKEN_TXN_MESSAGES.APPROVING.message(amountInString, tokenName)
			},
			success: {
				title: TOKEN_TXN_MESSAGES.APPROVED.title,
				message: TOKEN_TXN_MESSAGES.APPROVED.message(amountInString, tokenName)
			},
			failed: {
				title: TOKEN_TXN_MESSAGES.FAILED.title,
				message: TOKEN_TXN_MESSAGES.FAILED.message(amountInString, tokenName)
			}
		};
		const { txn } = await createTransaction(
			() => tokenContract.approve(toAddress, amount),
			parentFunctionName,
			messages
		);
		return txn;
	} catch (error: any) {
		throw new Error('Transaction Error');
	}
}
