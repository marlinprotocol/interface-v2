<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { connectWallet } from '$lib/controllers/walletController';
	import { walletOptions } from '$lib/data-stores/walletProviderStore';
	import { getImagebyWalletProvider } from '$lib/utils/constants/componentConstants';
	import WalletCard from './WalletCard.svelte';

	const modalFor = 'connect-wallet-modal';
	const modalWidth = 'max-w-[500px]';
</script>

<Modal {modalFor} {modalWidth}>
	<svelte:fragment slot="header">Unlock Wallet</svelte:fragment>
	<svelte:fragment slot="title">Select a provider</svelte:fragment>
	<svelte:fragment slot="action-buttons">
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
					>
						Connect
					</Button>
				</WalletCard>
			{/each}
		</div>
	</svelte:fragment>
</Modal>
