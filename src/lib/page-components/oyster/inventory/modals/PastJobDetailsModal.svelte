<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
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

<Modal {modalFor} modalWidth="w-11/12 sm:max-w-[700px]" padding={false}>
	<svelte:fragment slot="title">PAST ORDER DETAILS</svelte:fragment>
	<svelte:fragment slot="subtitle">View the details of your past order</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4 px-4">
			<TextInputCard
				title="Enclave Image URL"
				value={enclaveUrl}
				cliboardContent={enclaveUrl}
				textStyle="text-primary truncate"
			/>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="Operator"
					value={name !== '' ? name : address}
					centered
					textStyle="text-primary"
				/>
				<TextInputCard title="Region" value={region} centered textStyle="text-primary" />
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard title="Instance" value={instance} centered textStyle="text-primary" />
				<TextInputCard
					title="vCPU"
					value={vcpu?.toString() ?? ''}
					centered
					textStyle="text-primary"
				/>
				<TextInputCard
					title="Memory"
					value={(memory?.toString() ?? '') + (memory ? MEMORY_SUFFIX : '')}
					centered
					textStyle="text-primary"
				/>
				<TextInputCard
					title="Hourly Rate"
					value="{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
						rate,
						$oysterTokenMetadataStore.decimal
					)}"
					centered
					textStyle="text-primary"
				/>
			</div>
			<div class="flex flex-col gap-4 sm:flex-row">
				<TextInputCard
					title="Start Date"
					value={epochSecToString(createdAt)}
					centered
					textStyle="text-primary"
				/>
				<TextInputCard
					title="End Date"
					value={epochSecToString(endEpochTime)}
					centered
					textStyle="text-primary"
				/>
				<TextInputCard
					title="Amount Used"
					value="{$oysterTokenMetadataStore.symbol}{bigNumberToString(
						amountUsed,
						$oysterTokenMetadataStore.decimal
					)}"
					centered
					textStyle="text-primary"
				/>
				<TextInputCard
					title="Duration Run"
					value={epochToDurationString(durationRun, true)}
					centered
					textStyle="text-primary"
				/>
			</div>

			<PaymentHistoryTable tableData={depositHistory} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-2 p-4">
			<div class="w-full">
				<ModalButton variant="outlined" size="large" styleClass="btn-block w-full my-0" {modalFor}>
					CLOSE
				</ModalButton>
			</div>
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
