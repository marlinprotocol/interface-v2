<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import SearchWithSelect from '$lib/components/search/SearchWithSelect.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type {
		OysterMarketplaceDataModel,
		OysterMarketplaceFilterModel
	} from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import {
		getAllFiltersListforMarketplaceData,
		getSearchAndFilteredMarketplaceData,
		getFiltersListForOysterMarketPlace
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

		filteredData = getSearchAndFilteredMarketplaceData(
			$oysterStore.allMarketplaceData,
			filterMap,
			exactMatch
		);

		allFilters = getFiltersListForOysterMarketPlace(
			$oysterStore.allMarketplaceData,
			filterMap,
			exactMatch
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

<div class="mb-6 flex w-full flex-col items-end gap-2 rounded-[24px] bg-white px-8 py-6">
	<div class="flex w-full items-stretch gap-4">
		<SearchWithSelect
			dataList={allFilters?.provider}
			searchValue={filterMap.provider}
			setSearchValue={(value, exactMatch) => handleFilterData('provider', value, exactMatch)}
			title="Operator"
			showTitle={false}
			placeholder="Search"
			label="Operator name or address"
			cardVariant="search"
			styleClass="w-full"
			onSearchClick={onFilterClick}
			isTableFilter={true}
		/>
		<Button
			variant="filled"
			size="medium"
			styleClass="w-[140px] h-auto font-normal font-poppins"
			onclick={handleClearFilters}>Clear</Button
		>
	</div>
	<div class="mt-4 flex w-full flex-col items-center gap-4 md:flex-row">
		<SearchWithSelect
			dataList={allFilters?.instance}
			searchValue={filterMap.instance}
			setSearchValue={(value, exactMatch) => handleFilterData('instance', value, exactMatch)}
			showTitle={false}
			cardVariant="search"
			title="Instance"
			placeholder="Select"
			label="Instance"
			isTableFilter={true}
		/>
		<SearchWithSelect
			dataList={allFilters?.region}
			searchValue={filterMap.region ?? ''}
			setSearchValue={(value, exactMatch) => handleFilterData('region', value, exactMatch)}
			title="Region"
			placeholder="Select"
			label="Region"
			showTitle={false}
			cardVariant="search"
			isTableFilter={true}
		/>
		<SearchWithSelect
			dataList={allFilters?.vcpu}
			searchValue={filterMap.vcpu ?? ''}
			setSearchValue={(value, exactMatch) => handleFilterData('vcpu', value, exactMatch)}
			title="vCPU"
			placeholder="Select"
			label="vCPU"
			showTitle={false}
			cardVariant="search"
			isTableFilter={true}
		/>
		<SearchWithSelect
			dataList={allFilters?.memory}
			searchValue={filterMap.memory ?? ''}
			setSearchValue={(value, exactMatch) => handleFilterData('memory', value, exactMatch)}
			title="Memory"
			placeholder="Select"
			label="Memory"
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
			placeholder="Select"
			label="Architecture"
			showTitle={false}
			cardVariant="search"
			isTableFilter={true}
		/>
	</div>
</div>
