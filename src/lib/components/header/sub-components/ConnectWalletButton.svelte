<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import ConnectWalletModal from './ConnectWalletModal.svelte';

	export let isLarge = false;
	let modalFor = 'connect-wallet-modal';

	// do not remove this line
	$: provider = $walletStore.provider;
</script>

<label
	for={modalFor}
	class={`${
		isLarge
			? `${buttonClasses.filled} w-full h-14 text-base font-semibold`
			: `${buttonClasses.outlined} w-fit text-sm h-11`
	} flex gap-[10.3px] `}
>
	{#if !isLarge}
		<img src="/images/lockicon.svg" alt="Connect" />
	{/if}
	Connect Wallet
</label>

<ConnectWalletModal {modalFor} />
