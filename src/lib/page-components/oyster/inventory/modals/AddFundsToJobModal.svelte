<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleFundsAddToJob
	} from '$lib/utils/services/oysterServices';
	import AddFundsToJob from '$lib/page-components/oyster/sub-components/AddFundsToJob.svelte';
	import {
		OYSTER_RATE_METADATA,
		OYSTER_RATE_SCALING_FACTOR
	} from '$lib/utils/constants/oysterConstants';
	import { dividerClasses } from '$lib/atoms/componentClasses';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';

	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
	import { getInstanceCostString } from '$lib/utils/helpers/oysterHelpers';
	const { decimal, currency } = OYSTER_RATE_METADATA;
	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	let duration: number | undefined = undefined; //durationInSecs
	let instanceCost = 0n;
	let invalidCost = false;
	let durationUnitInSec: number;

	//loading states
	let submitLoading = false;
	let approvedLoading = false;
	let approved = false;
	let instanceCostString = '';

	function handleMaxClick() {
		instanceCost = $oysterStore.allowance * BigInt(OYSTER_RATE_SCALING_FACTOR);
		instanceCostString = getInstanceCostString(instanceCost);
		// adding one as it always rounds down due to bigInt division
		duration = Number(instanceCost / rate) + 1;
	}

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
		await handleApproveFundForOysterJob(instanceCost / OYSTER_RATE_SCALING_FACTOR);
		approvedLoading = false;
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		await handleFundsAddToJob(jobData, instanceCost / OYSTER_RATE_SCALING_FACTOR, duration ?? 0);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	$: ({ rate } = jobData);
	$: approved =
		connected &&
		Boolean(instanceCost) &&
		$oysterStore.allowance >= instanceCost / BigInt(OYSTER_RATE_SCALING_FACTOR) &&
		instanceCost > 0n;
	$: approveEnable = connected && !submitLoading && instanceCost > 0n && !invalidCost;
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
			bind:durationUnitInSec
			instanceRate={rate}
			instanceRateEditable={false}
			isTotalRate={true}
		/>
		<div class="flex gap-2 items-center mt-2">
			<MaxButton onclick={handleMaxClick} />
			<div class={dividerClasses.vertical} />
			<Text
				variant="small"
				styleClass="text-gray-400"
				fontWeight="font-normal"
				text={'Approved amount: ' +
					bigNumberToString($oysterStore.allowance, decimal, 4) +
					' ' +
					currency}
			/>
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
