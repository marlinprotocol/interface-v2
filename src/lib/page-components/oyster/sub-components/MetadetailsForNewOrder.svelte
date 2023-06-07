<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import type {
		OysterFiltersModel,
		OysterMarketplaceDataModel
	} from '$lib/types/oysterComponentType';
	import { getvCpuMemoryData } from '$lib/utils/data-modifiers/oysterModifiers';
	import {
		getCreateOrderInstanceRegionFilters,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import type { BigNumber } from 'ethers';

	export let allMarketplaceData: OysterMarketplaceDataModel[];
	export let jobValues: any;
	export let rate: BigNumber | undefined;
	export let providerAddress: string | undefined;
	export let handleChange = () => {};
	export let notServiceable: boolean = false;

	let filters: Partial<OysterFiltersModel> = getCreateOrderInstanceRegionFilters(
		providerAddress,
		allMarketplaceData
	);

	$: merchantList = [
		...new Set(
			allMarketplaceData.map((data) =>
				data.provider.name && data.provider.name !== '' ? data.provider.name : data.provider.address
			) ?? []
		)
	];

	const handleInstanceChange = async (value: string | number) => {
		jobValues.instance.value = value as string;
		jobValues.instance.isDirty = true;
		if (value == '') {
			jobValues.instance.error = 'Instance is required';
		} else if (filters.instance?.indexOf(value.toString()) == -1) {
			jobValues.instance.error = `${value} is not a valid Instance`;
		} else {
			jobValues.instance.error = '';
		}
		rate = getRateForProviderAndFilters(
			providerAddress,
			jobValues.instance.value,
			jobValues.region.value,
			allMarketplaceData
		);
		if (rate == undefined && jobValues.region.value != '') {
			notServiceable = true;
			addToast({
				message: `${value} is not serviceable for the selected region, please select another instance`,
				variant: 'error'
			});
		} else {
			notServiceable = false;
		}
	};

	const handleRegionChange = async (value: string | number) => {
		jobValues.region.value = value as string;
		jobValues.region.isDirty = true;
		if (value == '') {
			jobValues.region.error = 'Region is required';
		} else if (!filters.region?.some(([_, region]) => region === value)) {
			jobValues.region.error = `${value} is not a valid Region`;
		} else {
			jobValues.region.error = '';
		}
		rate = getRateForProviderAndFilters(
			providerAddress,
			jobValues.instance.value,
			jobValues.region.value,
			allMarketplaceData
		);
		if (rate == undefined && jobValues.instance.value != '') {
			notServiceable = true;
			addToast({
				message: `${value} is not serviceable for the selected instance, please select another region`,
				variant: 'error'
			});
		} else {
			notServiceable = false;
		}
	};

	const handleMerchantChange = async (value: string | number) => {
		jobValues.merchant.value = value as string;
		jobValues.merchant.isDirty = true;
		if (value == '') {
			jobValues.merchant.error = 'Operator is required';
		} else if (merchantList.indexOf(value.toString()) == -1) {
			jobValues.merchant.error = `${value} is not a valid Operator`;
		} else {
			jobValues.merchant.error = '';
		}
		providerAddress =
			value != ''
				? allMarketplaceData.find(
						(data) => data.provider.name === value || data.provider.address === value
				  )?.provider.address
				: undefined;
		rate = undefined;
		jobValues = {
			...jobValues,
			instance: {
				...jobValues.instance,
				error: '',
				isDirty: false,
				value: ''
			},
			region: {
				...jobValues.region,
				error: '',
				isDirty: false,
				value: ''
			}
		};
		filters = getCreateOrderInstanceRegionFilters(providerAddress, allMarketplaceData);
		handleChange();
	};

	$: instanceData = getvCpuMemoryData(jobValues.instance.value);
	$: vcpu = !jobValues.instance.value ? '' : instanceData.vcpu?.toString() ?? 'N/A';
	$: memory = !jobValues.instance.value ? '' : instanceData.memory?.toString() ?? 'N/A';
</script>

<SearchWithSelect
	dataList={merchantList}
	searchValue={jobValues.merchant.value}
	setSearchValue={handleMerchantChange}
	title={'Operator'}
	placeholder={'Enter operator name or address'}
	selectId={'create-order-operator-select'}
/>
<ErrorTextCard
	showError={jobValues.merchant.isDirty && jobValues.merchant.error != ''}
	errorMessage={jobValues.merchant.error}
	styleClass={'mt-0'}
/>
<div class="flex gap-2">
	<div class="w-full">
		<SearchWithSelect
			dataList={filters?.instance ?? []}
			searchValue={jobValues.instance.value}
			setSearchValue={handleInstanceChange}
			title={'Instance'}
			placeholder={'Select instance'}
			disabled={!jobValues.merchant.value}
			selectId={'create-order-instance-select'}
		/>
	</div>
	<div class="w-full">
		<SearchWithSelect
			dataList={filters?.region ?? []}
			searchValue={jobValues.region.value}
			setSearchValue={handleRegionChange}
			title={'Region'}
			placeholder={'Select region'}
			disabled={!jobValues.merchant.value}
			selectId={'create-order-region-select'}
		/>
	</div>
</div>
<ErrorTextCard
	showError={jobValues.instance.isDirty && jobValues.instance.error != ''}
	errorMessage={jobValues.instance.error}
	styleClass={'mt-0'}
/>
<ErrorTextCard
	showError={jobValues.region.isDirty && jobValues.region.error != ''}
	errorMessage={jobValues.region.error}
	styleClass={'mt-0'}
/>
<div class="flex gap-2">
	<div class="w-full">
		<TextInputWithEndButton title={'vCPU'} input={vcpu} placeholder={'Select'} disabled />
	</div>
	<div class="w-full">
		<TextInputWithEndButton
			title={'Memory'}
			input={memory + (memory ? ' MiB' : '')}
			placeholder={'Select'}
			disabled
		/>
	</div>
</div>
