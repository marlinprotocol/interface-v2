<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import copy from 'svelte-awesome/icons/copy';
	import externalLink from 'svelte-awesome/icons/externalLink';
	import { resetWalletProviderStore, walletStore } from '$lib/data-stores/walletProviderStore';
	import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';

	const modalFor = 'disconnect-wallet-modal';
	const actionButtonStyles =
		'flex text-sm cursor-pointer items-center font-medium gap-2 rounded-md bg-base-200 px-4 py-2';

	$: blockChainExplorerLink = `https://arbiscan.io/address/${$walletStore.address}`;
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Your wallet</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="rounded-md p-4 bg-base-200 text-left mb-4">
			<div class="font-normal flex items-center text-sm">
				My Address
				<TooltipIcon tooltipText={'Wallet Address'} styleClass="ml-1" />
			</div>
			<div class="font-semibold text-xl mt-1">{$walletStore.address}</div>
		</div>
		<div class="flex gap-4">
			<!-- TOD0: add toast for confirmation message -->
			<div
				class={actionButtonStyles}
				on:keypress={() => copyTextToClipboard($walletStore.address)}
				on:click={() => copyTextToClipboard($walletStore.address)}
			>
				<Icon data={copy} />
				Copy Address
			</div>
			<!-- TODO: make link and text dynamic based on chain -->
			<a href={blockChainExplorerLink} target="_blank" rel="noopener noreferrer"
				><div class={actionButtonStyles}>
					<Icon data={externalLink} />
					View on Arbiscan
				</div></a
			>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton onclick={() => resetWalletProviderStore()} styleClass={'w-full'}
			>Disconnect Wallet</FilledButton
		>
	</svelte:fragment>
</Modal>
