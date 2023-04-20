<script lang="ts">
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import {
		getRateForProviderAndFilters,
		getvCpuMemoryData
	} from '$lib/utils/data-modifiers/oysterModifiers';
	import type { BigNumber } from 'ethers';

	export let values: any;
	export let rate: BigNumber | undefined | null;
	export let filterData:
		| {
				allInstances: CPUrlDataModel[];
				region: string[];
				instance: string[];
		  }
		| undefined = undefined;
	export let handleFieldChange: (
		valueMap: any,
		value: string,
		dataList: string[],
		fieldTitle: string
	) => any;

	let vcpu: string = '';
	let memory: string = '';

	const handleFilterDataChange = (
		field: 'instance' | 'region',
		value: string,
		allFilterList: any
	) => {
		const dataList = allFilterList[field];
		const valueMap = values[field];
		values[field] = handleFieldChange(valueMap, value, dataList, valueMap.title);
		if (field == 'instance') {
			const instanceData = getvCpuMemoryData(value);
			vcpu = instanceData.vcpu?.toString() ?? '';
			memory = instanceData.memory?.toString() ?? '';
		}
		rate = getRateForProviderAndFilters(values, allFilterList['allInstances']);
	};
</script>

<div class="flex gap-2">
	<div class="w-full">
		<SearchWithSelect
			dataList={filterData?.instance}
			setSearchValue={(value) => handleFilterDataChange('instance', value, filterData)}
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
			dataList={filterData?.region}
			setSearchValue={(value) => handleFilterDataChange('region', value, filterData)}
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
