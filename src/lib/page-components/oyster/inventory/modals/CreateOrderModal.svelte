<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type {
		CreateOrderPreFilledModel,
		OysterMarketplaceDataModel
	} from '$lib/types/oysterComponentType';
	import type { Address } from '$lib/types/storeTypes';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { kOysterOwnerInventory } from '$lib/utils/constants/oysterConstants';
	import { checkValidURL, closeModal } from '$lib/utils/helpers/commonHelper';
	import { getRateForProviderAndFilters } from '$lib/utils/helpers/oysterHelpers';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import AddFundsToJob from '$lib/page-components/oyster/sub-components/AddFundsToJob.svelte';
	import MetadetailsForNewOrder from '$lib/page-components/oyster/sub-components/MetadetailsForNewOrder.svelte';
	import BandwidthSelector from '$lib/page-components/oyster/sub-components/BandwidthSelector.svelte';

	export let modalFor: string;
	export let preFilledData: Partial<CreateOrderPreFilledModel> = {};

	let allMarketplaceData: OysterMarketplaceDataModel[] = [];
	let approvedAmount: BigNumber;
	let owner: Address;

	let duration = 0; //durationInSecs
	let instanceCost = BigNumberZero;
	let invalidCost = false;
	let instanceCostString = '';
	let bandwidthCost = BigNumberZero;
	let finalBandwidthRate = BigNumberZero;

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
	let merchant = {
		...initialStates.merchant
	};
	let instance = {
		...initialStates.instance
	};
	let region = {
		...initialStates.region
	};
	let enclaveImageUrl = {
		...initialStates.enclaveImageUrl
	};

	const handleSubmitClick = async () => {
		if (
			!instanceRate ||
			!instanceCost ||
			!finalBandwidthRate ||
			!bandwidthCost ||
			!instance.value ||
			!region.value
		) {
			return;
		}

		const metadata = JSON.stringify({
			instance: instance.value,
			region: region.value,
			memory: Number(memory.split(' ')[0]),
			vcpu: Number(vcpu),
			url: enclaveImageUrl.value
		});

		submitLoading = true;
		const success = await handleCreateJob(
			owner,
			metadata,
			merchant.value,
			totalRate,
			totalCost,
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
		if (!instanceCost || !bandwidthCost) {
			return;
		}
		submitLoading = true;
		await handleApproveFundForOysterJob(totalCost);
		submitLoading = false;
	};

	const resetInputs = () => {
		handleMerchantChange();
		submitLoading = false;
		instanceRate = undefined;
		merchant = {
			...initialStates.merchant
		};
		instance = {
			...initialStates.instance
		};
		region = {
			...initialStates.region
		};
		enclaveImageUrl = {
			...initialStates.enclaveImageUrl
		};
	};

	const handleMerchantChange = () => {
		duration = 0;
		instanceCost = BigNumberZero;
		invalidCost = false;
		instanceCostString = '';
	};

	let instanceRate = getRateForProviderAndFilters(
		providerAddress,
		instance.value,
		region.value,
		allMarketplaceData
	);
	let vcpu: string = '';
	let memory: string = '';
	let notServiceable = false;

	$: approved =
		instanceCost.gt(BigNumberZero) &&
		approvedAmount?.gte(totalCost) &&
		bandwidthCost.gt(BigNumberZero) &&
		totalCost.gt(BigNumberZero);

	$: instanceRateDisabled =
		notServiceable ||
		merchant.error ||
		merchant.value === '' ||
		region.error ||
		region.value === '' ||
		instance.error ||
		instance.value === '';

	$: submitEnable =
		duration &&
		instanceCost?.gt(BigNumberZero) &&
		bandwidthCost?.gt(BigNumberZero) &&
		instanceRate &&
		totalRate &&
		!invalidCost &&
		validEnclaveUrl &&
		!instanceRateDisabled &&
		enclaveImageUrl.value !== '';

	$: validEnclaveUrl =
		enclaveImageUrl.value !== undefined && enclaveImageUrl.value !== ''
			? checkValidURL(enclaveImageUrl.value)
			: true;

	$: totalRate = finalBandwidthRate.add(instanceRate || BigNumberZero);
	$: totalCost = instanceCost.add(bandwidthCost);

	const subtitle =
		'Create a new order for a new job. You can create a new job by selecting the operator, instance type, region, and enclave image URL, and then approve and add funds to the job.';
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
				bind:merchant
				bind:instance
				bind:region
				bind:providerAddress
				bind:instanceRate
				bind:vcpu
				bind:memory
				bind:notServiceable
				{allMarketplaceData}
				handleChange={handleMerchantChange}
			/>
			<AddFundsToJob
				bind:instanceCost
				bind:duration
				bind:invalidCost
				bind:instanceRate
				bind:instanceCostString
				selectId="create-order-duration-unit-select"
				instanceRateEditable={!instanceRateDisabled}
			/>
			<BandwidthSelector
				bind:region
				bind:bandwidthCost
				bind:duration
				bind:instanceCost
				bind:finalBandwidthRate
			/>
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Enclave Image URL'}
				placeholder={'Paste URL here'}
				bind:input={enclaveImageUrl.value}
			/>
			<ErrorTextCard
				styleClass="mt-0"
				showError={!validEnclaveUrl}
				errorMessage={'Invalid control plane URL. Make sure to use the full URL along with http:// or https:// and remove any trailing slashes.'}
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
