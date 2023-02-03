import ENVIRONMENT from '$lib/environments/environment';

/**
 * Checks if current chain is supported by the app or not
 * @param chainId
 * @returns
 */
export function isValidChain(chainId: number): boolean {
	return ENVIRONMENT.valid_chain_ids.includes(chainId);
}

export async function switchChain(chainId: string) {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: chainId }]
	});
}
