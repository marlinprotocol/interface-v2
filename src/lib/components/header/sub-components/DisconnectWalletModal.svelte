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
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Your wallet</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="mb-4 rounded-lg bg-base-200 p-4 text-left">
			<div class="flex items-center text-sm font-normal">
				My Address
				<TooltipIcon
					tooltipDirection="tooltip-right"
					tooltipText="Connected wallet address"
					styleClass="ml-1"
				/>
			</div>
			<div class="mt-1 text-xl font-semibold">{$walletStore.address}</div>
		</div>
		<div class="flex gap-4">
			<Button
				variant="greyFilled"
				size="small"
				styleClass="font-medium gap-3"
				onclick={() => handleCopyClick($walletStore.address, 'Address copied to clipboard')}
			>
				<img src={staticImages.Copy} alt="Copy" />
				Copy Address
			</Button>
			<a
				href="{$chainConfigStore.block_explorer_url}/address/{$walletStore.address}"
				target="_blank"
				rel="noopener noreferrer"
			>
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
			styleClass="w-full font-semibold text-base"
		>
			LOGOUT
		</Button>
	</svelte:fragment>
</Modal>
