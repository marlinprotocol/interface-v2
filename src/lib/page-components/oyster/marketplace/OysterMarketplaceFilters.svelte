<script lang="ts">
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import type {
		OysterMarketplaceDataModel,
		OysterMarketplaceFilterModel
	} from '$lib/types/oysterComponentType';
	import { getAllFiltersListforMarketplaceData } from '$lib/utils/helpers/oysterHelpers';

	export let filterMap: any = {};
	export let allMarketplaceData: OysterMarketplaceDataModel[];

	$: allFilters = getAllFiltersListforMarketplaceData(allMarketplaceData, filterMap);

	const handleFilterData = (id: keyof OysterMarketplaceFilterModel, value: string | number) => {
		console.log('object :>> ', id, value, filterMap);
		filterMap[id] = value;
	};
	$: console.log('allFilters :>> ', allFilters, filterMap);
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
		dataList={allFilters.memories}
		searchValue={filterMap.memory}
		setSearchValue={(value) => handleFilterData('memory', value)}
		title={'Memory'}
		placeholder={'Select Memory'}
	/>
	<SearchWithSelect
		dataList={allFilters.instances}
		searchValue={filterMap.instance}
		setSearchValue={(value) => handleFilterData('instance', value)}
		title={'Instance'}
		placeholder={'Select Instance'}
	/>
</div>
