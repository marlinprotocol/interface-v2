<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, epochToDurationString } from '$lib/utils/conversion';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import { handleInitiateJobStop, handleConfirmJobStop } from '$lib/utils/services/oysterServices';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const { currency } = kOysterRateMetaData;
	$: ({ balance, durationLeft, rate } = jobData);

	let stopInitiateEndTimestamp: number;
	$: stopInitiated = rate ? !rate.gt(BigNumberZero) : false;
	let submitLoading = false;

	const handleInitialClick = async () => {
		submitLoading = true;
		const _stopInitiateEndTimestamp = await handleInitiateJobStop(jobData);
		if (_stopInitiateEndTimestamp) {
			stopInitiateEndTimestamp = _stopInitiateEndTimestamp;
		}
		submitLoading = false;
	};

	// TODO: run timer for stopInitiateEndTimestamp and update rate to 0 locally
	const handleConfirmClick = async () => {
		submitLoading = true;
		jobData = await handleConfirmJobStop(jobData);
		submitLoading = false;
		closeModal(modalFor);
	};

	$: modalTitle = stopInitiated ? 'CONFIRM STOP' : 'INITIATE STOP';
	$: submitButtonText = stopInitiated ? 'CONFIRM' : 'INITIATE';
	$: submitFunction = stopInitiated ? handleConfirmClick : handleInitialClick;

	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';

	const styles = {
		textPrimary: 'text-primary'
	};
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{modalTitle}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<div class="flex gap-4">
				<TextInputCard
					title={'Current Balance'}
					value={`${bigNumberToCommaString(balance, 6)} ${currency}`}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Duration Left'}
					value={durationLeft === 0 ? 'Ended' : epochToDurationString(durationLeft)}
					centered
					textStyle={styles.textPrimary}
				/>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			loading={submitLoading}
			onclick={submitFunction}
			size="large"
			styleClass={'btn-block my-0'}>{submitButtonText}</Button
		>
	</svelte:fragment>
</Modal>
