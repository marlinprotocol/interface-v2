<!-- !!!!!!!!! WARNING: THIS FILE IS NOT IN USE !!!!!!!!-->

<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { connectWallet } from '$lib/controllers/walletController';
	import { walletOptions } from '$lib/data-stores/walletProviderStore';
	import { getImagebyWalletProvider } from '$lib/utils/constants/componentConstants';
	import { WALLET_TYPE } from '$lib/utils/constants/constants';
	import WalletCard from './WalletCard.svelte';

	export let modalFor: string;
	const modalWidth = 'max-w-[500px]';
</script>

<Modal {modalFor} {modalWidth}>
	<svelte:fragment slot="header">Unlock Wallet</svelte:fragment>
	<svelte:fragment slot="title">Select a provider</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex justify-evenly gap-8 items-center">
			{#each walletOptions as walletOption (walletOption.id)}
				<WalletCard
					imageSrc={getImagebyWalletProvider(walletOption.provider)}
					title={walletOption.provider}
				>
					<Button
						slot="button"
						onclick={() => connectWallet(walletOption.provider)}
						variant="filled"
						styleClass={'w-[170px] h-12 text-base font-semibold'}
						disabled={walletOption.provider === WALLET_TYPE.walletconnect}
					>
						Connect
					</Button>
				</WalletCard>
			{/each}
		</div>
	</svelte:fragment>
</Modal>
