<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { BigNumber } from 'ethers';

	export let modalFor: string;

	// TODO: get real data for all selections
	const searchList = [
		'Operator 1',
		'Operator 2',
		'Operator 3',
		'Operator 4',
		'Operator 5',
		'ADVV',
		'cdsjkv',
		'cdsbjkcnkdsj',
		'cdsjkcnkdsj',
		'fierdss',
		'Aaaa',
		'asdaaaa'
	];

	//initial states
	const initalValues = {
		merchant: {
			value: '',
			error: '',
			isDirty: false,
			dataList: searchList
		},
		instance: {
			value: '',
			error: '',
			isDirty: false,
			dataList: searchList
		},
		region: {
			value: '',
			error: '',
			isDirty: false,
			dataList: searchList
		},
		memory: {
			value: '',
			error: '',
			isDirty: false,
			dataList: searchList
		},
		vcpu: {
			value: '',
			error: '',
			isDirty: false,
			dataList: searchList
		},
		enclaveImageUrl: {
			value: '',
			error: '',
			isDirty: false,
			dataList: searchList
		}
	};

	let values = initalValues;

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
		fieldName: 'merchant' | 'region' | 'instance' | 'memory' | 'vcpu' | 'enclaveImageUrl'
	) => {
		values[fieldName].value = value;
		values[fieldName].isDirty = true;
		if (value == '') {
			values[fieldName].error = `${fieldName} is required`;
		} else if (values[fieldName].dataList.indexOf(value) == -1) {
		} else {
			values[fieldName].error = '';
		}
	};

	$: submitEnable = !!duration && !!cost;

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
				dataList={values.merchant.dataList}
				setSearchValue={(value) => handleFieldChange(value, 'merchant')}
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
						dataList={values.instance.dataList}
						setSearchValue={(value) => handleFieldChange(value, 'instance')}
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
						dataList={values.region.dataList}
						setSearchValue={(value) => handleFieldChange(value, 'region')}
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
						dataList={values.vcpu.dataList}
						setSearchValue={(value) => handleFieldChange(value, 'vcpu')}
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
						dataList={values.memory.dataList}
						setSearchValue={(value) => handleFieldChange(value, 'memory')}
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
				bind:input={values.enclaveImageUrl.value}
			/>
			<ErrorTextCard
				showError={values.enclaveImageUrl.isDirty && values.enclaveImageUrl.error != ''}
				errorMessage={values.enclaveImageUrl.error}
				styleClass={'mt-4'}
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
