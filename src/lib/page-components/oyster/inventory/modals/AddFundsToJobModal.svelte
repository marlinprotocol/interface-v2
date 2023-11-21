<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import {
		oysterStore,
		oysterTokenMetadataStore,
		oysterRateMetadataStore
	} from '$lib/data-stores/oysterStore';
	import { connected, walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleFundsAddToJob
	} from '$lib/utils/services/oysterServices';
	import AddFundsToJob from '$lib/page-components/oyster/sub-components/AddFundsToJob.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import type { WalletBalanceStore } from '$lib/types/storeTypes';
	import Divider from '$lib/atoms/divider/Divider.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	let duration: number | undefined = undefined; //durationInSecs
	let instanceCostScaled = 0n;
	let invalidCost = false;
	let durationUnitInSec: number;
	//loading states
	let submitLoading = false;
	let approvedLoading = false;
	let approved = false;
	let instanceCostString = '';

	function handleMaxClick() {
		instanceCostString = bigNumberToString(
			walletBalance,
			$oysterTokenMetadataStore.decimal,
			4,
			false
		);
		duration = Number(
			(walletBalance * $oysterRateMetadataStore.oysterRateScalingFactor) / rateScaled
		);
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
		await handleApproveFundForOysterJob(
			instanceCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
			$oysterTokenMetadataStore,
			$contractAddressStore.OYSTER
		);
		approvedLoading = false;
	};

	const handleSubmitClick = async () => {
		submitLoading = true;
		await handleFundsAddToJob(
			jobData,
			instanceCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
			duration ?? 0
		);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
	};

	$: ({ rateScaled } = jobData);
	$: walletBalance =
		$walletBalanceStore[
			$oysterTokenMetadataStore.currency.toLowerCase() as keyof WalletBalanceStore
		];
	$: approved =
		connected &&
		Boolean(instanceCostScaled) &&
		$oysterStore.allowance >=
			instanceCostScaled / BigInt($oysterRateMetadataStore.oysterRateScalingFactor) &&
		instanceCostScaled > 0n;
	$: approveEnable = connected && !submitLoading && instanceCostScaled > 0n && !invalidCost;
	$: confirmEnable = approved && approveEnable;
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">ADD FUNDS</svelte:fragment>
	<svelte:fragment slot="subtitle">
		Add funds by approving and depositing tokens for the job
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-2">
			<AddFundsToJob
				bind:duration
				bind:invalidCost
				bind:instanceCostScaled
				bind:instanceCostString
				bind:durationUnitInSec
				instanceRate={rateScaled}
				isTotalRate={true}
			/>
		</div>
		<div class="mt-2 flex items-center gap-2">
			<MaxButton onclick={handleMaxClick} />
			<Divider direction="divider-vertical" />
			<Text
				variant="small"
				styleClass="text-gray-400"
				fontWeight="font-normal"
				text="Balance:
					{bigNumberToString(
					walletBalance,
					$oysterTokenMetadataStore.decimal,
					4
				)} {$oysterTokenMetadataStore.currency}"
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
				styleClass="btn-block w-full my-0">APPROVE</Button
			>
		{:else}
			<Button
				variant="filled"
				disabled={!confirmEnable}
				loading={submitLoading}
				onclick={handleSubmitClick}
				size="large"
				styleClass="btn-block w-full my-0">CONFIRM</Button
			>
		{/if}
	</svelte:fragment>
</Modal>
