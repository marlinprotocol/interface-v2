<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterMarketplaceDataModel } from '$lib/types/oysterComponentType';
	import { maxDecimals } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { convertRateToPerHourString } from '$lib/utils/helpers/oysterHelpers';
	import CreateOrderModal from '../inventory/modals/CreateOrderModal.svelte';

	export let rowData: OysterMarketplaceDataModel;
	export let rowIndex: number;

	const { symbol } = kOysterRateMetaData;
	$: ({
		provider: { name, address },
		instance,
		region,
		vcpu,
		memory,
		rate
	} = rowData);
</script>

<tr class="main-row hover:bg-base-200">
	<td class={tableCellClasses.row}>
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="w-4">
					<div class="copy-icon cursor-pointer">
						<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
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
		<Tooltip tooltipText={`${symbol}${convertRateToPerHourString(rate, maxDecimals)}`}>
			{symbol}{convertRateToPerHourString(rate)}
		</Tooltip>
	</td>
	<td class={tableCellClasses.rowNormal}>
		{vcpu ? vcpu : 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{memory ? `${memory} MB` : 'N/A'}
	</td>
	<td class={tableCellClasses.rowNormal}>
		{#if $connected}
			<!-- content here -->
			<TableConvertButton
				modalFor={`create-order-modal-${rowIndex}`}
				text="DEPLOY"
				styleClass="w-fit px-6 mr-4"
			/>
		{:else}
			<Button
				styleClass="w-fit px-6 mr-4"
				variant="tableConvertButton"
				onclick={() =>
					addToast({
						message: `Please connect your wallet to deploy.`,
						variant: 'info'
					})}>DEPLOY</Button
			>
		{/if}
	</td>
</tr>
<CreateOrderModal modalFor={`create-order-modal-${rowIndex}`} preFilledData={rowData} />

<style>
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
