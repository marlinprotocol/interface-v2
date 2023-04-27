<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import type {
		OysterFiltersModel,
		OysterMarketplaceDataModel,
		OysterMarketplaceFilterModel
	} from '$lib/types/oysterComponentType';
	import {
		getAllFiltersListforMarketplaceData,
		getFilteredMarketplaceData,
		getUpdatedFiltersList
	} from '$lib/utils/helpers/oysterHelpers';
	import TableFilter from './TableFilter.svelte';

	export let filterMap: Record<string, string | number> = {};
	export let allMarketplaceData: OysterMarketplaceDataModel[];
	export let filteredData: OysterMarketplaceDataModel[];
	export let onFilterClick: () => void;

	let filterIdOrders: string[] = [];
	$: allFilters = getAllFiltersListforMarketplaceData(allMarketplaceData);

	const handleFilterData = (id: keyof OysterMarketplaceFilterModel, value: string | number) => {
		onFilterClick();
		if (value === 'All') {
			delete filterMap[id];
			filterIdOrders.filter((filterId) => filterId !== id);
		} else {
			filterMap[id] = value;
			filterIdOrders.push(id);
		}
		const previousFilters = {
			...allFilters
		};

		filteredData = getFilteredMarketplaceData(allMarketplaceData, filterMap);
		const currentFilters = getAllFiltersListforMarketplaceData(filteredData);
		allFilters = getUpdatedFiltersList(
			previousFilters,
			currentFilters,
			filterIdOrders as (keyof OysterFiltersModel)[]
		);
	};

	const handleClearFilters = () => {
		filterMap = {};
		filterIdOrders = [];
		filteredData = allMarketplaceData;
		allFilters = getAllFiltersListforMarketplaceData(allMarketplaceData);
	};
</script>

<div class="w-full flex gap-2 items-end">
	<div class="w-full">
		<SearchWithSelect
			dataList={allFilters?.provider}
			searchValue={filterMap.provider}
			setSearchValue={(value) => handleFilterData('provider', value)}
			title={'Operator'}
			showTitle={false}
			placeholder={'Enter operator name or address'}
			cardVariant={'search'}
			styleClass={'w-full'}
			onSearchClick={onFilterClick}
		/>
		<div class="flex gap-4 items-center mt-4">
			<TableFilter
				dataList={allFilters?.instance}
				value={filterMap.instance ?? ''}
				setValue={(value) => handleFilterData('instance', value)}
				title={'Filter by Instance'}
			/>
			<TableFilter
				dataList={allFilters?.region}
				value={filterMap.region ?? ''}
				setValue={(value) => handleFilterData('region', value)}
				title={'Filter by Region'}
			/>
			<TableFilter
				dataList={allFilters?.memory}
				value={filterMap.memory ?? ''}
				setValue={(value) => handleFilterData('memory', value)}
				title={'Filter by Memory'}
			/>
			<TableFilter
				dataList={allFilters?.vcpu}
				value={filterMap.vcpu ?? ''}
				setValue={(value) => handleFilterData('vcpu', value)}
				title={'Filter by vCPU'}
			/>
		</div>
	</div>
	<div>
		<Button variant="outlined" size="medium" styleClass="w-[140px]" onclick={handleClearFilters}>
			CLEAR
		</Button>
	</div>
</div>
