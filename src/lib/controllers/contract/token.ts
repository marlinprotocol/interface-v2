import { createSignerContract, createTransaction } from '$lib/utils/helpers/contractHelpers';

import type { Address } from '$lib/types/storeTypes';
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
				title: TOKEN_TXN_MESSAGES.INITIATED.title,
				description: TOKEN_TXN_MESSAGES.INITIATED.description(amountInString, tokenName)
			},
			created: {
				title: TOKEN_TXN_MESSAGES.CREATED.title,
				description: TOKEN_TXN_MESSAGES.CREATED.description(amountInString, tokenName)
			},
			success: {
				title: TOKEN_TXN_MESSAGES.SUCCESS.title,
				description: TOKEN_TXN_MESSAGES.SUCCESS.description(amountInString, tokenName)
			},
			failed: {
				title: TOKEN_TXN_MESSAGES.FAILED.title,
				description: TOKEN_TXN_MESSAGES.FAILED.description(amountInString, tokenName)
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
