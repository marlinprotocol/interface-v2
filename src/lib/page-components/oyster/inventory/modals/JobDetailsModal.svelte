<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import { oysterStore, oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		convertRateToPerHourString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import {
		getBandwidthFromRateAndRegion,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import PaymentHistoryTable from '$lib/page-components/oyster/sub-components/PaymentHistoryTable.svelte';
	import { getInstanceMetadatDataForOperator } from '$lib/utils/data-modifiers/oysterModifiers';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const nowTime = new Date().getTime() / 1000;

	$: ({
		provider: { name, address },
		instance,
		region,
		vcpu,
		memory,
		enclaveUrl,
		rateScaled,
		ip,
		totalDeposit,
		amountUsed,
		createdAt,
		endEpochTime,
		depositHistory,
		rate,
		inputs
	} = jobData);
	$: instanceRateScaled = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);
	$: bandwidthRateScaled = instanceRateScaled !== undefined ? rateScaled - instanceRateScaled : 0n;
	$: bandwidth = getBandwidthFromRateAndRegion(bandwidthRateScaled, region).toString() + 'KB/s';
	$: arch =
		getInstanceMetadatDataForOperator(address, instance, region, $oysterStore.allMarketplaceData)
			?.arch ?? 'N/A';
</script>

<Modal {modalFor} modalWidth="w-11/12 sm:max-w-[660px]" padding={false} isScrollable={true}>
	<svelte:fragment slot="title">Order Details</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<div data-testid="enclave-image-url" class="flex flex-col gap-2 sm:flex-row">
				<TextInputCard
					title="Encalve Image URL"
					value={enclaveUrl ?? 'N/A'}
					cliboardContent={enclaveUrl}
					textStyle="truncate"
				/>
				<TextInputCard
					title="Enclave Image Inputs"
					value={inputs ? inputs : 'N/A'}
					cliboardContent={inputs ? inputs : 'N/A'}
					textStyle="truncate"
				/>
			</div>
			<div class="flex flex-col flex-wrap gap-4 sm:flex-row md:flex-nowrap md:gap-2">
				<TextInputCard title="Operator" value={name !== '' ? name : address} textStyle="truncate" />
				<TextInputCard
					title="IP Address"
					value={ip ?? 'N/A'}
					cliboardContent={ip}
					textStyle="truncate"
				/>
			</div>
			<div class="flex flex-col gap-2 sm:flex-row">
				<TextInputCard
					title="Start Date"
					value={epochSecToString(createdAt)}
					textStyle="truncate"
				/>
				<TextInputCard
					title="Duration Left"
					value={nowTime > endEpochTime
						? 'Ended'
						: epochToDurationString(endEpochTime - nowTime, true)}
					textStyle="truncate"
				/>
			</div>
			<div class="flex flex-col gap-2 sm:flex-row">
				<TextInputCard
					title="Hourly Rate"
					value="{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
						rate,
						$oysterTokenMetadataStore.decimal
					)}"
					textStyle="truncate"
				/>
				<TextInputCard
					title="Amount Used"
					value="{$oysterTokenMetadataStore.symbol}{bigNumberToString(
						amountUsed,
						$oysterTokenMetadataStore.decimal
					)}"
					textStyle="truncate"
				/>
				<TextInputCard
					title="Total Paid"
					value="{$oysterTokenMetadataStore.symbol}{bigNumberToString(
						totalDeposit,
						$oysterTokenMetadataStore.decimal
					)}"
					textStyle="truncate"
				/>
			</div>
			<div class="flex flex-col gap-2 sm:flex-row">
				<TextInputCard title="Instance" value={instance} textStyle="truncate" />
				<TextInputCard title="Region" value={region} textStyle="truncate" />
				<TextInputCard title="Arch" value={arch} textStyle="truncate" />
			</div>
			<div class="flex flex-col gap-2 sm:flex-row">
				<TextInputCard title="vCPU" value={vcpu?.toString() ?? ''} textStyle="truncate" />
				<TextInputCard
					title="Memory"
					value={(memory?.toString() ?? '') + (memory ? MEMORY_SUFFIX : '')}
					textStyle="truncate"
				/>
				<TextInputCard title="Bandwidth" value={bandwidth} textStyle="truncate" />
			</div>
			<PaymentHistoryTable tableData={depositHistory} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="w-full">
			<ModalButton variant="filled" {modalFor} size="large" styleClass="btn-block my-0">
				Ok
			</ModalButton>
		</div>
	</svelte:fragment>
</Modal>
