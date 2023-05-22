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
		getSearchAndFilteredMarketplaceData,
		getUpdatedFiltersList
	} from '$lib/utils/helpers/oysterHelpers';

	export let filterMap: Record<string, string | number> = {};
	export let allMarketplaceData: OysterMarketplaceDataModel[];
	export let filteredData: OysterMarketplaceDataModel[];
	export let onFilterClick: () => void;

	let filterIdOrders: string[] = [];
	$: allFilters = getAllFiltersListforMarketplaceData(allMarketplaceData);

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

		filteredData = getSearchAndFilteredMarketplaceData(allMarketplaceData, filterMap, exactMatch);
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

<div class="w-full flex flex-col md:flex-row gap-2 items-end mb-6">
	<div class="w-full">
		<SearchWithSelect
			dataList={allFilters?.provider}
			searchValue={filterMap.provider}
			setSearchValue={(value, exactMatch) => handleFilterData('provider', value, exactMatch)}
			title={'Operator'}
			showTitle={false}
			placeholder={'Enter operator name or address'}
			cardVariant={'search'}
			styleClass={'w-full'}
			onSearchClick={onFilterClick}
			selectId={'marketplace-provider-select'}
			isTableFilter={true}
		/>
		<div class="flex gap-4 items-center mt-4 flex-col md:flex-row">
			<SearchWithSelect
				dataList={allFilters?.instance}
				searchValue={filterMap.instance}
				setSearchValue={(value, exactMatch) => handleFilterData('instance', value, exactMatch)}
				showTitle={false}
				cardVariant={'search'}
				title={'Instance'}
				placeholder={'Select Instance'}
				selectId={'marketplace-instance-select'}
				isTableFilter={true}
			/>
			<SearchWithSelect
				dataList={allFilters?.region}
				searchValue={filterMap.region ?? ''}
				setSearchValue={(value, exactMatch) => handleFilterData('region', value, exactMatch)}
				title={'Region'}
				placeholder={'Filter by Region'}
				selectId={'marketplace-region-select'}
				showTitle={false}
				cardVariant={'search'}
				isTableFilter={true}
			/>
			<SearchWithSelect
				dataList={allFilters?.memory}
				searchValue={filterMap.memory ?? ''}
				setSearchValue={(value, exactMatch) => handleFilterData('memory', value, exactMatch)}
				title={'Memory'}
				placeholder={'Filter by Memory'}
				selectId={'marketplace-memory-select'}
				showTitle={false}
				cardVariant={'search'}
				isTableFilter={true}
			/>
			<SearchWithSelect
				dataList={allFilters?.vcpu}
				searchValue={filterMap.vcpu ?? ''}
				setSearchValue={(value, exactMatch) => handleFilterData('vcpu', value, exactMatch)}
				title={'vCPU'}
				placeholder={'Filter by vCPU'}
				selectId={'marketplace-vCPU-select'}
				showTitle={false}
				cardVariant={'search'}
				isTableFilter={true}
			/>
		</div>
	</div>
	<div>
		<Button variant="outlined" size="medium" styleClass="w-[140px]" onclick={handleClearFilters}>
			CLEAR
		</Button>
	</div>
</div>
