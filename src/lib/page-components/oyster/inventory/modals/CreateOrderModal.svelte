<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterInventoryDataModel,
		OysterMarketplaceDataModel
	} from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { kOysterOwnerInventory } from '$lib/utils/constants/oysterConstants';
	import { getvCpuMemoryData } from '$lib/utils/data-modifiers/oysterModifiers';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import { getRateForProviderAndFilters } from '$lib/utils/helpers/oysterHelpers';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import AddFundsToJob from '../../sub-components/AddFundsToJob.svelte';
	import MetadetailsForNewOrder from '../../sub-components/MetadetailsForNewOrder.svelte';

	export let modalFor: string;
	export let preFilledData: Partial<OysterInventoryDataModel> = {};

	let allMarketplaceData: OysterMarketplaceDataModel[] = [];
	let approvedAmount: BigNumber;
	let providerAddress: string | undefined = preFilledData.provider?.address;

	let duration = 0; //durationInSecs
	let cost = BigNumberZero;
	let rate: BigNumber | undefined = undefined;
	let invalidCost = false;

	//loading states
	let submitLoading = false;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		allMarketplaceData = value.allMarketplaceData;
		approvedAmount = value.allowance;
	});
	onDestroy(unsubscribeOysterStore);

	//initial states
	const initialStates = {
		merchant: {
			value: preFilledData?.provider?.address || '',
			error: '',
			isDirty: false,
			title: 'Operator'
		},
		instance: {
			value: preFilledData?.instance || '',
			error: '',
			isDirty: false,
			title: 'Instance'
		},
		region: {
			value: preFilledData?.region || '',
			error: '',
			isDirty: false,
			title: 'Region'
		},
		enclaveImageUrl: {
			value: preFilledData?.enclaveUrl || ''
		}
	};

	// deep copy of initial states
	let jobValues = {
		merchant: {
			...initialStates.merchant
		},
		instance: {
			...initialStates.instance
		},
		region: {
			...initialStates.region
		},
		enclaveImageUrl: {
			...initialStates.enclaveImageUrl
		}
	};

	const handleSubmitClick = async () => {
		if (!rate || !cost || !jobValues.instance.value || !jobValues.region.value) {
			return;
		}
		const { vcpu, memory } = getvCpuMemoryData(jobValues.instance.value);
		const metadata = JSON.stringify({
			instanceType: jobValues.instance.value,
			region: jobValues.region.value,
			memory: memory ?? '',
			vcpu: vcpu ?? '',
			url: jobValues.enclaveImageUrl.value
		});

		submitLoading = true;
		await handleCreateJob(metadata, jobValues.merchant.value, rate, cost, duration);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
		goto(kOysterOwnerInventory);
	};

	const handleApproveClick = async () => {
		if (!cost) {
			return;
		}
		submitLoading = true;
		await handleApproveFundForOysterJob(cost);
		submitLoading = false;
	};

	const resetInputs = () => {
		jobValues = initialStates;
		duration = 0;
		cost = BigNumberZero;
		rate = undefined;
		invalidCost = false;
	};

	$: rate = getRateForProviderAndFilters(providerAddress, jobValues, allMarketplaceData);

	$: approved = cost && approvedAmount?.gte(cost) && cost.gt(BigNumberZero);

	$: submitEnable =
		duration &&
		cost?.gt(BigNumberZero) &&
		rate &&
		!invalidCost &&
		!jobValues.merchant.error &&
		jobValues.merchant.value != '' &&
		!jobValues.region.error &&
		jobValues.region.value != '' &&
		!jobValues.instance.error &&
		jobValues.instance.value != '' &&
		jobValues.enclaveImageUrl.value != '';

	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';
	const styles = {
		inputText: 'px-4 py-2',
		inputNumber: ''
	};
</script>

<Modal {modalFor} onClose={resetInputs} padding={false}>
	<svelte:fragment slot="title">
		{'Create Order'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-2 px-4">
			<MetadetailsForNewOrder bind:jobValues bind:providerAddress {allMarketplaceData} />
			<AddFundsToJob bind:cost bind:duration bind:invalidCost {rate} />
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Enclave Image URL'}
				placeholder={'Paste URL here'}
				bind:input={jobValues.enclaveImageUrl.value}
			/>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="p-4">
			<Button
				variant="filled"
				disabled={!submitEnable}
				loading={submitLoading}
				onclick={approved ? handleSubmitClick : handleApproveClick}
				size="large"
				styleClass={'btn-block w-full'}
			>
				{approved ? 'DEPLOY' : 'APPROVE'}
			</Button>
		</div>
	</svelte:fragment>
</Modal>
