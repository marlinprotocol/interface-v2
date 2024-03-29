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
	$: instanceRate = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);
	$: bandwidthRate = instanceRate !== undefined ? rateScaled - instanceRate : 0n;
	$: bandwidth = getBandwidthFromRateAndRegion(bandwidthRate, region).toString() + 'KB/s';
	$: arch =
		getInstanceMetadatDataForOperator(address, instance, region, $oysterStore.allMarketplaceData)
			?.arch ?? 'N/A';
</script>

<Modal {modalFor} modalWidth="w-11/12 sm:max-w-[700px]" padding={false} isScrollable={true}>
	<svelte:fragment slot="title">ORDER DETAILS</svelte:fragment>
	<svelte:fragment slot="subtitle">View the details of your order</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4 px-4">
			<div data-testid="enclave-image-url" class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="Enclave Image URL"
					value={enclaveUrl}
					cliboardContent={enclaveUrl}
					textStyle="text-primary truncate"
				/>
				<TextInputCard
					title="Enclave Image Inputs"
					value={inputs ? inputs : 'N/A'}
					cliboardContent={inputs ? inputs : 'N/A'}
					textStyle="text-primary truncate"
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="Operator"
					value={name !== '' ? name : address}
					centered
					textStyle="text-primary truncate"
				/>
				<TextInputCard
					title="IP Address"
					value={ip ?? 'N/A'}
					cliboardContent={ip}
					centered
					textStyle="text-primary truncate"
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="Start Date"
					value={epochSecToString(createdAt)}
					centered
					textStyle="text-primary truncate"
				/>
				<TextInputCard
					title="Duration Left"
					value={nowTime > endEpochTime
						? 'Ended'
						: epochToDurationString(endEpochTime - nowTime, true)}
					centered
					textStyle="text-primary truncate"
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="Hourly Rate"
					value="{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
						rate,
						$oysterTokenMetadataStore.decimal
					)}"
					centered
					textStyle="text-primary truncate"
				/>
				<TextInputCard
					title="Amount Used"
					value="{$oysterTokenMetadataStore.symbol}{bigNumberToString(
						amountUsed,
						$oysterTokenMetadataStore.decimal
					)}"
					centered
					textStyle="text-primary truncate"
				/>
				<TextInputCard
					title="Total Paid"
					value="{$oysterTokenMetadataStore.symbol}{bigNumberToString(
						totalDeposit,
						$oysterTokenMetadataStore.decimal
					)}"
					centered
					textStyle="text-primary truncate"
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="Instance"
					value={instance}
					centered
					textStyle="text-primary truncate"
				/>
				<TextInputCard title="Region" value={region} centered textStyle="text-primary truncate" />
				<TextInputCard title="Arch" value={arch} centered textStyle="text-primary truncate" />
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="vCPU"
					value={vcpu?.toString() ?? ''}
					centered
					textStyle="text-primary truncate"
				/>
				<TextInputCard
					title="Memory"
					value={(memory?.toString() ?? '') + (memory ? MEMORY_SUFFIX : '')}
					centered
					textStyle="text-primary truncate"
				/>
				<TextInputCard
					title="Bandwidth"
					value={bandwidth}
					centered
					textStyle="text-primary truncate"
				/>
			</div>
			<PaymentHistoryTable tableData={depositHistory} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="w-full p-4">
			<ModalButton variant="filled" {modalFor} size="large" styleClass="btn-block my-0">
				OK
			</ModalButton>
		</div>
	</svelte:fragment>
</Modal>
