<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		convertRateToPerHourString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import { closeModal, openModal } from '$lib/utils/helpers/commonHelper';
	import PaymentHistoryTable from '$lib/page-components/oyster/sub-components/PaymentHistoryTable.svelte';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';

	export let modalFor: string;
	export let rowIndex: number;
	export let jobData: OysterInventoryDataModel;

	const handleRedeploy = () => {
		openModal(`create-order-modal-${rowIndex}`);
		closeModal(modalFor);
	};

	$: ({
		provider: { name, address },
		instance,
		region,
		enclaveUrl,
		rate,
		vcpu,
		memory,
		amountUsed,
		durationRun,
		createdAt,
		depositHistory,
		endEpochTime,
		ip
	} = jobData);
</script>

<Modal isScrollable {modalFor} modalWidth="w-11/12 sm:max-w-[607px]" padding={false}>
	<svelte:fragment slot="title">Past Order Details</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<div data-testid="enclave-image-url" class="flex flex-col gap-4 sm:flex-row">
				<SearchWithSelect
					searchValue={enclaveUrl}
					setSearchValue={() => {}}
					title="Enclave Image URL"
					label="Enclave Image URL"
					showTitle={false}
					styleClass="px-4 py-2.5"
					cardVariant="v2Input"
					placeholder="Enclave Image URL"
					disabled
				/>
			</div>

			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard title="Operator" value={name !== '' ? name : address} />
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard title="Region" value={region} />
				<TextInputCard
					title="IP Address"
					value={ip ?? 'N/A'}
					cliboardContent={ip}
					textStyle="truncate"
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard title="Instance" value={instance} />
				<TextInputCard title="vCPU" value={vcpu?.toString() ?? ''} />
				<TextInputCard
					title="Memory"
					value={(memory?.toString() ?? '') + (memory ? MEMORY_SUFFIX : '')}
				/>
				<TextInputCard
					title="Hourly Rate"
					value="{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
						rate,
						$oysterTokenMetadataStore.decimal
					)}"
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard title="Start Date" value={epochSecToString(createdAt)} />
				<TextInputCard title="End Date" value={epochSecToString(endEpochTime)} />
				<TextInputCard
					title="Amount Used"
					value="{$oysterTokenMetadataStore.symbol}{bigNumberToString(
						amountUsed,
						$oysterTokenMetadataStore.decimal
					)}"
				/>
				<TextInputCard title="Duration Run" value={epochToDurationString(durationRun, true)} />
			</div>

			<PaymentHistoryTable tableData={depositHistory} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="w-full">
			<Button
				variant="filled"
				size="large"
				styleClass="btn-block w-full my-0"
				onclick={handleRedeploy}
			>
				Redeploy
			</Button>
		</div>
	</svelte:fragment>
</Modal>
