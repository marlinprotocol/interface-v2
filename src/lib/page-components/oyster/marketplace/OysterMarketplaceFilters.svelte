<script lang="ts">
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import type {
		OysterMarketplaceDataModel,
		OysterMarketplaceFilterModel
	} from '$lib/types/oysterComponentType';
	import {
		getAllFiltersListforMarketplaceData,
		getFilteredMarketplaceData
	} from '$lib/utils/helpers/oysterHelpers';

	export let filterMap: any = {};
	export let allMarketplaceData: OysterMarketplaceDataModel[];
	export let filteredData: OysterMarketplaceDataModel[];

	$: allFilters = getAllFiltersListforMarketplaceData(filteredData);

	const handleFilterData = (id: keyof OysterMarketplaceFilterModel, value: string | number) => {
		filterMap[id] = value;
		filteredData = getFilteredMarketplaceData(allMarketplaceData, filterMap);
	};

	$: console.log('allFilters :>> ', allFilters, filterMap, filteredData);
</script>

<div class="flex gap-4 items-center mb-6">
	<SearchWithSelect
		dataList={allFilters.providers}
		searchValue={filterMap.provider}
		setSearchValue={(value) => handleFilterData('provider', value)}
		title={'Operator'}
		placeholder={'Enter operator name or address'}
	/>
	<SearchWithSelect
		dataList={allFilters.instances}
		searchValue={filterMap.instance}
		setSearchValue={(value) => handleFilterData('instance', value)}
		title={'Instance'}
		placeholder={'Select Instance'}
	/>
	<SearchWithSelect
		dataList={allFilters.regions}
		searchValue={filterMap.region}
		setSearchValue={(value) => handleFilterData('region', value)}
		title={'Region'}
		placeholder={'Select Region'}
	/>
	<SearchWithSelect
		dataList={allFilters.memories}
		searchValue={filterMap.memory}
		setSearchValue={(value) => handleFilterData('memory', value)}
		title={'Memory'}
		placeholder={'Select Memory'}
	/>
	<SearchWithSelect
		dataList={allFilters.vcpus}
		searchValue={filterMap.vcpu}
		setSearchValue={(value) => handleFilterData('vcpu', value)}
		title={'vCPU'}
		placeholder={'Select vCPU'}
	/>
</div>
