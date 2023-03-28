<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { disconnectWallet } from '$lib/controllers/walletController';
	import { addToast } from '$lib/data-stores/toastStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';

	export let modalFor: string;
	$: blockChainExplorerLink = `https://arbiscan.io/address/${$walletStore.address}`;

	const onCopyAddress = () => {
		copyTextToClipboard($walletStore.address);
		addToast({
			message: `Address copied to clipboard`,
			variant: 'success'
		});
	};
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Your wallet</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="rounded-lg p-4 bg-base-200 text-left mb-4">
			<div class="font-normal flex items-center text-sm">
				My Address
				<TooltipIcon tooltipText={'Wallet Address'} styleClass="ml-1" />
			</div>
			<div class="font-semibold text-xl mt-1">{$walletStore.address}</div>
		</div>
		<div class="flex gap-4">
			<div
				class={`${buttonClasses.greyFilled} h-10 text-small font-medium gap-3`}
				on:keypress={onCopyAddress}
				on:click={onCopyAddress}
			>
				<img src="/images/copyicon.svg" alt="Copy" />
				Copy Address
			</div>
			<!-- TODO: make link and text dynamic based on chain -->
			<a href={blockChainExplorerLink} target="_blank" rel="noopener noreferrer"
				><div class={`${buttonClasses.greyFilled} h-10 text-small font-medium gap-3`}>
					<img src="/images/openinnew.svg" alt="Open" />
					View on Arbiscan
				</div></a
			>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			size="large"
			onclick={() => {
				disconnectWallet();
			}}
			styleClass={'w-full font-semibold text-base'}>LOGOUT</Button
		>
	</svelte:fragment>
</Modal>
