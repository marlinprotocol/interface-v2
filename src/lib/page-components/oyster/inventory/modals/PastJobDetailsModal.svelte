<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { oysterAmountPrecision } from '$lib/utils/constants/constants';
	import {
		bigNumberToCommaString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/conversion';
	import { closeModal, openModal } from '$lib/utils/helpers/commonHelper';
	import { convertRateToPerHourString } from '$lib/utils/helpers/oysterHelpers';
	import PaymentHistoryTable from '../../sub-components/PaymentHistoryTable.svelte';

	export let modalFor: string;
	export let rowIndex: number;
	export let jobData: OysterInventoryDataModel;
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

	const handleRedeploy = () => {
		openModal(`create-order-modal-${rowIndex}`);
		closeModal(modalFor);
	};

	const styles = {
		modalWidth: 'w-11/12 sm:max-w-[700px]',
		textPrimary: 'text-primary'
	};
</script>

<Modal {modalFor} modalWidth={styles.modalWidth} padding={false}>
	<svelte:fragment slot="title">
		{'PAST ORDER DETAILS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'View the details of your past order'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4 px-4">
			<div class="flex gap-4">
				<TextInputCard
					title={'Operator'}
					value={name !== '' ? name : address}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard title={'Region'} value={region} centered textStyle={styles.textPrimary} />
			</div>
			<div class="flex gap-4">
				<TextInputCard
					title={'Instance'}
					value={instance}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'vCPU'}
					value={vcpu?.toString() ?? ''}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Memory'}
					value={memory?.toString() ?? ''}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Hourly Rate'}
					value={`$${convertRateToPerHourString(rate)}`}
					centered
					textStyle={styles.textPrimary}
				/>
			</div>
			<div class="flex gap-4">
				<TextInputCard
					title={'Start Date'}
					value={epochSecToString(createdAt)}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'End Date'}
					value={epochSecToString(endEpochTime)}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Amount Used'}
					value={bigNumberToCommaString(amountUsed, oysterAmountPrecision)}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Duration Run'}
					value={epochToDurationString(durationRun, true)}
					centered
					textStyle={styles.textPrimary}
				/>
			</div>
			<TextInputCard
				title={'Enclave Image URL'}
				value={enclaveUrl}
				textStyle={styles.textPrimary}
			/>
			<PaymentHistoryTable tableData={depositHistory} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-2 p-4">
			<div class="w-full">
				<ModalButton
					variant="outlined"
					size="large"
					styleClass={'btn-block w-full my-0'}
					{modalFor}
				>
					CLOSE
				</ModalButton>
			</div>
			<div class="w-full">
				<Button
					variant="filled"
					size="large"
					styleClass={'btn-block w-full my-0'}
					onclick={handleRedeploy}
				>
					{'REDEPLOY'}
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
