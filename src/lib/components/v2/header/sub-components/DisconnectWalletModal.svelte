<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import TooltipIcon from '$lib/atoms/v2/tooltips/TooltipIcon.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import AddTokenPrompt from '$lib/components/v2/prompts/AddTokenPrompt.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { handleCopyClick } from '$lib/utils/v2/helpers/componentHelper';

	export let modalFor: string;
	export let disconnect: () => void;
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Your wallet</svelte:fragment>
	<!-- <svelte:fragment slot="successmsg">Conversion Successful</svelte:fragment> -->
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
			<div class="flex items-center">
				<div
					data-testid="wallet-address"
					class="mt-1 w-[98%] overflow-hidden overflow-ellipsis text-xl font-semibold"
				>
					{$walletStore.address}
				</div>
				<button
					class="shrink-0 cursor-pointer"
					on:click={() => handleCopyClick($walletStore.address, 'Address copied to clipboard')}
				>
					<img width={18} src={staticImages.copyIcon} alt="Copy" />
				</button>
			</div>
		</div>
		<div class="flex flex-wrap gap-4">
			<AddTokenPrompt tokenFor="POND" label="POND" />
			<AddTokenPrompt tokenFor="MPOND" label="MPond" />
			<a
				href="{$chainConfigStore.block_explorer_url}/address/{$walletStore.address}"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Button variant="greyFilled" size="small" styleClass="font-medium gap-3  flex-nowrap">
					<img src={staticImages.OpenInNew} alt="Open" />
					{$chainConfigStore.block_explorer_name}
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

	<!-- <svelte:fragment slot="errorMessage">
		Insufficient MPOND
	</svelte:fragment> -->
</Modal>
