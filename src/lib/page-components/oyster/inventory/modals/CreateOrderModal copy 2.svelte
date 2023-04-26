<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterInventoryDataModel,
		OysterMarketplaceDataModel
	} from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { kOysterOwnerInventory } from '$lib/utils/constants/oysterConstants';
	import { getvCpuMemoryData } from '$lib/utils/data-modifiers/oysterModifiers';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		getAllFiltersListforMarketplaceData,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import AddFundsToJob from '../../sub-components/AddFundsToJob.svelte';

	export let modalFor: string;
	export let preFilledData: Partial<OysterInventoryDataModel> = {};

	let allMarketplaceData: OysterMarketplaceDataModel[] = [];
	let approvedAmount: BigNumber;

	let duration = 0; //durationInSecs
	let cost = BigNumberZero;
	let rate: BigNumber | undefined = undefined;
	let invalidCost = false;

	//loading states
	let submitLoading = false;
	let providerAddress: string | undefined;

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		allMarketplaceData = value.allMarketplaceData;
		approvedAmount = value.allowance;
	});
	onDestroy(unsubscribeOysterStore);

	$: merchantList = [
		...new Set(
			allMarketplaceData.map((data) =>
				data.provider.name && data.provider.name !== '' ? data.provider.name : data.provider.address
			) ?? []
		)
	];

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
	let values = {
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
		if (!rate || !cost || !values.instance.value || !values.region.value) {
			return;
		}
		const { vcpu, memory } = getvCpuMemoryData(values.instance.value);
		const metadata = JSON.stringify({
			instanceType: values.instance.value,
			region: values.region.value,
			memory: memory ?? '',
			vcpu: vcpu ?? '',
			url: values.enclaveImageUrl.value
		});

		submitLoading = true;
		await handleCreateJob(metadata, values.merchant.value, rate, cost, duration);
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
		values = initialStates;
		duration = 0;
		cost = BigNumberZero;
		rate = undefined;
	};

	const handleFieldChange = (
		valueMap: { value: string; error: string; isDirty: boolean; title: string },
		value: string | number,
		dataList: string[],
		fieldTitle: string
	) => {
		valueMap.value = value as string;
		valueMap.isDirty = true;
		if (value == '') {
			valueMap.error = `${fieldTitle} is required`;
		} else if (dataList.indexOf(value.toString()) == -1) {
			valueMap.error = `${value} is not a valid ${fieldTitle}`;
		} else {
			valueMap.error = '';
		}
		return valueMap;
	};

	const handleMerchantChange = async (value: string | number) => {
		const merchant = handleFieldChange(values.merchant, value, merchantList, 'Operator');
		providerAddress = allMarketplaceData.find(
			(data) => data.provider.name === value || data.provider.address === value
		)?.provider.address;
		values = {
			...values,
			instance: initialStates.instance,
			region: initialStates.region,
			merchant
		};
	};

	$: instanceData = getvCpuMemoryData(values.instance.value);
	$: vcpu = instanceData.vcpu?.toString() ?? '';
	$: memory = instanceData.memory?.toString() ?? '';

	$: filterData = getAllFiltersListforMarketplaceData(allMarketplaceData, false);
	$: rate = getRateForProviderAndFilters(values, allMarketplaceData);

	$: approved = cost && approvedAmount?.gte(cost) && cost.gt(BigNumberZero);

	$: submitEnable =
		duration &&
		cost?.gt(BigNumberZero) &&
		rate &&
		!invalidCost &&
		!values.merchant.error &&
		values.merchant.value != '' &&
		!values.region.error &&
		values.region.value != '' &&
		!values.instance.error &&
		values.instance.value != '' &&
		values.enclaveImageUrl.value != '';

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
			<SearchWithSelect
				dataList={merchantList}
				searchValue={values.merchant.value}
				setSearchValue={handleMerchantChange}
				title={'Operator'}
				placeholder={'Enter operator name or address'}
			/>
			<ErrorTextCard
				showError={values.merchant.isDirty && values.merchant.error != ''}
				errorMessage={values.merchant.error}
				styleClass={'mt-0'}
			/>
			<div class="flex gap-2">
				<div class="w-full">
					<SearchWithSelect
						dataList={filterData?.instance ?? []}
						searchValue={values.instance.value}
						setSearchValue={(value) => {
							values.instance = handleFieldChange(
								values.instance,
								value,
								filterData?.instance ?? [],
								values.instance.title
							);
						}}
						title={'Instance'}
						placeholder={'Select instance'}
					/>
				</div>
				<div class="w-full">
					<SearchWithSelect
						dataList={filterData?.region ?? []}
						searchValue={values.region.value}
						setSearchValue={(value) => {
							values.region = handleFieldChange(
								values.region,
								value,
								filterData?.region ?? [],
								values.region.title
							);
						}}
						title={'Region'}
						placeholder={'Select region'}
					/>
				</div>
			</div>
			<ErrorTextCard
				showError={values.instance.isDirty && values.instance.error != ''}
				errorMessage={values.instance.error}
				styleClass={'mt-0'}
			/>
			<ErrorTextCard
				showError={values.region.isDirty && values.region.error != ''}
				errorMessage={values.region.error}
				styleClass={'mt-0'}
			/>
			<div class="flex gap-2">
				<div class="w-full">
					<TextInputWithEndButton
						title={'vCPU'}
						input={vcpu}
						placeholder={'Select Instance'}
						disabled
					/>
				</div>
				<div class="w-full">
					<TextInputWithEndButton
						title={'Memory'}
						input={memory}
						placeholder={'Select Instance'}
						disabled
					/>
				</div>
			</div>
			<AddFundsToJob bind:cost bind:duration bind:invalidCost {rate} />
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Enclave Image URL'}
				placeholder={'Paste URL here'}
				bind:input={values.enclaveImageUrl.value}
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
