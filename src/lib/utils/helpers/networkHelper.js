import { connectWallet } from '$lib/controllers/walletController';
import ENVIRONMENT from '$lib/environments/environment';
/**
 * Checks if current chain is supported by the app or not
 * @param chainId
 * @returns if chain is supported or not
 */
export function isValidChain(chainId) {
    return ENVIRONMENT.valid_chain_ids.includes(chainId);
}
export async function switchChain(provider, walletType, chainId) {
    await Promise.all([
        provider.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }]
        }),
        connectWallet(walletType)
    ]);
}
export const getChainDisplayName = (chainId) => {
    switch (chainId) {
        case 421613:
            return 'ETH GARB1';
        default:
            return undefined;
    }
};
//# sourceMappingURL=networkHelper.js.map