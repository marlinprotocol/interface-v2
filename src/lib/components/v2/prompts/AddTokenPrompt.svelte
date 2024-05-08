<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { chainConfigStore, chainStore } from '$lib/data-stores/chainProviderStore';
	import { web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import type { Eip1193Provider } from 'ethers';
	import type { TokenMetadata } from '$lib/types/environmentTypes';
	import { addToast } from '$lib/data-stores/v2/toastStore';
	import { staticImages } from '$lib/components/images/staticImages';

	export let tokenFor: 'POND' | 'MPOND' = 'POND';
	export let label: string;

	async function addTokenToWallet(
		walletProvider: Eip1193Provider,
		tokenData: TokenMetadata | undefined
	) {
		if (!$chainStore.isValidChain) {
			addToast({
				message: {
					title: 'Unsupported chain',
					description:
						'You are currently on an unsupported network. Please connect to a valid chain'
				},
				variant: 'error'
			});
		} else {
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
								image: staticImages.MarlinLogo
							}
						}
					});
					if (added) {
						addToast({
							message: {
								title: 'Success',
								description: `${tokenFor} added to wallet successfully!`
							},
							variant: 'success'
						});
					} else {
						addToast({
							message: {
								title: 'Try again',
								description: 'Uh-oh, there seems to be an issue, please try again'
							},
							variant: 'info'
						});
					}
				} catch (error) {
					console.log(error);
					addToast({
						message: {
							title: 'Error',
							description: 'There seems to be an error. Please try again in some time'
						},
						variant: 'error'
					});
				}
			}
		}
	}
</script>

<Button
	variant="greyFilled"
	size="small"
	styleClass="font-medium gap-3"
	onclick={() => addTokenToWallet($web3WalletStore[0].provider, $chainConfigStore.tokens[tokenFor])}
>
	<span class="text-2xl font-light">+</span> Add {label}</Button
>
