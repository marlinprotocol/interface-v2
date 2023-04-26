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

	export let filterMap: Record<string, string | number> = {};
	export let allMarketplaceData: OysterMarketplaceDataModel[];
	export let filteredData: OysterMarketplaceDataModel[];

	let filterIdOrders: string[] = [];
	$: allFilters = getAllFiltersListforMarketplaceData(allMarketplaceData);

	const handleFilterData = (id: keyof OysterMarketplaceFilterModel, value: string | number) => {
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

<div class="w-full flex gap-2 items-end my-2">
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
		/>
		<div class="flex gap-4 items-center mt-4">
			<SearchWithSelect
				dataList={allFilters?.instance}
				searchValue={filterMap.instance ?? 'All'}
				setSearchValue={(value) => handleFilterData('instance', value)}
				title={'Instance'}
				placeholder={'Filter by Instance'}
				onlyFilters={true}
				styleClass={'w-full'}
				cardVariant={'search'}
			/>
			<SearchWithSelect
				dataList={allFilters?.region}
				searchValue={filterMap.region ?? 'All'}
				setSearchValue={(value) => handleFilterData('region', value)}
				title={'Region'}
				placeholder={'Filter by Region'}
				onlyFilters={true}
				cardVariant={'search'}
			/>
			<SearchWithSelect
				dataList={allFilters?.memory}
				searchValue={filterMap.memory ?? 'All'}
				setSearchValue={(value) => handleFilterData('memory', value)}
				title={'Memory'}
				placeholder={'Filter by Memory'}
				onlyFilters={true}
				cardVariant={'search'}
			/>
			<SearchWithSelect
				dataList={allFilters?.vcpu}
				searchValue={filterMap.vcpu ?? 'All'}
				setSearchValue={(value) => handleFilterData('vcpu', value)}
				title={'vCPU'}
				placeholder={'Filter by vCPU'}
				onlyFilters={true}
				cardVariant={'search'}
			/>
		</div>
	</div>
	<div>
		<Button variant="outlined" size="small" styleClass="w-[140px]" onclick={handleClearFilters}>
			CLEAR
		</Button>
	</div>
</div>
