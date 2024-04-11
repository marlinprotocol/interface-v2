<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/v2/texts/NameWithAddress.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterMarketplaceDataModel } from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import { convertRateToPerHourString } from '$lib/utils/helpers/conversionHelper';
	import CreateOrderModal from '$lib/page-components/oyster/inventory/modals/CreateOrderModal.svelte';
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
	<NameWithAddress {address} {rowIndex}>
		<svelte:fragment slot="copyIcon">
			<div class="w-4">
				<div class="hidden cursor-pointer group-hover:flex">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
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
<td class={tableClasses.cell}>
	<Tooltip
		tooltipText="{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
			instanceRate,
			$oysterTokenMetadataStore.decimal
		)}"
	>
		{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
			instanceRate,
			$oysterTokenMetadataStore.decimal
		)}
	</Tooltip>
</td>
<td class={tableClasses.cell}>
	{vcpu ? vcpu : 'N/A'}
</td>
<td class={tableClasses.cell}>
	{memory ? `${memory}${MEMORY_SUFFIX}` : 'N/A'}
</td>
<td class={tableClasses.cell}>
	{arch ? arch : 'N/A'}
</td>
<td class={tableClasses.cell}>
	{#if $connected}
		<ModalButton
			variant="tableConvertButton"
			styleClass="w-fit px-6 mr-4"
			modalFor="create-order-modal-{rowIndex}">Deploy</ModalButton
		>
	{:else}
		<Button
			styleClass="w-fit px-6 mr-4"
			variant="tableConvertButton"
			onclick={() =>
				addToast({
					message: 'Please connect your wallet to deploy.',
					variant: 'info'
				})}>Deploy</Button
		>
	{/if}
</td>
<CreateOrderModal modalFor="create-order-modal-{rowIndex}" preFilledData={rowData} />
