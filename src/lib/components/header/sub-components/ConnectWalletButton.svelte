<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletModal from './ConnectWalletModal.svelte';

	export let isLarge = false;
	let modalFor = 'connect-wallet-modal';
	const connectWalletStyles = 'flex gap-[10.3px] ';

	// do not remove this line
	$: provider = $walletStore.provider;
</script>

{#if isLarge}
	<ModalButton
		{modalFor}
		styleClass={`${buttonClasses.filled} ${connectWalletStyles} w-full h-14 text-base font-semibold`}
	>
		<img src="/images/lockicon.svg" alt="Connect" />
		Connect Wallet
	</ModalButton>
{:else}
	<ModalButton
		{modalFor}
		size="small"
		styleClass={`${buttonClasses.outlined} ${connectWalletStyles} w-fit text-sm h-11 `}
	>
		Connect Wallet
	</ModalButton>
{/if}

<ConnectWalletModal {modalFor} />
