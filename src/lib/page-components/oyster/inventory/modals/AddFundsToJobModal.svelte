<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleFundsAddToJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import AddFundsToJob from '$lib/page-components/oyster/sub-components/AddFundsToJob.svelte';
	import { OYSTER_RATE_SCALING_FACTOR } from '$lib/utils/constants/oysterConstants';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	$: ({ rate } = jobData);

	let duration: number | undefined = undefined; //durationInSecs
	let instanceCost: BigNumber = BIG_NUMBER_ZERO;
	let invalidCost = false;

	//loading states
	let submitLoading = false;
	let approvedLoading = false;
	let approved = false;

	let approvedAmount: BigNumber;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		approvedAmount = value.allowance;
	});
	onDestroy(unsubscribeOysterStore);

	let instanceCostString = '';

	//reset amount
	const resetInputs = () => {
		duration = undefined;
		invalidCost = false;
		instanceCostString = '';
		approvedLoading = false;
		submitLoading = false;
	};

	const handleApproveClick = async () => {
		approvedLoading = true;
		await handleApproveFundForOysterJob(instanceCost.div(OYSTER_RATE_SCALING_FACTOR));
		approvedLoading = false;
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		await handleFundsAddToJob(jobData, instanceCost, duration ?? 0);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	$: approved =
		connected &&
		instanceCost &&
		approvedAmount.gte(instanceCost.div(OYSTER_RATE_SCALING_FACTOR)) &&
		instanceCost.gt(BIG_NUMBER_ZERO);
	$: approveEnable =
		connected && !submitLoading && instanceCost.gt(BIG_NUMBER_ZERO) && !invalidCost;
	$: confirmEnable = approved && approveEnable;
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'ADD FUNDS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'Add funds by approving and depositing tokens for the job'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<AddFundsToJob
			bind:duration
			bind:invalidCost
			bind:instanceCost
			bind:instanceCostString
			selectId="add-funds-duration-unit-select"
			instanceRate={rate}
			instanceRateEditable={false}
			isTotalRate={true}
		/>
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
