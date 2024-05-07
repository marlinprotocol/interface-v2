<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import Tooltip from '$lib/atoms/v2/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/v2/texts/NameWithAddress.svelte';
	import { addToast } from '$lib/data-stores/v2/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterMarketplaceDataModel } from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import { convertRateToPerHourString } from '$lib/utils/helpers/conversionHelper';
	import CreateOrderModal from '$lib/page-components/v2/oyster/inventory/modals/CreateOrderModal.svelte';
	import { oysterTokenMetadataStore, oysterRateMetadataStore } from '$lib/data-stores/oysterStore';
	import ModalButton from '$lib/atoms/v2/modals/ModalButton.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let rowData: OysterMarketplaceDataModel;
	export let rowIndex: number;

	$: ({
		provider: { name, address },
		instance,
		region,
		vcpu,
		memory,
		arch,
		rateScaled
	} = rowData);
	$: instanceRate = rateScaled / $oysterRateMetadataStore.oysterRateScalingFactor;
</script>

<td class={tableClasses.cell}>
	<NameWithAddress {name} {address} {rowIndex}>
		<svelte:fragment slot="copyIcon">
			<div class="w-4">
				<div class="hidden cursor-pointer group-hover/row:flex">
					<img src={staticImages.copyIcon} alt="Copy" />
				</div>
			</div>
		</svelte:fragment>
	</NameWithAddress>
</td>
<td class={tableClasses.cell}>
	{instance ?? 'N/A'}
</td>
<td class={tableClasses.cell}>
	{region ?? 'N/A'}
</td>
<td class={cn(tableClasses.cell, 'text-center')}>
	{vcpu ? vcpu : 'N/A'}
</td>
<td class={tableClasses.cell}>
	{memory ? `${memory}${MEMORY_SUFFIX}` : 'N/A'}
</td>
<td class={tableClasses.cell}>
	{arch ? arch : 'N/A'}
</td>
<td class={tableClasses.cell}>
	<Tooltip>
		<span slot="tooltipIcon"
			>{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
				instanceRate,
				$oysterTokenMetadataStore.decimal
			)}</span
		>
		<span class="font-normal" slot="tooltipContent">
			{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
				instanceRate,
				$oysterTokenMetadataStore.decimal
			)}
		</span>
	</Tooltip>
</td>
<td class={tableClasses.cell}>
	{#if $connected}
		<Tooltip>
			<ModalButton
				variant="text"
				styleClass="w-fit px-6"
				modalFor="create-order-modal-{rowIndex}"
				slot="tooltipIcon"
			>
				<div class="rounded-full border border-[#D9DADE] p-3">
					<img src={staticImages.deployIcon} alt="Deploy" />
				</div>
			</ModalButton>
			<span class="font-normal" slot="tooltipContent">Deploy</span>
		</Tooltip>
	{:else}
		<Button
			onclick={() =>
				addToast({
					message: {
						title: 'Connect Wallet',
						description: 'Please connect your wallet to deploy.'
					},
					variant: 'warning'
				})}
			variant="text"
			styleClass="w-fit ml-4"
		>
			<Tooltip>
				<div slot="tooltipIcon" class="rounded-full border border-[#D9DADE] p-3">
					<img src={staticImages.deployIcon} alt="Deploy" />
				</div>
				<span class="font-normal" slot="tooltipContent">Deploy</span>
			</Tooltip>
		</Button>
	{/if}
</td>
<CreateOrderModal modalFor="create-order-modal-{rowIndex}" preFilledData={rowData} />
