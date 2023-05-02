<script lang="ts">
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TableGridDataCell from '$lib/components/table-cells/TableGridDataCell.svelte';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterMarketplaceDataModel } from '$lib/types/oysterComponentType';
	import { oysterAmountPrecision } from '$lib/utils/constants/constants';
	import {
		kMarketplaceTableColumnsWidth,
		kOysterRateMetaData
	} from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
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

<div class="main-row flex gap-1 hover:bg-base-200 px-8 items-center h-16">
	<TableGridDataCell
		width={`${kMarketplaceTableColumnsWidth('provider')}`}
		styleClass="flex gap-2 items-center"
	>
		<NameWithAddress {name} {address} {rowIndex}>
			<svelte:fragment slot="copyIcon">
				<div class="copy-icon cursor-pointer">
					<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
				</div>
			</svelte:fragment>
		</NameWithAddress>
	</TableGridDataCell>
	<TableGridDataCell width={`${kMarketplaceTableColumnsWidth('instance')}`}>
		{instance}
	</TableGridDataCell>
	<TableGridDataCell width={`${kMarketplaceTableColumnsWidth('region')}`}>
		{region}
	</TableGridDataCell>
	<TableGridDataCell width={`${kMarketplaceTableColumnsWidth('rate')}`}>
		{symbol}{bigNumberToCommaString(rate, oysterAmountPrecision)}
	</TableGridDataCell>
	<TableGridDataCell width={`${kMarketplaceTableColumnsWidth('vcpu')}`}>
		{vcpu ? vcpu : 'N/A'}
	</TableGridDataCell>
	<TableGridDataCell width={`${kMarketplaceTableColumnsWidth('memory')}`}>
		{memory ? memory : 'N/A'}
	</TableGridDataCell>
	<TableGridDataCell width={`${kMarketplaceTableColumnsWidth('action')}`}>
		<TableConvertButton
			disabled={!$connected}
			modalFor={`create-order-modal-${rowIndex}`}
			text="DEPLOY"
			styleClass="w-fit px-6"
		/>
	</TableGridDataCell>
</div>
<CreateOrderModal modalFor={`create-order-modal-${rowIndex}`} preFilledData={rowData} />

<style>
	/* show icon only on hover on table-row */
	.main-row:hover .copy-icon {
		display: flex;
	}
	.main-row .copy-icon {
		display: none;
	}
</style>
