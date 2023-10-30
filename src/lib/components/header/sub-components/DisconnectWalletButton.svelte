<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import DisconnectWalletModal from '$lib/components/header/sub-components/DisconnectWalletModal.svelte';
	import { disconnectWallet, setWalletAndChainStores } from '$lib/controllers/walletController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import ChainSwitcher from '$lib/components/header/sub-components/ChainSwitcher.svelte';

	let modalFor = 'disconnect-wallet-modal';

	const disconnect = () => {
		disconnectWallet($web3WalletStore);
	};

	$: shortAddress =
		$walletStore.address.slice().substring(0, 6) +
		'...' +
		$walletStore.address.slice().substring(38, 42);

	// this is responsible for wallet switching
	$: connectedAccount = $web3WalletStore?.[0];
	$: if (connectedAccount) {
		setWalletAndChainStores(connectedAccount.provider);
	}
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
			<span class="text-sm font-bold text-[#07617d]"
				>{$chainStore?.chainDisplayName?.toLocaleUpperCase()}</span
			>
			<p class="text-2xs font-medium text-[#008295]">{shortAddress}</p>
		</div>
	</ModalButton>
</div>
<DisconnectWalletModal {modalFor} {disconnect} />
