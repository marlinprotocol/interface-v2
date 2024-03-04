import type { Page } from "@playwright/test";
import type { MetaMask } from "@synthetixio/synpress";
import { ARB_SEPOLIA } from '../../src/lib/chains/arbSepolia';

export const loginToMetamask = async (metamask: MetaMask, page: Page) => {
    const connectWalletButtons = await page.$$('button:has-text("Connect Wallet")');
    await connectWalletButtons[0].click();

    const metamaskButton = page.getByRole('button', { name: 'MetaMask' });
    await metamaskButton.click();

    await metamask.connectToDapp()
    await metamask.addNetwork({
        name: ARB_SEPOLIA.chain_name,
        rpcUrl: ARB_SEPOLIA.rpc_url,
        chainId: 421614,
        symbol: ARB_SEPOLIA.chain_token,
        blockExplorerUrl: ARB_SEPOLIA.block_explorer_name,
    })
    // await metamask.switchNetwork(ARB_SEPOLIA.chain_name);
}