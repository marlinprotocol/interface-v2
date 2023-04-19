<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterProviderDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import {
		getFiltersDataForCreateJob,
		getRateForProviderAndFilters
	} from '$lib/utils/data-modifiers/oysterModifiers';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import {
		handleApproveFundForOysterJob,
		handleCreateJob
	} from '$lib/utils/services/oysterServices';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	export let modalFor: string;

	let allProviders: OysterProviderDataModel[] = [];

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		allProviders = value.allProviders;
	});
	onDestroy(unsubscribeOysterStore);

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
		},
		memory: {
			value: '',
			error: '',
			isDirty: false,
			title: 'Memory'
		},
		vcpu: {
			value: '',
			error: '',
			isDirty: false,
			title: 'vCPU'
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

	$: filterData = getFiltersDataForCreateJob(selectedProvider);

	let enclaveImageUrl = '';
	let durationString: string = '';
	let rate: BigNumber | null;
	$: duration = isInputAmountValid(durationString) ? Number(durationString) : 0;
	// $: rate = getRateForProviderAndFilters(
	// 	selectedProvider,
	// 	values.instance.value,
	// 	values.region.value,
	// 	values.memory.value,
	// 	values.vcpu.value
	// );
	$: cost = rate ? rate.mul(duration) : null;

	//loading states
	let submitLoading = false;

	const handleSubmitClick = async () => {
		if (
			!selectedProvider ||
			!selectedProvider.cp ||
			!rate ||
			!cost ||
			!values.instance.value ||
			!values.region.value ||
			!values.memory.value ||
			!values.vcpu.value
		) {
			return;
		}
		const metadata = JSON.stringify({
			instanceType: values.instance.value,
			region: values.region.value,
			memory: values.memory.value,
			vcpu: values.vcpu.value,
			url: selectedProvider.cp
		});
		submitLoading = true;
		// TODO: approve modal
		await handleApproveFundForOysterJob(cost);
		await handleCreateJob(metadata, merchant.value, rate, cost);
		submitLoading = false;
	};

	//reset amount and signer address
	const resetInputs = () => {
		values = initalFilterValues;
		merchant = initialMerchant;
		durationString = '';
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

	const handleFilterDataChange = (
		field: 'instance' | 'region' | 'memory' | 'vcpu',
		value: string,
		allFilterList: any
	) => {
		const dataList = allFilterList[field];
		const valueMap = values[field];
		values[field] = handleFieldChange(valueMap, value, dataList, valueMap.title);
		rate = getRateForProviderAndFilters(values, allFilterList['allInstances']);
	};

	$: submitEnable =
		duration &&
		cost?.gt(BigNumberZero) &&
		rate &&
		!merchant.error &&
		merchant.value != '' &&
		!values.region.error &&
		values.region.value != '' &&
		!values.instance.error &&
		values.instance.value != '' &&
		!values.memory.error &&
		values.memory.value != '' &&
		!values.vcpu.error &&
		values.vcpu.value != '' &&
		enclaveImageUrl != '';

	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';
	const styles = {
		inputText: 'px-4 py-2',
		inputNumber: ''
	};
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'Create Order'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<SearchWithSelect
				dataList={merchantList}
				setSearchValue={(value) => {
					merchant = handleFieldChange(merchant, value, merchantList, 'Merchant');
					values = initalFilterValues;
				}}
				title={'Operator'}
				placeholder={'Enter operator name or address'}
			/>
			<ErrorTextCard
				showError={merchant.isDirty && merchant.error != ''}
				errorMessage={merchant.error}
				styleClass={'mt-0'}
			/>
			{#await filterData}
				<div class="flex justify-center items-center">loading...</div>
			{:then filterValue}
				<div class="flex gap-4">
					<div class="w-full">
						<SearchWithSelect
							dataList={filterValue.instance}
							setSearchValue={(value) => handleFilterDataChange('instance', value, filterValue)}
							title={'Instance'}
							placeholder={'Select instance'}
						/>
						<ErrorTextCard
							showError={values.instance.isDirty && values.instance.error != ''}
							errorMessage={values.instance.error}
							styleClass={'mt-4'}
						/>
					</div>
					<div class="w-full">
						<SearchWithSelect
							dataList={filterValue.region}
							setSearchValue={(value) => handleFilterDataChange('region', value, filterValue)}
							title={'Region'}
							placeholder={'Select region'}
						/>
						<ErrorTextCard
							showError={values.region.isDirty && values.region.error != ''}
							errorMessage={values.region.error}
							styleClass={'mt-4'}
						/>
					</div>
				</div>
				<div class="flex gap-4">
					<div class="w-full">
						<SearchWithSelect
							dataList={filterValue.vcpu}
							setSearchValue={(value) => handleFilterDataChange('vcpu', value, filterValue)}
							title={'vCPU'}
							placeholder={'Select vcpu'}
						/>
						<ErrorTextCard
							showError={values.vcpu.isDirty && values.vcpu.error != ''}
							errorMessage={values.vcpu.error}
							styleClass={'mt-4'}
						/>
					</div>
					<div class="w-full">
						<SearchWithSelect
							dataList={filterValue.memory}
							setSearchValue={(value) => handleFilterDataChange('memory', value, filterValue)}
							title={'Memory'}
							placeholder={'Select memory'}
						/>
						<ErrorTextCard
							showError={values.memory.isDirty && values.memory.error != ''}
							errorMessage={values.memory.error}
							styleClass={'mt-4'}
						/>
					</div>
				</div>
			{/await}
			<div class="flex gap-4">
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
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Enclave Image URL'}
				placeholder={'Paste URL here'}
				bind:input={enclaveImageUrl}
			/>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			size="large"
			styleClass={'btn-block w-full my-0'}>DEPLOY</Button
		>
	</svelte:fragment>
</Modal>
