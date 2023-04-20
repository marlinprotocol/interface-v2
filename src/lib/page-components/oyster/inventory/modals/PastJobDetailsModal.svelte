<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero, oysterAmountPrecision } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToCommaString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/conversion';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob
	} from '$lib/utils/services/oysterServices';
	import { onDestroy } from 'svelte';
	import PaymentHistoryTable from '../../sub-components/PaymentHistoryTable.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import Button from '$lib/atoms/buttons/Button.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;
	$: ({
		provider: { name, address },
		instance,
		metadata,
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

	let submitLoading = false;
	let approvedAmount = BigNumberZero;

	const unsubscribeOysterStore = oysterStore.subscribe((value) => {
		approvedAmount = value.allowance;
	});
	onDestroy(unsubscribeOysterStore);

	const handleApproveClick = async () => {
		if (!amountUsed) {
			return;
		}
		submitLoading = true;
		await handleApproveFundForOysterJob(amountUsed);
		submitLoading = false;
	};

	const handleSubmitClick = async () => {
		if (!rate || !amountUsed) {
			return;
		}
		const { userDurationUnitInRateUnit, rateUnitInSeconds } = kOysterRateMetaData;
		submitLoading = true;
		await handleCreateJob(
			metadata,
			address,
			rate,
			amountUsed,
			durationRun * rateUnitInSeconds * userDurationUnitInRateUnit
		);
		submitLoading = false;
		closeModal(modalFor);
	};
	$: approved = amountUsed && approvedAmount?.gte(amountUsed) && amountUsed.gt(BigNumberZero);

	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';

	const styles = {
		modalWidth: 'w-11/12 sm:max-w-[700px]',
		textPrimary: 'text-primary'
	};
</script>

<Modal {modalFor} modalWidth={styles.modalWidth} padding={false}>
	<svelte:fragment slot="title">
		{'Past Order Details'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
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
				<ModalButton variant="filled" size="large" styleClass={'btn-block w-full my-0'} {modalFor}>
					CLOSE
				</ModalButton>
			</div>
			<div class="w-full">
				<Button
					variant="filled"
					size="large"
					styleClass={'btn-block w-full my-0'}
					loading={submitLoading}
					onclick={approved ? handleSubmitClick : handleApproveClick}
				>
					{approved ? 'DEPLOY' : 'APPROVE'}
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
