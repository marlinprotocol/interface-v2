<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero, oysterAmountPrecision } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToCommaString,
		epochToDurationString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { closeModal, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		handleCancelRateRevise,
		handleFinaliseRateRevise,
		handleInitiateRateRevise
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	$: ({ rate, reviseRate: { newRate = BigNumberZero, updatesAt = 0, rateStatus = '' } = {} } =
		jobData);
	const { symbol } = kOysterRateMetaData;

	//initial states
	let inputAmount: BigNumber = BigNumberZero;
	let inputAmountString = '';

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString)
		: BigNumberZero;

	let submitLoading = false;
	let cancelLoading = false;

	const handleInitiateClick = async () => {
		submitLoading = true;
		await handleInitiateRateRevise(jobData, inputAmount);
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
		cancelLoading = true;
		await handleCancelRateRevise(jobData);
		cancelLoading = false;
		closeModal(modalFor);
	};

	$: modalTitle =
		rateStatus === ''
			? 'INITIATE RATE REVISE'
			: rateStatus === 'completed'
			? 'CONFIRM RATE REVISE'
			: 'INITIATED RATE REVISE';

	$: submitButtonText = rateStatus === '' ? 'INITIATE RATE REVISE' : 'CONFIRM RATE REVISE';
	$: submitButtonAction = rateStatus === '' ? handleInitiateClick : handleConfirmClick;

	$: submitEnable =
		inputAmount && isInputAmountValid(inputAmountString) && rateStatus !== 'pending';
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{modalTitle}
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
				{#if rateStatus === ''}
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
			{#if rateStatus === 'pending'}
				<div class="w-full">
					<Timer endEpochTime={updatesAt}>
						<div slot="active" let:timer class="w-full">
							<InputCard variant="warning">
								<Text
									styleClass={'py-2'}
									text={`Time left to confirm: ${epochToDurationString(timer)}`}
									variant="small"
								/>
							</InputCard>
						</div>
					</Timer>
				</div>
			{/if}
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex gap-4">
			{#if rateStatus !== ''}
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
