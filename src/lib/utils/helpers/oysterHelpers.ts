import type {
	OysterFiltersModel,
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

export const sortOysterOperatorInventory = (
	data: OysterInventoryDataModel[] | undefined,
	sort: string,
	order: 'asc' | 'desc'
) => {
	if (!data) return [];

	const ascendingSort = (a: OysterInventoryDataModel, b: OysterInventoryDataModel) => {
		if (sort === 'amountToBeSettled') {
			const bnA = a[sort];
			const bnB = b[sort];
			return bnA?.gt(bnB) ? 1 : -1;
		}

		if (sort === 'durationLeft' || sort === 'durationRun' || sort === 'createdAt') {
			const nmA = a[sort] ?? 0;
			const nmB = b[sort] ?? 0;
			return nmA > nmB ? 1 : -1;
		}

		if (sort === 'instance' || sort === 'region' || sort === 'status' || sort === 'provider') {
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

export const sortOysterOperatorHistory = (
	data: OysterInventoryDataModel[] | undefined,
	sort: string,
	order: 'asc' | 'desc'
) => {
	if (!data) return [];

	const ascendingSort = (a: OysterInventoryDataModel, b: OysterInventoryDataModel) => {
		if (sort === 'amountToBeSettled') {
			const bnA = a[sort];
			const bnB = b[sort];
			return bnA?.gt(bnB) ? 1 : -1;
		}

		if (sort === 'durationLeft' || sort === 'durationRun' || sort === 'createdAt') {
			const nmA = a[sort] ?? 0;
			const nmB = b[sort] ?? 0;
			return nmA > nmB ? 1 : -1;
		}

		if (sort === 'instance' || sort === 'region' || sort === 'status' || sort === 'provider') {
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

export const getFilteredMarketplaceData = (
	allMarketplaceData: OysterMarketplaceDataModel[],
	filterMap: Partial<OysterMarketplaceFilterModel>
) => {
	// for provider, we are checking substring match and need do check on both name and address
	if (filterMap.provider) {
		const value = filterMap.provider.toLowerCase();
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return item.provider.address.includes(value) || item.provider.name?.includes(value);
		});
	}

	if (filterMap.region) {
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return item.region === filterMap.region;
		});
	}

	if (filterMap.memory) {
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return item.memory === filterMap.memory;
		});
	}

	if (filterMap.vcpu) {
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return item.vcpu === filterMap.vcpu;
		});
	}

	if (filterMap.instance) {
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return item.instance === filterMap.instance;
		});
	}

	if (filterMap.rate) {
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return item.rate === filterMap.rate;
		});
	}

	return allMarketplaceData;
};

export function getAllFiltersListforMarketplaceData(
	filteredData: OysterMarketplaceDataModel[],
	addAllOption = true
) {
	const providers = filteredData.map((item) =>
		item.provider.name && item.provider.name != '' ? item.provider.name : item.provider.address
	);
	const regions = filteredData.map((item) => item.region);
	const instances = filteredData.map((item) => item.instance);
	const vcpus = filteredData
		.map((item) => item.vcpu ?? 0)
		.filter((item) => item !== 0)
		.sort((a, b) => a - b);
	const memories = filteredData
		.map((item) => item.memory ?? 0)
		.filter((item) => item !== 0)
		.sort((a, b) => a - b);
	const rates = filteredData.map((item) => item.rate).sort((a, b) => (a.gt(b) ? 1 : -1));

	return {
		allMarketplaceData: filteredData,
		provider: addAllToList(providers, addAllOption),
		instance: addAllToList(instances, addAllOption),
		region: addAllToList(regions, addAllOption),
		vcpu: addAllToList(vcpus, addAllOption),
		memory: addAllToList(memories, addAllOption)
		// rate: addAllToList(rates, addAllOption)
	} as OysterFiltersModel;
}

const addAllToList = (data: (string | number)[], addAllOption: boolean) => {
	const setData = [...new Set(data)];
	if (!addAllOption || setData.length === 0) return setData;
	return ['All', ...setData];
};
export function getUpdatedFiltersList(
	previousFilters: OysterFiltersModel,
	currentFilters: OysterFiltersModel,
	filterIdOrders: (keyof OysterFiltersModel)[]
) {
	let newFilter: any = { ...currentFilters };
	for (const id of filterIdOrders) {
		newFilter[id as keyof OysterFiltersModel] = previousFilters[id as keyof OysterFiltersModel];
	}
	return newFilter;
}

export const getRateForProviderAndFilters = (
	providerAddress: string | undefined,
	values: any,
	allMarketplaceData: OysterMarketplaceDataModel[]
) => {
	if (!providerAddress) return undefined;
	const { instance, region } = values;
	if (!instance.value || !region.value) return undefined;

	const instanceSelected = allMarketplaceData?.find(
		(_item) =>
			_item.provider.address === providerAddress &&
			_item.instance === instance.value &&
			_item.region === region.value
	);
	return instanceSelected?.rate ?? undefined;
};
