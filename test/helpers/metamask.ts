import { Page } from "@playwright/test";
import { MetaMask } from "@synthetixio/synpress";

export const loginToMetamask = async (metamask: MetaMask, page: Page) => {
    const connectWalletButtons = await page.$$('button:has-text("Connect Wallet")');
    await connectWalletButtons[0].click();

    const metamaskButton = page.getByRole('button', { name: 'MetaMask' });
    await metamaskButton.click();

    await metamask.connectToDapp()
    await metamask.addNetwork({
        name: 'Arbitrum Sepolia',
        rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
        chainId: 421614,
        symbol: 'ETH',
        blockExplorerUrl: 'https://testnet.arbiscan.io',
    })
    await metamask.switchNetwork('Arbitrum Sepolia');
}