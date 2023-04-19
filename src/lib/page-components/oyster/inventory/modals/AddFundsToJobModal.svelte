<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero, oysterAmountPrecision } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, stringToBigNumber } from '$lib/utils/conversion';
	import { closeModal, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleFundsAddToJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const { symbol, currency } = kOysterRateMetaData;
	$: ({ rate } = jobData);

	//initial states
	let inputAmount: BigNumber = BigNumberZero;
	let inputAmountString: string;
	//error message states
	let inputAmountIsValid = true;
	let inValidMessage = '';
	let updatedAmountInputDirty = false;

	$: inputAmount = isInputAmountValid(inputAmountString)
		? stringToBigNumber(inputAmountString, 0)
		: BigNumberZero;

	//loading states
	let submitLoading = false;
	let approvedLoading = false;
	let approved = false;

	let approvedAmount: BigNumber;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		approvedAmount = value.allowance;
	});
	onDestroy(unsubscribeOysterStore);

	//reset amount
	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	const handleApproveClick = async () => {
		approvedLoading = true;
		await handleApproveFundForOysterJob(cost);
		approvedLoading = false;
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		await handleFundsAddToJob(jobData, cost);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	const inputUnitToRate = 24; //24 hours in a day

	$: cost = rate.mul(inputAmount).mul(inputUnitToRate);

	$: approved = connected && cost && approvedAmount.gte(cost) && inputAmount.gt(BigNumberZero);
	$: approveEnable =
		connected && !submitLoading && inputAmount.gt(BigNumberZero) && inputAmountIsValid;
	$: confirmEnable = approved && approveEnable;

	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'ADD FUNDS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<div class="flex gap-4">
				<AmountInputWithTitle
					title={`Hourly Rate`}
					inputAmountString={bigNumberToCommaString(rate, oysterAmountPrecision)}
					disabled
					prefix={symbol}
				/>
				<AmountInputWithTitle title={'Duration'} bind:inputAmountString suffix={'days'} />
				<AmountInputWithTitle
					title={'Cost'}
					inputAmountString={bigNumberToCommaString(cost, oysterAmountPrecision)}
					suffix={currency}
					disabled
				/>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		{#if !approved}
			<Button
				variant="filled"
				disabled={!approveEnable}
				loading={approvedLoading}
				onclick={handleApproveClick}
				size="large"
				styleClass={'btn-block w-full my-0'}>APPROVE</Button
			>
		{:else}
			<Button
				variant="filled"
				disabled={!confirmEnable}
				loading={submitLoading}
				onclick={handleSubmitClick}
				size="large"
				styleClass={'btn-block w-full my-0'}>CONFIRM</Button
			>
		{/if}
	</svelte:fragment>
</Modal>
