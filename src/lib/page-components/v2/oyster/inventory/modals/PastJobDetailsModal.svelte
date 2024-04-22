<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import TextInputCard from '$lib/components/v2/texts/TextInputCard.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		convertRateToPerHourString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import { closeModal, openModal } from '$lib/utils/helpers/commonHelper';
	import PaymentHistoryTable from '$lib/page-components/v2/oyster/sub-components/PaymentHistoryTable.svelte';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';

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
		endEpochTime
	} = jobData);
</script>

<Modal isScrollable {modalFor} modalWidth="w-11/12 sm:max-w-[700px]" padding={false}>
	<svelte:fragment slot="title">Past Order Details</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4 px-4">
			<TextInputCard
				title="Enclave Image URL"
				value={enclaveUrl}
				cliboardContent={enclaveUrl}
				textStyle="truncate"
			/>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard title="Operator" value={name !== '' ? name : address} />
				<TextInputCard title="Region" value={region} />
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
		<div class="p-4">
			<div class="w-full">
				<Button
					variant="filled"
					size="large"
					styleClass="btn-block w-full my-0"
					onclick={handleRedeploy}
				>
					REDEPLOY
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
