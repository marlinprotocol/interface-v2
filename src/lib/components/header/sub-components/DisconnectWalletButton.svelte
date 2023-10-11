<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import DisconnectWalletModal from '$lib/components/header/sub-components/DisconnectWalletModal.svelte';
	import { disconnectWallet } from '$lib/controllers/walletController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import ChainSwitcher from '$lib/components/header/sub-components/ChainSwitcher.svelte';

	let modalFor = 'disconnect-wallet-modal';

	const disconnect = () => {
		disconnectWallet($web3WalletStore);
	};

	const styles = {
		address: 'text-2xs text-[#0498ad] font-medium',
		network: 'font-bold text-sm text-[#07617d]'
	};

	$: shortAddress =
		$walletStore.address.slice().substring(0, 6) +
		'...' +
		$walletStore.address.slice().substring(38, 42);
</script>

<div class="flex gap-2">
	<ChainSwitcher />
	<ModalButton
		{modalFor}
		variant="whiteFilled"
		styleClass="bg-base-100 h-[50px] cursor-pointer text-primary rounded-lg shadow-sm flex gap-4 items-center"
	>
		<img src={staticImages.WalletConnected} alt="Metamask Logo" />
		<div class={'flex flex-col text-left'}>
			<h6 class={styles.network}>{$chainStore?.chainDisplayName?.toLocaleUpperCase()}</h6>
			<p class={styles.address}>{shortAddress}</p>
		</div>
	</ModalButton>
</div>
<DisconnectWalletModal {modalFor} {disconnect} />
