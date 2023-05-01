<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleFundsAddToJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import AddFundsToJob from '../../sub-components/AddFundsToJob.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	$: ({ rate } = jobData);

	let duration: number | undefined = undefined; //durationInSecs
	let cost: BigNumber = BigNumberZero;
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

	let costString = '';

	//reset amount
	const resetInputs = () => {
		duration = undefined;
		invalidCost = false;
		costString = '';
		approvedLoading = false;
		submitLoading = false;
	};

	const handleApproveClick = async () => {
		approvedLoading = true;
		await handleApproveFundForOysterJob(cost);
		approvedLoading = false;
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		await handleFundsAddToJob(jobData, cost, duration ?? 0);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	$: approved = connected && cost && approvedAmount.gte(cost) && cost.gt(BigNumberZero);
	$: approveEnable = connected && !submitLoading && cost.gt(BigNumberZero) && !invalidCost;
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
		<AddFundsToJob bind:duration bind:invalidCost bind:cost {rate} bind:costString />
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
