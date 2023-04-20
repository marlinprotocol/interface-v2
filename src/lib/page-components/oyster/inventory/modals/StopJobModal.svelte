<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleCancelRateRevise,
		handleConfirmJobStop,
		handleInitiateRateRevise
	} from '$lib/utils/services/oysterServices';
	import StopModalContent from '../../sub-components/StopModalContent.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;
	export let stopInitiateEndTimestamp: number;
	export let rateReviseInitiateEndTimestamp: number = 0;

	let submitLoading = false;
	let cancelLoading = false;
	const nowTime = Date.now() / 1000;

	const handleInitiateClick = async () => {
		submitLoading = true;
		await handleInitiateRateRevise(jobData, BigNumberZero);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		submitLoading = true;
		await handleConfirmJobStop(jobData);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleCancelInitiate = async () => {
		cancelLoading = true;
		await handleCancelRateRevise(jobData);
		cancelLoading = false;
		closeModal(modalFor);
	};

	$: modalTitle =
		state === 'initiate'
			? 'INITIATE STOP'
			: state === 'confirm'
			? 'CONFIRM STOP'
			: 'INITIATED STOP';

	$: submitButtonText = state === 'initiate' ? 'INITIATE STOP' : 'CONFIRM';
	$: submitButtonAction = state === 'initiate' ? handleInitiateClick : handleConfirmClick;
	$: state =
		stopInitiateEndTimestamp === 0
			? 'initiate'
			: stopInitiateEndTimestamp < nowTime
			? 'confirm'
			: 'cancel';

	$: disableSubmit =
		(state === 'initiate' && rateReviseInitiateEndTimestamp > nowTime) || state === 'cancel';
	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{modalTitle}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<StopModalContent {jobData} />
		{#if rateReviseInitiateEndTimestamp > nowTime && state === 'initiate'}
			<!-- TODO: check with shabbir for the text -->
			<InputCard variant="warning" styleClass="mt-4">
				<Text
					styleClass={'py-2'}
					text={'A non-zero rate revision has been initiated, you may cancel it using AMEND RATE button.'}
					variant="small"
				/>
			</InputCard>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-4">
			{#if state !== 'initiate'}
				<div class="w-full">
					<Button
						variant="outlined"
						loading={cancelLoading}
						onclick={handleCancelInitiate}
						size="large"
						styleClass={'btn-block w-full my-0'}
					>
						{'CANCEL'}
					</Button>
				</div>
			{/if}
			<div class="w-full">
				<Button
					variant="filled"
					disabled={disableSubmit}
					loading={submitLoading}
					onclick={submitButtonAction}
					size="large"
					styleClass={'btn-block w-full my-0'}
				>
					{submitButtonText}
				</Button>
			</div>
		</div>
	</svelte:fragment>
</Modal>
