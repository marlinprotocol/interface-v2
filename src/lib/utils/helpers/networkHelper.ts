import { ENVIRONMENT, VALID_CHAIN_IDS } from '$lib/environments/environment.dev';

export function isValidNetwork(id: number): boolean {
	return VALID_CHAIN_IDS.includes(id);
}

export async function switchToValidNetwork() {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: ENVIRONMENT.public_network_id }]
	});
	window.location.reload();
}
