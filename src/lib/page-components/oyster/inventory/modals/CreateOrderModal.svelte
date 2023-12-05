<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import {
		oysterStore,
		oysterTokenMetadataStore,
		oysterRateMetadataStore
	} from '$lib/data-stores/oysterStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import type { CreateOrderPreFilledModel } from '$lib/types/oysterComponentType';
	import { checkValidURL, closeModal } from '$lib/utils/helpers/commonHelper';
	import { getRateForProviderAndFilters } from '$lib/utils/helpers/oysterHelpers';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob
	} from '$lib/utils/services/oysterServices';
	import AddFundsToJob from '$lib/page-components/oyster/sub-components/AddFundsToJob.svelte';
	import MetadetailsForNewOrder from '$lib/page-components/oyster/sub-components/MetadetailsForNewOrder.svelte';
	import BandwidthSelector from '$lib/page-components/oyster/sub-components/BandwidthSelector.svelte';
	import { OYSTER_OWNER_INVENTORY_URL } from '$lib/utils/constants/urls';
	import { contractAddressStore } from '$lib/data-stores/contractStore';

	export let modalFor: string;
	export let preFilledData: Partial<CreateOrderPreFilledModel> = {};

	const subtitle =
		'Create a new order for a new job. You can create a new job by selecting the operator, instance type, region, and enclave image URL, and then approve and add funds to the job.';

	let duration = 0; //durationInSecs
	let instanceCostScaled = 0n;
	let invalidCost = false;
	let instanceCostString = '';
	let bandwidthCostScaled = 0n;
	let finalBandwidthRateScaled = 0n;
	let totalCostScaled = 0n;
	let providerAddress: string | undefined = preFilledData.provider?.address;
	let vcpu = '';
	let memory = '';
	let notServiceable = false;
	//loading state
	let submitLoading = false;
	//initial states
	let initialStates = {
		merchant: {
			value: preFilledData?.provider?.address || '',
			name: preFilledData?.provider?.name || '',
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
		},
		arch: {
			value: preFilledData?.arch || ''
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
	let arch = {
		...initialStates.arch
	};

	const handleSubmitClick = async () => {
		if (
			!instanceRate ||
			!instanceCostScaled ||
			!finalBandwidthRateScaled ||
			!bandwidthCostScaled ||
			!instance.value ||
			!region.value
		) {
			return;
		}

		submitLoading = true;

		const metadata = JSON.stringify({
			instance: instance.value,
			region: region.value,
			memory: Number(memory.split(' ')[0]),
			vcpu: Number(vcpu),
			url: enclaveImageUrl.value
		});

		const provider = {
			address: merchant.value,
			name: merchant?.name || ''
		};

		const success = await handleCreateJob(
			$walletStore.address,
			metadata,
			provider,
			totalRate,
			totalCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
			duration,
			$oysterRateMetadataStore.oysterRateScalingFactor
		);

		submitLoading = false;
		if (!success) {
			return;
		}
		resetInputs();
		closeModal(modalFor);
		goto(OYSTER_OWNER_INVENTORY_URL);
	};

	const handleApproveClick = async () => {
		if (!instanceCostScaled || !bandwidthCostScaled) {
			return;
		}
		submitLoading = true;
		await handleApproveFundForOysterJob(
			totalCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
			$oysterTokenMetadataStore,
			$contractAddressStore.OYSTER
		);
		submitLoading = false;
	};

	const resetInputs = () => {
		handleMerchantChange();
		submitLoading = false;
		instanceRate = preFilledData?.provider ? instanceRate : undefined;
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
		instanceCostScaled = 0n;
		invalidCost = false;
		instanceCostString = '';
	};

	let instanceRate = getRateForProviderAndFilters(
		providerAddress,
		instance.value,
		region.value,
		$oysterStore.allMarketplaceData
	);

	$: approved =
		instanceCostScaled > 0n &&
		$oysterStore.allowance >= totalCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor &&
		bandwidthCostScaled > 0n &&
		totalCostScaled > 0n;

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
		instanceCostScaled > 0n &&
		bandwidthCostScaled > 0n &&
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

	$: totalRate = finalBandwidthRateScaled + (instanceRate || 0n);
</script>

<Modal {modalFor} onClose={resetInputs} padding={false} isScrollable={true}>
	<svelte:fragment slot="title">CREATE ORDER</svelte:fragment>
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
				bind:arch
				allMarketplaceData={$oysterStore.allMarketplaceData}
				handleChange={handleMerchantChange}
			/>
			<AddFundsToJob
				bind:instanceRate
				bind:instanceCostScaled
				bind:instanceCostString
				bind:duration
				bind:invalidCost
			/>
			<BandwidthSelector
				bind:region
				bind:bandwidthCostScaled
				bind:duration
				bind:instanceCostScaled
				bind:finalBandwidthRateScaled
				bind:totalCostScaled
			/>
			<TextInputWithEndButton
				styleClass="px-4 py-2"
				title="Enclave Image URL"
				placeholder="Paste URL here"
				bind:input={enclaveImageUrl.value}
			/>
			<ErrorTextCard
				styleClass="mt-0"
				showError={!validEnclaveUrl}
				errorMessage="Invalid control plane URL. Make sure to use the full URL along with http:// or https:// and remove any trailing slashes."
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
				styleClass="btn-block w-full"
			>
				{approved ? 'DEPLOY' : 'APPROVE'}
			</Button>
		</div>
	</svelte:fragment>
</Modal>
