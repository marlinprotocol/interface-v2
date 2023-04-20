<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { CPUrlDataModel, OysterProviderDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import {
		getFiltersDataForCreateJob,
		getvCpuMemoryData
	} from '$lib/utils/data-modifiers/oysterModifiers';
	import { closeModal, isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import CreateOrderModalContent from '../../sub-components/CreateOrderModalContent.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';

	export let modalFor: string;

	const { userDurationUnitInRateUnit, rateUnitInSeconds } = kOysterRateMetaData;

	let allProviders: OysterProviderDataModel[] = [];
	let approvedAmount: BigNumber;
	let maxBalance = BigNumberZero;
	let filterData: {
		allInstances: CPUrlDataModel[];
		region: string[];
		instance: string[];
	};

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		allProviders = value.allProviders;
		approvedAmount = value.allowance;
	});
	onDestroy(unsubscribeOysterStore);

	const unsubscribeWalletBalanceStore = walletBalance.subscribe((value) => {
		maxBalance = value.pond;
	});
	onDestroy(unsubscribeWalletBalanceStore);

	$: merchantList = allProviders.map((provider) =>
		provider.name != '' ? provider.name : provider.id
	);

	//initial states
	const initalFilterValues = {
		instance: {
			value: '',
			error: '',
			isDirty: false,
			title: 'Instance'
		},
		region: {
			value: '',
			error: '',
			isDirty: false,
			title: 'Region'
		}
	};
	const initialMerchant = {
		value: '',
		error: '',
		isDirty: false,
		title: 'Merchant'
	};
	let values = initalFilterValues;
	let merchant = initialMerchant;

	$: selectedProvider = allProviders.find(
		(provider) => provider.id == merchant.value || provider.name == merchant.value
	);

	let enclaveImageUrl = '';
	let durationString: string = '';
	let rate: BigNumber | null;

	//loading states
	let submitLoading = false;

	const handleSubmitClick = async () => {
		if (
			!selectedProvider ||
			!selectedProvider.cp ||
			!rate ||
			!cost ||
			!values.instance.value ||
			!values.region.value
		) {
			return;
		}

		const { vcpu, memory } = getvCpuMemoryData(values.instance.value);
		const metadata = JSON.stringify({
			instanceType: values.instance.value,
			region: values.region.value,
			memory: memory ?? '',
			vcpu: vcpu ?? '',
			url: selectedProvider.cp
		});

		submitLoading = true;
		await handleCreateJob(
			metadata,
			merchant.value,
			rate,
			cost,
			duration * rateUnitInSeconds * userDurationUnitInRateUnit
		);
		submitLoading = false;
		resetInputs();
		closeModal(modalFor);
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
		values = initalFilterValues;
		merchant = initialMerchant;
		durationString = '';
		cost = null;
		rate = null;
	};

	const handleFieldChange = (
		valueMap: { value: string; error: string; isDirty: boolean; title: string },
		value: string,
		dataList: string[],
		fieldTitle: string
	) => {
		valueMap.value = value;
		valueMap.isDirty = true;
		if (value == '') {
			valueMap.error = `${fieldTitle} is required`;
		} else if (dataList.indexOf(value) == -1) {
			valueMap.error = `${value} is not a valid ${fieldTitle}`;
		} else {
			valueMap.error = '';
		}
		return valueMap;
	};

	const handleMerchantChange = async (value: string) => {
		merchant = handleFieldChange(merchant, value, merchantList, 'Merchant');
		values = initalFilterValues;
		filterData = await getFiltersDataForCreateJob(selectedProvider);
	};

	$: duration = isInputAmountValid(durationString) ? Number(durationString) : 0;

	// duration in rate unit
	$: cost = rate ? rate.mul(duration * userDurationUnitInRateUnit) : null;

	$: approved = cost && approvedAmount?.gte(cost) && cost.gt(BigNumberZero);

	$: submitEnable =
		duration &&
		cost?.gt(BigNumberZero) &&
		rate &&
		maxBalance.gte(cost) &&
		!merchant.error &&
		merchant.value != '' &&
		!values.region.error &&
		values.region.value != '' &&
		!values.instance.error &&
		values.instance.value != '' &&
		enclaveImageUrl != '';

	$: inValidMessage = !cost ? '' : !maxBalance.gte(cost) ? 'Insufficient balance' : '';
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
				setSearchValue={handleMerchantChange}
				title={'Operator'}
				placeholder={'Enter operator name or address'}
			/>
			<ErrorTextCard
				showError={merchant.isDirty && merchant.error != ''}
				errorMessage={merchant.error}
				styleClass={'mt-0'}
			/>
			<CreateOrderModalContent bind:rate {filterData} bind:values {handleFieldChange} />
			<div class="flex gap-2">
				<AmountInputWithTitle
					title={'Hourly Rate'}
					inputAmountString={rate ? bigNumberToCommaString(rate, 6) : ''}
					disabled
					prefix={'$'}
				/>
				<AmountInputWithTitle
					title={'Duration'}
					bind:inputAmountString={durationString}
					suffix={'Days'}
				/>
				<AmountInputWithTitle
					title={'Cost'}
					inputAmountString={cost ? bigNumberToCommaString(cost, 6) : ''}
					suffix={'USDC'}
				/>
			</div>
			<ErrorTextCard
				showError={inValidMessage != ''}
				errorMessage={inValidMessage}
				styleClass="mt-0"
			/>
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Enclave Image URL'}
				placeholder={'Paste URL here'}
				bind:input={enclaveImageUrl}
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
