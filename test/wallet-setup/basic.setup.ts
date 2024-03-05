import { MetaMask, defineWalletSetup } from '@synthetixio/synpress'
import 'dotenv/config'

// const SEED_PHRASE = import.meta.env.VITE_SEED_PHRASE || ''
// const PASSWORD = import.meta.env.VITE_WALLET_PASSWORD || ''

const SEED_PHRASE = process.env.VITE_SEED_PHRASE || ''
const PASSWORD = process.env.VITE_WALLET_PASSWORD || ''
// const SEED_PHRASE = 'test test test test test test test test test test test junk'
// const PASSWORD = 'SynpressIsAwesomeNow!!!'
// console.log(SEED_PHRASE, PASSWORD)


export default defineWalletSetup(PASSWORD, async (context, walletPage) => {
    const metamask = new MetaMask(context, walletPage, PASSWORD)

    await metamask.importWallet(SEED_PHRASE)
})
