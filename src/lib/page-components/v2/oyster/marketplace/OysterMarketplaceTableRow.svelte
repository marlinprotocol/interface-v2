<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { tableCellClasses } from '$lib/atoms/v2/componentClasses';
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

<tr class="main-row hover:bg-base-200">
	<td class={tableCellClasses.rowNormal}>
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="w-4">
					<div class="copy-icon cursor-pointer">
						<ImageColored src={staticImages.CopyGrey} alt="Copy" variant="grey" />
					</div>
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</td>
	<td class={tableCellClasses.rowNormal}>
		{instance ?? 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{region ?? 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
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
	<td class={tableCellClasses.rowNormal}>
		{vcpu ? vcpu : 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{memory ? `${memory}${MEMORY_SUFFIX}` : 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{arch ? arch : 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
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
</tr>
<CreateOrderModal modalFor="create-order-modal-{rowIndex}" preFilledData={rowData} />

<style>
	/* TODO: migrate these classes to tailwind and then refactor the copy to clipboard functionality */
	.main-row {
		margin-left: 20px;
		border-bottom: 1px solid #e5e5e5;
	}
	/* show icon only on hover on table-row */
	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
