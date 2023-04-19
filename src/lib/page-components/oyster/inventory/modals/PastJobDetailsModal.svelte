<script lang="ts">
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
	import PaymentHistoryTable from '../../sub-components/PaymentHistoryTable.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;
	$: ({
		provider: { name, address },
		instance,
		region,
		enclaveUrl,
		rate,
		totalDeposit,
		amountUsed,
		createdAt,
		depositHistory,
		endEpochTime
	} = jobData);

	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';

	const styles = {
		modalWidth: 'w-11/12 sm:max-w-[700px]',
		textPrimary: 'text-primary'
	};
</script>

<Modal {modalFor} modalWidth={styles.modalWidth}>
	<svelte:fragment slot="title">
		{'Past Order Details'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<div class="flex gap-4">
				<TextInputCard
					title={'Merchant'}
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
				<TextInputCard title={'vCPU'} value={instance} centered textStyle={styles.textPrimary} />
				<TextInputCard title={'Memory'} value={instance} centered textStyle={styles.textPrimary} />
				<TextInputCard
					title={'Hourly Rate'}
					value={`$${bigNumberToCommaString(rate, oysterAmountPrecision)}`}
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
					value={epochToDurationString(endEpochTime - createdAt, true)}
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
	<!-- TODO: s- check why scroll is not working, and button is not visible if outside -->
	<!-- TODO: s - check if button should not be fixed -->
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-2">
			<ModalButton variant="filled" {modalFor} styleClass={'btn-block my-0 w-[49%]'}>
				CLOSE
			</ModalButton>
			<!-- TODO: add redeploy function -->
			<ModalButton variant="filled" {modalFor} styleClass={'btn-block my-0 w-[50%]'}>
				REDEPLOY
			</ModalButton>
		</div>
	</svelte:fragment>
</Modal>
