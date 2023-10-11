<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { handleCopyClick } from '$lib/utils/helpers/componentHelper';

	export let modalFor: string;
	export let disconnect: () => void;

	$: blockChainExplorerLink = `${$chainConfigStore.block_explorer_url}/address/${$walletStore.address}`;
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Your wallet</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="rounded-lg p-4 bg-base-200 text-left mb-4">
			<div class="font-normal flex items-center text-sm">
				My Address
				<TooltipIcon
					tooltipDirection="tooltip-right"
					tooltipText="Connected wallet address"
					styleClass="ml-1"
				/>
			</div>
			<div class="font-semibold text-xl mt-1">{$walletStore.address}</div>
		</div>
		<div class="flex gap-4">
			<button
				class={`${buttonClasses.greyFilled} h-10 text-small font-medium gap-3`}
				on:click={() => handleCopyClick($walletStore.address, 'Address copied to clipboard')}
			>
				<img src={staticImages.Copy} alt="Copy" />
				Copy Address
			</button>
			<a href={blockChainExplorerLink} target="_blank" rel="noopener noreferrer">
				<Button variant="greyFilled" size="small" styleClass="font-medium gap-3">
					<img src={staticImages.OpenInNew} alt="Open" />
					View on {$chainConfigStore.block_explorer_name}
				</Button>
			</a>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			size="large"
			onclick={disconnect}
			styleClass={'w-full font-semibold text-base'}
		>
			LOGOUT
		</Button>
	</svelte:fragment>
</Modal>
