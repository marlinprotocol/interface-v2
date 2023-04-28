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

	$: ({ rate, reviseRate: { newRate = BigNumberZero, updatesAt = 0, status = '' } = {} } = jobData);
	const { symbol } = kOysterRateMetaData;

	//initial states
	let inputAmount: BigNumber = BigNumberZero;
	let inputAmountString = '';

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumberZero;

	let submitLoading = false;
	let cancelLoading = false;
	const nowTime = Date.now() / 1000;

	const handleInitiateClick = async () => {
		console.log('handleInitiateClick :>> ', updatesAt);
		submitLoading = true;
		await handleInitiateRateRevise(jobData, inputAmount);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		console.log('handleConfirmClick :>> ', updatesAt);
		submitLoading = true;
		await handleFinaliseRateRevise(jobData, inputAmount);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleCancelInitiate = async () => {
		console.log('handleCancelInitiate :>> ', updatesAt);
		cancelLoading = true;
		await handleCancelRateRevise(jobData);
		cancelLoading = false;
		closeModal(modalFor);
	};

	$: modalTitle =
		state === 'initiate'
			? 'INITIATE RATE REVISE'
			: state === 'confirm'
			? 'CONFIRM RATE REVISE'
			: 'INITIATED RATE REVISE';

	$: submitButtonText = state === 'initiate' ? 'INITIATE RATE REVISE' : 'CONFIRM RATE REVISE';
	$: submitButtonAction = state === 'initiate' ? handleInitiateClick : handleConfirmClick;

	$: state = !status ? 'initiate' : status === 'inProcess' ? 'cancel' : 'confirm';

	$: submitEnable = inputAmount && isInputAmountValid(inputAmountString) && state !== 'cancel';

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
		<div class="flex flex-col gap-4">
			<div class="flex gap-4">
				<AmountInputWithTitle
					title={`Current Hourly Rate`}
					inputAmountString={bigNumberToCommaString(rate, oysterAmountPrecision)}
					disabled
					prefix={symbol}
				/>
				{#if state === 'initiate'}
					<AmountInputWithTitle title="New Hourly Rate" bind:inputAmountString prefix={symbol} />
				{:else}
					<AmountInputWithTitle
						title="New Hourly Rate"
						inputAmountString={bigNumberToCommaString(newRate, oysterAmountPrecision)}
						prefix={symbol}
						disabled
					/>
				{/if}
			</div>
		</div>
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
					disabled={!submitEnable}
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
