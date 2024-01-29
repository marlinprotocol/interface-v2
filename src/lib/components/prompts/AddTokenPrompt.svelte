<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import type { Eip1193Provider } from 'ethers';
	import { staticImages } from '../images/staticImages';
	import type { TokenMetadata } from '$lib/types/environmentTypes';

	export let tokenFor: 'POND' | 'MPOND' = 'POND';
	export let buttonText = 'Add Token';

	async function addTokenToWallet(
		walletProvider: Eip1193Provider,
		tokenData: TokenMetadata | undefined
	) {
		//TODO: could check from the wallet provider which wallet it associates to and add in functions for each wallet if that is something that we can do
		if (walletProvider) {
			try {
				const added = await walletProvider.request({
					method: 'wallet_watchAsset',
					params: {
						type: 'ERC20',
						options: {
							address: tokenData?.address,
							symbol: tokenData?.currency,
							decimals: tokenData?.decimal,
							// TODO: this doesn't work, the image would need to be hosted somewhere ig?
							image: staticImages.MarlinLogo
						}
					}
				});
				if (added) {
					console.log('Token added');
				} else {
					console.log('Token not added');
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
</script>

<Button
	onclick={() => addTokenToWallet($web3WalletStore[0].provider, $chainConfigStore.tokens[tokenFor])}
	>{buttonText}</Button
>
