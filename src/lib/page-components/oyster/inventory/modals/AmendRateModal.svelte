<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero, oysterAmountPrecision } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, stringToBigNumber } from '$lib/utils/conversion';
	import { closeModal, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		handleCancelRateRevise,
		handleFinaliseRateRevise,
		handleInitiateRateRevise
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;
	export let amendInitiateEndTimestamp: number;

	$: ({ rate } = jobData);
	const { symbol } = kOysterRateMetaData;

	//initial states
	let inputAmount: BigNumber = BigNumberZero;
	let inputAmountString: string;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumberZero;

	let submitLoading = false;
	const nowTime = Date.now() / 1000;

	const handleInitialClick = async () => {
		submitLoading = true;
		await handleInitiateRateRevise(jobData);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		submitLoading = true;
		await handleFinaliseRateRevise(jobData, inputAmount);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleCancelInitiate = async () => {
		submitLoading = true;
		await handleCancelRateRevise(jobData);
		submitLoading = false;
		closeModal(modalFor);
	};

	$: modalTitle =
		amendInitiateEndTimestamp === 0
			? 'INITIATE RATE REVISE'
			: amendInitiateEndTimestamp < nowTime
			? 'CONFIRM RATE REVISE'
			: 'INITIATING RATE REVISE';

	$: submitButtonText =
		amendInitiateEndTimestamp === 0
			? 'INITIATE'
			: amendInitiateEndTimestamp < nowTime
			? 'CONFIRM'
			: 'CANCEL';

	$: submitButtonAction =
		amendInitiateEndTimestamp === 0
			? handleInitialClick
			: amendInitiateEndTimestamp < nowTime
			? handleConfirmClick
			: handleCancelInitiate;

	$: submitEnable = inputAmount && isInputAmountValid(inputAmountString) && inputAmount.gt(0);

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
				<AmountInputWithTitle
					title={`Current Rate`}
					inputAmountString={bigNumberToCommaString(rate, oysterAmountPrecision)}
					disabled
					prefix={symbol}
				/>
				<AmountInputWithTitle title="New Rate" bind:inputAmountString />
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={submitButtonAction}
			size="large"
			styleClass={`btn-block my-0 `}
		>
			{submitButtonText}
		</Button>
	</svelte:fragment>
</Modal>
