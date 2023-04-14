<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString, stringToBigNumber } from '$lib/utils/conversion';
	import { closeModal, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { handleFundsAddToJob } from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const { symbol, unit, currency } = kOysterRateMetaData;
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

	//reset amount
	const resetInputs = () => {
		inputAmountString = '';
		inputAmountIsValid = true;
		updatedAmountInputDirty = false;
		inValidMessage = '';
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		jobData = await handleFundsAddToJob(jobData, cost);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	// TODO: add balance check by adding usd to wallet store

	$: submitEnable =
		connected && !submitLoading && inputAmount.gt(BigNumberZero) && inputAmountIsValid;
	$: cost = rate.mul(inputAmount);

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
					title={'Rate'}
					inputAmountString={bigNumberToCommaString(rate, 6)}
					disabled
					prefix={symbol}
					suffix={`/${unit}`}
				/>
				<AmountInputWithTitle title={'Duration'} bind:inputAmountString suffix={unit} />
				<AmountInputWithTitle
					title={'Cost'}
					inputAmountString={bigNumberToCommaString(cost)}
					suffix={currency}
				/>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			size="large"
			styleClass={'btn-block my-0'}>CONFIRM</Button
		>
	</svelte:fragment>
</Modal>
