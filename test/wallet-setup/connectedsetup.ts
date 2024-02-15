import { MetaMask, defineWalletSetup, getExtensionId } from '@synthetixio/synpress'
import 'dotenv/config'

const SEED_PHRASE = process.env.VITE_SEED_PHRASE || ''
const PASSWORD = process.env.VITE_WALLET_PASSWORD || ''

export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
    // This is a workaround for the fact that the MetaMask extension ID changes.
    // This workaround won't be needed in the near future! 😁
    const extensionId = await getExtensionId(context, 'MetaMask');

    const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

    await metamask.importWallet(SEED_PHRASE);

    const page = await context.newPage();

    // Go to a locally hosted MetaMask Test Dapp.
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })

    const connectWalletButtons = await page.$$('button:has-text("Connect Wallet")');
    connectWalletButtons[0].click();

    const metamaskButton = page.getByRole('button', { name: 'MetaMask' });
    await metamaskButton.click();

    await metamask.connectToDapp();
    await metamask.addNetwork({
        name: 'Arbitrum Rinkeby',
        rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public',
        chainId: 421614,
        symbol: 'ETH',
        blockExplorerUrl: 'https://testnet.arbiscan.io',
    })
})
