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
	import { checkValidURL, closeModal, sanitizeUrl } from '$lib/utils/helpers/commonHelper';
	import { getRateForProviderAndFilters } from '$lib/utils/helpers/oysterHelpers';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob,
		handleCreateJobWithCredits
	} from '$lib/utils/services/oysterServices';
	import AddFundsToJob from '$lib/page-components/oyster/sub-components/AddFundsToJob.svelte';
	import MetadetailsForNewOrder from '$lib/page-components/oyster/sub-components/MetadetailsForNewOrder.svelte';
	import BandwidthSelector from '$lib/page-components/oyster/sub-components/BandwidthSelector.svelte';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
	import { walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import type { WalletBalanceStore } from '$lib/types/storeTypes';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { OYSTER_MARLIN_CREDIT_METADATA } from '$lib/utils/constants/oysterConstants';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { ROUTES } from '$lib/utils/constants/urls';

	export let modalFor: string;
	export let preFilledData: Partial<CreateOrderPreFilledModel> = {};
	export let isRedeploy: boolean = false;

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
	let useMarlinCredits: boolean = false;
	let notServiceable = false;
	let bandwidth = '';

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
		},
		jobName: {
			value: preFilledData?.jobName || '',
			title: 'Job Name'
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
	let jobName = {
		...initialStates.jobName
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
			url: finalEnclaveUrl,
			name: jobName.value
		});

		const provider = {
			address: merchant.value,
			name: merchant?.name || ''
		};

		const owner = {
			address: $walletStore.address
		};

		const amountSentToContract = totalCostScaled / $oysterRateMetadataStore.oysterRateScalingFactor;

		let success: any;
		if (useMarlinCredits) {
			success = await handleCreateJobWithCredits(
				owner,
				metadata,
				provider,
				totalRate,
				amountSentToContract,
				duration,
				$oysterRateMetadataStore.oysterRateScalingFactor,
				$chainStore.chainId as number,
				$walletStore.address
			);
			console.log('created job using credits');
		} else {
			success = await handleCreateJob(
				owner,
				metadata,
				provider,
				totalRate,
				amountSentToContract,
				duration,
				$oysterRateMetadataStore.oysterRateScalingFactor,
				$chainStore.chainId as number,
				$walletStore.address
			);
			console.log('created job using using real cash ching ching');
		}

		submitLoading = false;
		if (!success) {
			return;
		}
		resetInputs();
		closeModal(modalFor);
		goto(ROUTES.OYSTER_INVENTORY_URL);
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
		bandwidth = '';
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
	$: walletBalance =
		$oysterStore.credits.isWhitelisted && useMarlinCredits
			? $oysterStore.credits.balance
			: $walletBalanceStore[
					$oysterTokenMetadataStore.currency.toLowerCase() as keyof WalletBalanceStore
				];

	$: walletBalanceText = useMarlinCredits
		? bigNumberToString(walletBalance, OYSTER_MARLIN_CREDIT_METADATA.decimal, 2) +
			' ' +
			OYSTER_MARLIN_CREDIT_METADATA.currency.split('_')[1]
		: bigNumberToString(walletBalance, $oysterTokenMetadataStore.decimal, 2) +
			' ' +
			$oysterTokenMetadataStore.currency;
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
		enclaveImageUrl.value !== '' &&
		!submitLoading;

	$: finalEnclaveUrl = sanitizeUrl(enclaveImageUrl.value);

	$: validEnclaveUrl =
		enclaveImageUrl.value !== undefined && enclaveImageUrl.value !== ''
			? checkValidURL(finalEnclaveUrl)
			: true;

	$: totalRate = finalBandwidthRateScaled + (instanceRate || 0n);
</script>

<Modal {modalFor} onClose={resetInputs} padding={false} isScrollable={true}>
	<svelte:fragment slot="title">Create Order</svelte:fragment>

	<svelte:fragment slot="content">
		<div class="flex flex-col gap-2">
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
				allMarketplaceData={isRedeploy ? $oysterStore.jobsData : $oysterStore.allMarketplaceData}
				handleChange={handleMerchantChange}
			/>
			<AddFundsToJob
				containerClasses="my-4"
				bind:instanceRate
				bind:instanceCostScaled
				bind:instanceCostString
				bind:duration
				bind:invalidCost
				bind:useMarlinCredits
				{isRedeploy}
			/>
			<BandwidthSelector
				bind:region
				bind:bandwidthCostScaled
				bind:duration
				bind:instanceCostScaled
				bind:finalBandwidthRateScaled
				bind:totalCostScaled
				bind:useMarlinCredits
				bind:bandwidth
			/>
			<TextInputWithEndButton
				id="-enclave-image-url"
				styleClass="px-4 py-3"
				label="Enclave Image URL"
				placeholder="Paste URL here"
				bind:input={enclaveImageUrl.value}
			/>
			<TextInputWithEndButton
				styleClass="px-4 py-2 mt-4"
				label={jobName.title}
				placeholder="Enter your job name"
				bind:input={jobName.value}
				labelTooltip="Avoid putting in sensitive information as the job name as these details would be logged onto the public blockchain"
			></TextInputWithEndButton>
			<ErrorTextCard
				styleClass="mt-0"
				showError={!validEnclaveUrl}
				errorMessage="Invalid control plane URL. Make sure to use the full URL along with http:// or https:// and remove any trailing slashes."
			/>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="flex items-center justify-between">
			<Text
				variant="small"
				id="wallet-credits"
				styleClass="text-black ml-1"
				fontWeight="font-normal"
				text="Balance: {walletBalanceText}"
			/>
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text mr-3">Use Credits</span>
					<input
						bind:checked={useMarlinCredits}
						type="checkbox"
						class="checkbox-primary checkbox checkbox-md"
					/>
				</label>
			</div>
		</div>

		<div class="mt-3">
			{#if useMarlinCredits}
				<Button
					variant="filled"
					disabled={!submitEnable}
					loading={submitLoading}
					onclick={handleSubmitClick}
					size="large"
					styleClass="btn-block w-full"
				>
					{'Deploy'}
				</Button>
			{:else}
				<Button
					variant="filled"
					disabled={!submitEnable}
					loading={submitLoading}
					onclick={approved ? handleSubmitClick : handleApproveClick}
					size="large"
					styleClass="btn-block w-full"
				>
					{approved ? 'Deploy' : 'Approve'}
				</Button>
			{/if}
		</div>
	</svelte:fragment>
</Modal>
