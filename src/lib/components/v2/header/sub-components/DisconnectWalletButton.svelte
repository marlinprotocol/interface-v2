<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import DisconnectWalletModal from '$lib/components/v2/header/sub-components/DisconnectWalletModal.svelte';
	import { disconnectWallet } from '$lib/controllers/walletController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import ChainSwitcher from '$lib/components/v2/header/sub-components/ChainSwitcher.svelte';

	export let lastAddress: string | undefined = undefined;

	let modalFor = 'disconnect-wallet-modal-v2';

	const disconnect = () => {
		disconnectWallet($web3WalletStore);
		lastAddress = undefined;
	};

	$: shortAddress =
		$walletStore.address.slice().substring(0, 6) +
		'...' +
		$walletStore.address.slice().substring(38, 42);
</script>

<div data-testid="disconnect-wallet-button" class="flex gap-2">
	<ChainSwitcher />
	<ModalButton
		{modalFor}
		variant="whiteFilled"
		styleClass="chain-btn m-1 flex items-center justify-center"
	>
		<img src={staticImages.discChainLog} alt="Metamask Logo" />
		<div>
			<p class="text-sm font-medium text-[#030115]">{shortAddress}</p>
		</div>
	</ModalButton>
</div>
<DisconnectWalletModal {modalFor} {disconnect} />
