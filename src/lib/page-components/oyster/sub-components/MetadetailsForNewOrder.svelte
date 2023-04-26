<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import type { OysterMarketplaceDataModel } from '$lib/types/oysterComponentType';
	import { getvCpuMemoryData } from '$lib/utils/data-modifiers/oysterModifiers';
	import { getAllFiltersListforMarketplaceData } from '$lib/utils/helpers/oysterHelpers';

	export let allMarketplaceData: OysterMarketplaceDataModel[];
	export let initialStates: any;
	export let jobValues: any;

	let providerAddress: string | undefined;
	$: merchantList = [
		...new Set(
			allMarketplaceData.map((data) =>
				data.provider.name && data.provider.name !== '' ? data.provider.name : data.provider.address
			) ?? []
		)
	];

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
		const merchant = handleFieldChange(jobValues.merchant, value, merchantList, 'Operator');
		providerAddress = allMarketplaceData.find(
			(data) => data.provider.name === value || data.provider.address === value
		)?.provider.address;
		jobValues = {
			...jobValues,
			instance: initialStates.instance,
			region: initialStates.region,
			merchant
		};
	};

	$: instanceData = getvCpuMemoryData(jobValues.instance.value);
	$: vcpu = !jobValues.instance.value ? '' : instanceData.vcpu?.toString() ?? 'N/A';
	$: memory = !jobValues.instance.value ? '' : instanceData.memory?.toString() ?? 'N/A';

	$: filterData = getAllFiltersListforMarketplaceData(allMarketplaceData, false);
</script>

<SearchWithSelect
	dataList={merchantList}
	searchValue={jobValues.merchant.value}
	setSearchValue={handleMerchantChange}
	title={'Operator'}
	placeholder={'Enter operator name or address'}
/>
<ErrorTextCard
	showError={jobValues.merchant.isDirty && jobValues.merchant.error != ''}
	errorMessage={jobValues.merchant.error}
	styleClass={'mt-0'}
/>
<div class="flex gap-2">
	<div class="w-full">
		<SearchWithSelect
			dataList={filterData?.instance ?? []}
			searchValue={jobValues.instance.value}
			setSearchValue={(value) => {
				jobValues.instance = handleFieldChange(
					jobValues.instance,
					value,
					filterData?.instance ?? [],
					jobValues.instance.title
				);
			}}
			title={'Instance'}
			placeholder={'Select instance'}
		/>
	</div>
	<div class="w-full">
		<SearchWithSelect
			dataList={filterData?.region ?? []}
			searchValue={jobValues.region.value}
			setSearchValue={(value) => {
				jobValues.region = handleFieldChange(
					jobValues.region,
					value,
					filterData?.region ?? [],
					jobValues.region.title
				);
			}}
			title={'Region'}
			placeholder={'Select region'}
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
		<TextInputWithEndButton title={'vCPU'} input={vcpu} placeholder={'Select Instance'} disabled />
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
