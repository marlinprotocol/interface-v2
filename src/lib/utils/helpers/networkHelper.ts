import { PUBLIC_NETWORK_ID } from '$env/static/public';
import { VALID_CHAIN_IDS } from '../constants/networkConstants';

export function isValidNetwork(id: number): boolean {
	return VALID_CHAIN_IDS.includes(id);
}

export async function switchToValidNetwork() {
	await window.ethereum.request({
		method: 'wallet_switchEthereumChain',
		params: [{ chainId: PUBLIC_NETWORK_ID }]
	});
	window.location.reload();
}
