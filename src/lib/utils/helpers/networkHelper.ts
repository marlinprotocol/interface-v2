import ENVIRONMENT from '$lib/environments/environment';

export function isValidNetwork(id: number): boolean {
	return ENVIRONMENT.valid_chain_ids.includes(id);
}

export async function switchToValidNetwork() {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: ENVIRONMENT.public_network_id }]
	});
	window.location.reload();
}
