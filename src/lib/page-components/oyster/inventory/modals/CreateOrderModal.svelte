<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { getFiltersDataForCreateJob } from '$lib/utils/data-modifiers/oysterModifiers';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	export let modalFor: string;

	let merchantList: string[] = [];
	let instanceList: string[] = [];
	let regionList: string[] = [];
	let vcpuList: string[] = [];
	let memoryList: string[] = [];

	const unsubscribeOysterStore: Unsubscriber = oysterStore.subscribe(async (value) => {
		const allProviders = value.allProviders;
		const dataList = getFiltersDataForCreateJob(allProviders, {});
		console.log('dataListdataList :>> ', dataList);
		merchantList = dataList.merchant ?? [];
		instanceList = dataList.instance ?? [];
		regionList = dataList.region ?? [];
		vcpuList = dataList.vcpu ?? [];
		memoryList = dataList.memory ?? [];
	});
	onDestroy(unsubscribeOysterStore);

	//initial states
	const initalValues = {
		merchant: {
			value: '',
			error: '',
			isDirty: false
		},
		instance: {
			value: '',
			error: '',
			isDirty: false
		},
		region: {
			value: '',
			error: '',
			isDirty: false
		},
		memory: {
			value: '',
			error: '',
			isDirty: false
		},
		vcpu: {
			value: '',
			error: '',
			isDirty: false
		}
	};

	let values = initalValues;
	let enclaveImageUrl = '';
	let durationString: string = '';
	$: duration = isInputAmountValid(durationString) ? Number(durationString) : 0;
	$: rate = BigNumber.from('1000000000000000000'); //TODO: calculate based on selections
	$: cost = rate.mul(duration);

	//loading states
	let submitLoading = false;

	const handleSubmitClick = async () => {};

	//reset amount and signer address
	const resetInputs = () => {
		values = initalValues;
		durationString = '';
	};

	const handleFieldChange = (
		value: string,
		dataList: string[],
		fieldName: 'merchant' | 'region' | 'instance' | 'memory' | 'vcpu',
		fieldTitle: string
	) => {
		values[fieldName].value = value;
		values[fieldName].isDirty = true;
		if (value == '') {
			values[fieldName].error = `${fieldTitle} is required`;
		} else if (dataList.indexOf(value) == -1) {
			values[fieldName].error = `${value} is not a valid ${fieldTitle}`;
		} else {
			values[fieldName].error = '';
		}
	};

	$: submitEnable =
		!!duration &&
		!!cost &&
		!values.merchant.error &&
		values.merchant.value != '' &&
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
				setSearchValue={(value) => handleFieldChange(value, merchantList, 'merchant', 'Operator')}
				title={'Operator'}
				placeholder={'Enter operator name or address'}
			/>
			<ErrorTextCard
				showError={values.merchant.isDirty && values.merchant.error != ''}
				errorMessage={values.merchant.error}
				styleClass={'mt-0'}
			/>
			<div class="flex gap-4">
				<div class="w-full">
					<SearchWithSelect
						dataList={instanceList}
						setSearchValue={(value) =>
							handleFieldChange(value, instanceList, 'instance', 'Instance')}
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
						dataList={regionList}
						setSearchValue={(value) => handleFieldChange(value, regionList, 'region', 'Region')}
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
						dataList={vcpuList}
						setSearchValue={(value) => handleFieldChange(value, vcpuList, 'vcpu', 'vCPU')}
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
						dataList={memoryList}
						setSearchValue={(value) => handleFieldChange(value, memoryList, 'memory', 'Memory')}
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
			<div class="flex gap-4">
				<AmountInputWithTitle
					title={'Rate'}
					inputAmountString={bigNumberToCommaString(rate)}
					disabled
					prefix={'$'}
					suffix={'/day'}
				/>
				<AmountInputWithTitle
					title={'Duration'}
					bind:inputAmountString={durationString}
					suffix={'Days'}
				/>
				<AmountInputWithTitle
					title={'Cost'}
					inputAmountString={bigNumberToCommaString(cost)}
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
			styleClass={'btn-block my-0'}>DEPLOY</Button
		>
	</svelte:fragment>
</Modal>
