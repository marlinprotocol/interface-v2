<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		CreateOrderPreFilledModel,
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
	import type { Address } from '$lib/types/storeTypes';
	import { walletStore } from '$lib/data-stores/walletProviderStore';

	export let modalFor: string;
	export let preFilledData: Partial<CreateOrderPreFilledModel> = {};

	let allMarketplaceData: OysterMarketplaceDataModel[] = [];
	let approvedAmount: BigNumber;
	let owner: Address;

	let duration = 0; //durationInSecs
	let cost = BigNumberZero;
	let rate: BigNumber | undefined = undefined;
	let invalidCost = false;
	let costString = '';

	//loading states
	let submitLoading = false;

	const unsubscribeWalletStore: Unsubscriber = walletStore.subscribe(async (value) => {
		owner = value.address;
	});

	onDestroy(unsubscribeWalletStore);

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		allMarketplaceData = value.allMarketplaceData;
		approvedAmount = value.allowance;
	});
	onDestroy(unsubscribeOysterStore);

	let providerAddress: string | undefined = preFilledData.provider?.address;

	//initial states
	let initialStates = {
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
		const success = await handleCreateJob(
			owner,
			metadata,
			jobValues.merchant.value,
			rate,
			cost,
			duration
		);
		submitLoading = false;
		if (!success) {
			return;
		}
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
		handleMerchantChange();
		submitLoading = false;
		jobValues = {
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
	};

	const handleMerchantChange = () => {
		duration = 0;
		cost = BigNumberZero;
		rate = undefined;
		invalidCost = false;
		costString = '';
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
		'Select operator, instance and region of choice and then add duration/cost. User can also modify the hourly rate. Approve the USDC tokens first and then deploy the job.';
	const styles = {
		inputText: 'px-4 py-2',
		inputNumber: ''
	};
</script>

<Modal {modalFor} onClose={resetInputs} padding={false}>
	<svelte:fragment slot="title">
		{`CREATE ORDER`}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-2 px-4">
			<MetadetailsForNewOrder
				bind:jobValues
				bind:providerAddress
				{allMarketplaceData}
				handleChange={handleMerchantChange}
			/>
			<AddFundsToJob bind:cost bind:duration bind:invalidCost {rate} bind:costString />
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
