<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { ButtonModel } from '$lib/types/componentTypes';
	import ConnectWalletModal from './ConnectWalletModal.svelte';
	import lock from 'svelte-awesome/icons/lock';
	import Icon from '$lib/atoms/icons/Icon.svelte';

	export let isLarge = false;
	export let variant: ButtonModel['variant'] = 'outlined';
	let modalFor = 'connect-wallet-modal';
	const connectWalletStyles = 'flex gap-[10.3px] ';

	// do not remove this line
	$: provider = $walletStore.provider;

	$: baseClass = `${
		variant === 'filled' ? buttonClasses.filled : buttonClasses.outlined
	} ${connectWalletStyles}`;
</script>

{#if isLarge}
	<ModalButton {modalFor} styleClass={`${baseClass} w-full h-14 text-base font-semibold`}>
		<Icon data={lock} size={20} iconColorClass={'icon-white'} />
		Connect Wallet
	</ModalButton>
{:else}
	<ModalButton {modalFor} size="small" styleClass={`${baseClass} w-fit text-sm h-11 `}>
		<img src={staticImages.Lock} alt="Connect" />
		Connect Wallet
	</ModalButton>
{/if}
<ConnectWalletModal {modalFor} />
