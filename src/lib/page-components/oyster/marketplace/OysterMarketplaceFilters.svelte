<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterFiltersModel,
		OysterMarketplaceDataModel,
		OysterMarketplaceFilterModel
	} from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import {
		getAllFiltersListforMarketplaceData,
		getSearchAndFilteredMarketplaceData,
		getUpdatedFiltersList
	} from '$lib/utils/helpers/oysterHelpers';

	export let filterMap: Record<string, string | number> = {};
	export let filteredData: OysterMarketplaceDataModel[];
	export let onFilterClick: () => void;

	let filterIdOrders: string[] = [];

	const handleFilterData = (
		id: keyof OysterMarketplaceFilterModel,
		value: string | number,
		exactMatch = false
	) => {
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

		filteredData = getSearchAndFilteredMarketplaceData(
			$oysterStore.allMarketplaceData,
			filterMap,
			exactMatch
		);

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
		filteredData = $oysterStore.allMarketplaceData;
		allFilters = getAllFiltersListforMarketplaceData($oysterStore.allMarketplaceData);
	};

	$: allFilters = getAllFiltersListforMarketplaceData($oysterStore.allMarketplaceData);
</script>

<div class="mb-6 flex w-full flex-col items-end gap-2">
	<div class="flex w-full gap-4">
		<SearchWithSelect
			dataList={allFilters?.provider}
			searchValue={filterMap.provider}
			setSearchValue={(value, exactMatch) => handleFilterData('provider', value, exactMatch)}
			title="Operator"
			showTitle={false}
			placeholder="Enter operator name or address"
			cardVariant="search"
			styleClass="w-full"
			onSearchClick={onFilterClick}
			isTableFilter={true}
		/>

		<Button variant="outlined" size="medium" styleClass="w-[140px]" onclick={handleClearFilters}>
			CLEAR
		</Button>
	</div>
	<div class="mt-4 flex flex-col items-center gap-4 md:flex-row">
		<SearchWithSelect
			dataList={allFilters?.instance}
			searchValue={filterMap.instance}
			setSearchValue={(value, exactMatch) => handleFilterData('instance', value, exactMatch)}
			showTitle={false}
			cardVariant="search"
			title="Instance"
			placeholder="Select Instance"
			isTableFilter={true}
		/>
		<SearchWithSelect
			dataList={allFilters?.region}
			searchValue={filterMap.region ?? ''}
			setSearchValue={(value, exactMatch) => handleFilterData('region', value, exactMatch)}
			title="Region"
			placeholder="Filter by Region"
			showTitle={false}
			cardVariant="search"
			isTableFilter={true}
		/>
		<SearchWithSelect
			dataList={allFilters?.vcpu}
			searchValue={filterMap.vcpu ?? ''}
			setSearchValue={(value, exactMatch) => handleFilterData('vcpu', value, exactMatch)}
			title="vCPU"
			placeholder="Filter by vCPU"
			showTitle={false}
			cardVariant="search"
			isTableFilter={true}
		/>
		<SearchWithSelect
			dataList={allFilters?.memory}
			searchValue={filterMap.memory ?? ''}
			setSearchValue={(value, exactMatch) => handleFilterData('memory', value, exactMatch)}
			title="Memory"
			placeholder="Filter by Memory"
			showTitle={false}
			cardVariant="search"
			isTableFilter={true}
			textSuffix={MEMORY_SUFFIX}
		/>
		<SearchWithSelect
			dataList={allFilters?.arch}
			searchValue={filterMap.arch ?? ''}
			setSearchValue={(value, exactMatch) => handleFilterData('arch', value, exactMatch)}
			title="Arch"
			placeholder="Filter by Arch"
			showTitle={false}
			cardVariant="search"
			isTableFilter={true}
		/>
	</div>
</div>
