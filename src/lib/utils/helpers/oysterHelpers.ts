import type {
	OysterInventoryDataModel,
	OysterMarketplaceDataModel,
	OysterMarketplaceFilterModel
} from '$lib/types/oysterComponentType';

export const getSearchedInventoryData = (
	searchInput: string,
	data: OysterInventoryDataModel[] | undefined
) => {
	if (!data) return [];
	if (!searchInput) return data;
	const searchInputLowerCase = searchInput.toLowerCase();
	return data.filter((item) => {
		const {
			instance,
			region,
			provider: { name = '', address }
		} = item;
		return (
			instance.toLowerCase().includes(searchInputLowerCase) ||
			region.toLowerCase().includes(searchInputLowerCase) ||
			name.toLowerCase().includes(searchInputLowerCase) ||
			address.toLowerCase().includes(searchInputLowerCase)
		);
	});
};

export const getSearchedMarketplaceData = (
	searchInput: string,
	data: OysterMarketplaceDataModel[] | undefined
) => {
	if (!data) return [];
	if (!searchInput) return data;
	const searchInputLowerCase = searchInput.toLowerCase();
	return data.filter((item) => {
		const {
			instance,
			region,
			provider: { name = '', address }
		} = item;
		return (
			instance.toLowerCase().includes(searchInputLowerCase) ||
			region.toLowerCase().includes(searchInputLowerCase) ||
			name.toLowerCase().includes(searchInputLowerCase) ||
			address.toLowerCase().includes(searchInputLowerCase)
		);
	});
};

export const getInventoryStatusVariant = (status: string) => {
	switch (status) {
		case 'running':
		case 'active':
		case 'completed':
			return 'success';
		case 'inactive':
		case 'stopped':
			return 'error';
		default:
			return 'primary';
	}
};

export const getInventoryDurationVariant = (duration: number) => {
	if (duration < 86400) {
		return 'error';
	} else if (duration < 86400 * 3) {
		return 'warning';
	} else {
		return 'success';
	}
};

export const sortOysterInventory = (
	data: OysterInventoryDataModel[] | undefined,
	sort: string,
	order: 'asc' | 'desc'
) => {
	if (!data) return [];

	const ascendingSort = (a: OysterInventoryDataModel, b: OysterInventoryDataModel) => {
		if (
			sort === 'balance' ||
			sort === 'rate' ||
			sort === 'totalDeposit' ||
			sort === 'amountUsed' ||
			sort === 'refund'
		) {
			const bnA = a[sort];
			const bnB = b[sort];
			return bnA?.gt(bnB) ? 1 : -1;
		}

		if (
			sort === 'durationLeft' ||
			sort === 'memory' ||
			sort === 'vcpu' ||
			sort === 'durationRun' ||
			sort === 'createdAt' ||
			sort === 'lastSettled' ||
			sort === 'endEpochTime'
		) {
			const nmA = a[sort] ?? 0;
			const nmB = b[sort] ?? 0;
			return nmA > nmB ? 1 : -1;
		}

		if (sort === 'instance' || sort === 'region' || sort === 'status') {
			const stA = a[sort];
			const stB = b[sort];
			return stA > stB ? 1 : -1;
		}

		return 1;
	};
	const sortedData = data.sort((a, b) => {
		if (order === 'asc') {
			return ascendingSort(a, b);
		} else {
			return ascendingSort(b, a);
		}
	});
	return sortedData;
};

export const sortOysterMarketplace = (
	data: OysterMarketplaceDataModel[] | undefined,
	sort: string,
	order: 'asc' | 'desc'
) => {
	if (!data) return [];

	const ascendingSort = (a: OysterMarketplaceDataModel, b: OysterMarketplaceDataModel) => {
		if (sort === 'rate') {
			const bnA = a[sort];
			const bnB = b[sort];
			return bnA?.gt(bnB) ? 1 : -1;
		}

		if (sort === 'memory' || sort === 'vcpu') {
			const nmA = a[sort] ?? 0;
			const nmB = b[sort] ?? 0;
			return nmA > nmB ? 1 : -1;
		}

		if (sort === 'instance' || sort === 'region') {
			const stA = a[sort];
			const stB = b[sort];
			return stA > stB ? 1 : -1;
		}

		return 1;
	};
	const sortedData = data.sort((a, b) => {
		if (order === 'asc') {
			return ascendingSort(a, b);
		} else {
			return ascendingSort(b, a);
		}
	});
	return sortedData;
};

export function getAllFiltersListforMarketplaceData(
	allMarketplaceData: OysterMarketplaceDataModel[],
	filterMap: Partial<OysterMarketplaceFilterModel>
) {
	allMarketplaceData = allMarketplaceData.filter((item) => {
		if (filterMap.provider) {
			return (
				item.provider.address === filterMap.provider || item.provider.name === filterMap.provider
			);
		}
		if (filterMap.region) {
			return item.region === filterMap.region;
		}
		if (filterMap.instance) {
			return item.instance === filterMap.instance;
		}
		if (filterMap.vcpu) {
			return item.vcpu === filterMap.vcpu;
		}
		if (filterMap.memory) {
			return item.memory === filterMap.memory;
		}
		if (filterMap.rate) {
			return item.rate.eq(filterMap.rate);
		}
		return true;
	});

	const providers = allMarketplaceData.map((item) =>
		item.provider.name && item.provider.name != '' ? item.provider.name : item.provider.address
	);
	const regions = allMarketplaceData.map((item) => item.region);
	const instances = allMarketplaceData.map((item) => item.instance);
	const vcpus = allMarketplaceData
		.map((item) => item.vcpu ?? 0)
		.filter((item) => item !== 0)
		.sort((a, b) => a - b);
	const memories = allMarketplaceData
		.map((item) => item.memory ?? 0)
		.filter((item) => item !== 0)
		.sort((a, b) => a - b);
	const rates = allMarketplaceData.map((item) => item.rate);

	return {
		providers: [...new Set(providers)],
		instances: [...new Set(instances)],
		regions: [...new Set(regions)],
		vcpus: [...new Set(vcpus)],
		memories: [...new Set(memories)],
		rates: [...new Set(rates)]
	};
}

export const getRateForProviderAndFilters = (
	values: any,
	allMarketplaceData: OysterMarketplaceDataModel[]
) => {
	const { instance, region } = values;
	if (!instance.value || !region.value) return null;

	const instanceSelected = allMarketplaceData?.find(
		(_item) => _item.instance === instance.value && _item.region === region.value
	);
	return instanceSelected?.rate ?? null;
};
