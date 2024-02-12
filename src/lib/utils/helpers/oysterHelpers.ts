import {
	OYSTER_CAUTION_DURATION,
	OYSTER_DURATION_UNITS_LIST,
	OYSTER_WARNING_DURATION
} from '$lib/utils/constants/oysterConstants';
import type {
	OysterDurationUnits,
	OysterFiltersModel,
	OysterInventoryDataModel,
	OysterInventorySortKeys,
	OysterMarketplaceDataModel,
	OysterMarketplaceFilterModel,
	OysterMarketplaceSortKeys,
	OysterOperatorInventorySortKeys
} from '$lib/types/oysterComponentType';

import { addToast } from '$lib/data-stores/toastStore';
import { getBandwidthRateForRegion } from '$lib/utils/data-modifiers/oysterModifiers';
import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
import type { SortDirection } from '$lib/types/componentTypes';
import { REGION_NAME_CONSTANTS } from '../constants/regionNameConstants';

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

export const getSearchedOysterJobsData = (
	searchInput: string,
	data: OysterInventoryDataModel[] | undefined
) => {
	if (!data) return [];
	if (!searchInput) return data;
	const searchInputLowerCase = searchInput.toLowerCase();
	return data.filter((item) => {
		const { instance, region, owner } = item;
		return (
			instance.toLowerCase().includes(searchInputLowerCase) ||
			region.toLowerCase().includes(searchInputLowerCase) ||
			owner.toLowerCase().includes(searchInputLowerCase)
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
		case 'pending':
			return 'warning';
		case 'closed':
			return 'primary';
		default:
			return 'primary';
	}
};

export const getInventoryDurationVariant = (duration: number) => {
	if (duration < OYSTER_CAUTION_DURATION) {
		return 'error';
	} else if (duration < OYSTER_WARNING_DURATION) {
		return 'warning';
	} else {
		return 'success';
	}
};

export const sortOysterInventory = (
	data: OysterInventoryDataModel[] | undefined,
	sort: OysterInventorySortKeys,
	order: SortDirection
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
			return bnA > bnB ? 1 : -1;
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
	sort: OysterOperatorInventorySortKeys,
	order: SortDirection
) => {
	if (!data) return [];

	const ascendingSort = (a: OysterInventoryDataModel, b: OysterInventoryDataModel) => {
		if (sort === 'amountToBeSettled') {
			const bnA = a[sort];
			const bnB = b[sort];
			return bnA > bnB ? 1 : -1;
		}

		if (sort === 'durationLeft' || sort === 'durationRun' || sort === 'createdAt') {
			const nmA = a[sort] ?? 0;
			const nmB = b[sort] ?? 0;
			return nmA > nmB ? 1 : -1;
		}

		if (sort === 'instance' || sort === 'region' || sort === 'status' || sort === 'owner') {
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
	sort: OysterOperatorInventorySortKeys,
	order: SortDirection
) => {
	if (!data) return [];

	const ascendingSort = (a: OysterInventoryDataModel, b: OysterInventoryDataModel) => {
		if (sort === 'amountToBeSettled') {
			const bnA = a[sort];
			const bnB = b[sort];
			return bnA > bnB ? 1 : -1;
		}

		if (sort === 'durationLeft' || sort === 'durationRun' || sort === 'createdAt') {
			const nmA = a[sort] ?? 0;
			const nmB = b[sort] ?? 0;
			return nmA > nmB ? 1 : -1;
		}

		if (sort === 'instance' || sort === 'region' || sort === 'status' || sort === 'owner') {
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
	sort: OysterMarketplaceSortKeys,
	order: SortDirection
) => {
	if (!data) return [];

	const ascendingSort = (a: OysterMarketplaceDataModel, b: OysterMarketplaceDataModel) => {
		if (sort === 'rateScaled') {
			const bnA = a[sort];
			const bnB = b[sort];
			return bnA > bnB ? 1 : -1;
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

export const getSearchAndFilteredMarketplaceData = (
	allMarketplaceData: OysterMarketplaceDataModel[],
	filterMap: Partial<OysterMarketplaceFilterModel>,
	exactMatch = false
) => {
	// for provider, we are checking substring match and need do check on both name and address
	if (filterMap.provider) {
		const value = filterMap.provider.toLowerCase();
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return exactMatch
				? item.provider.address.toLowerCase() === value ||
				item.provider.name?.toLowerCase() === value
				: item.provider.address.toLowerCase().includes(value) ||
				item.provider.name?.toLowerCase()?.includes(value);
		});
	}

	if (filterMap.region) {
		const value = filterMap.region.toLowerCase();
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return exactMatch
				? item.region.toLowerCase() === value || item.regionName.toLowerCase() === value
				: item.region.toLowerCase().includes(value) ||
				item.regionName.toLowerCase().includes(value);
		});
	}

	if (filterMap.memory) {
		const value = filterMap.memory?.toString();
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return exactMatch
				? item.memory?.toString() === value
				: item.memory?.toString()?.includes(value);
		});
	}

	if (filterMap.vcpu) {
		const value = filterMap.vcpu.toString();
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return exactMatch ? item.vcpu?.toString() === value : item.vcpu?.toString()?.includes(value);
		});
	}

	if (filterMap.instance) {
		const value = filterMap.instance?.toLowerCase();
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return exactMatch
				? item.instance?.toLowerCase() === value
				: item.instance.toLowerCase()?.includes(value);
		});
	}

	if (filterMap.arch) {
		const value = filterMap.arch.toString();
		allMarketplaceData = allMarketplaceData.filter((item) => {
			return exactMatch ? item.arch?.toString() === value : item.arch?.toString()?.includes(value);
		});
	}

	// if (filterMap.rate) {
	// 	const value = filterMap.rate;
	// 	allMarketplaceData = allMarketplaceData.filter((item) => {
	// 		return value && item.rate?.toString()?.includes(value.toString());
	// 	});
	// }

	return allMarketplaceData;
};

export function getAllFiltersListforMarketplaceData(
	filteredData: OysterMarketplaceDataModel[],
	addAllOption = true
) {
	const providers = filteredData.map((item) =>
		item.provider.name && item.provider.name !== '' ? item.provider.name : item.provider.address
	);
	// array of arrays where the first element is the region name and the second element is the region code
	const regions = filteredData.map((item) => [item.regionName, item.region]);
	// remove duplicate regions
	const filteredRegions = regions.filter(
		(region, index, self) => index === self.findIndex((t) => t[1] === region[1])
	);
	const instances = filteredData.map((item) => item.instance);
	const arch = filteredData.map((item) => item.arch);
	const vcpus = filteredData
		.map((item) => item.vcpu ?? 0)
		.filter((item) => item !== 0)
		.sort((a, b) => a - b);
	const memories = filteredData
		.map((item) => item.memory ?? 0)
		.filter((item) => item !== 0)
		.sort((a, b) => a - b);
	const rates = filteredData.map((item) => item.rateScaled).sort((a, b) => (a > b ? 1 : -1));

	return {
		allMarketplaceData: filteredData,
		provider: addAllToList(providers, addAllOption),
		instance: addAllToList(instances, addAllOption),
		region: addAllToList(filteredRegions, addAllOption),
		vcpu: addAllToList(vcpus, addAllOption),
		memory: addAllToList(memories, addAllOption),
		arch: addAllToList(arch, addAllOption)
		// rate: addAllToList(rates, addAllOption)
	} as OysterFiltersModel;
}

export const addAllToList = (data: (string | number | string[])[], addAllOption: boolean) => {
	const setData = [...new Set(data)];
	if (!addAllOption || setData.length === 0) return setData;
	return ['All', ...setData];
};
export function getUpdatedFiltersList(
	previousFilters: OysterFiltersModel,
	currentFilters: OysterFiltersModel,
	filterIdOrders: (keyof OysterFiltersModel)[]
) {
	const newFilter: any = { ...currentFilters };
	for (const id of filterIdOrders) {
		newFilter[id as keyof OysterFiltersModel] = previousFilters[id as keyof OysterFiltersModel];
	}
	return newFilter;
}

export const getRateForProviderAndFilters = (
	providerAddress: string | undefined,
	instance: string | undefined,
	region: string | undefined,
	allMarketplaceData: OysterMarketplaceDataModel[]
) => {
	if (!providerAddress) return undefined;
	if (!instance || !region) return undefined;

	const instanceSelected = allMarketplaceData?.find(
		(_item) =>
			_item.provider.address === providerAddress &&
			_item.instance === instance &&
			_item.region === region
	);
	return instanceSelected?.rateScaled ?? undefined;
};

export const getCreateOrderInstanceRegionFilters = (
	providerAddress: string | undefined,
	allMarketplaceData: OysterMarketplaceDataModel[] | undefined
) => {
	if (!providerAddress || !allMarketplaceData || allMarketplaceData.length === 0) return {};
	const filteredData = allMarketplaceData.filter(
		(_item) => _item.provider.address === providerAddress
	);
	const filters = getAllFiltersListforMarketplaceData(filteredData, false);
	return {
		instance: filters.instance,
		region: filters.region
	};
};

export const computeCost = (duration: number, rate?: bigint) => {
	try {
		return rate ? rate * BigInt(duration) : 0n;
	} catch (e) {
		addToast({
			variant: 'error',
			message: `Error computing cost, please try again.`
		});
		return 0n;
	}
};

export const computeDuration = (durationString: string, durationUnitInSec: number) => {
	return isInputAmountValid(durationString)
		? Math.floor(Number(durationString) * durationUnitInSec)
		: 0;
};

export const computeDurationString = (duration: number | undefined, durationUnitInSec: number) => {
	if (!duration || duration === 0 || durationUnitInSec === 0) return '';
	return Math.floor(duration / durationUnitInSec).toString();
};

export const addRegionNameToMarketplaceData = (objArray: OysterMarketplaceDataModel[]) => {
	const newArray = objArray.map((obj) => {
		const region = obj.region;
		const regionName = REGION_NAME_CONSTANTS?.[region as keyof typeof REGION_NAME_CONSTANTS];
		if (regionName) {
			return { ...obj, regionName };
		} else {
			return obj;
		}
	});
	return newArray;
};

// returns bandwidth rate in Kb/s
export function getBandwidthFromRateAndRegion(bandwidthRate: bigint, region: string) {
	const rateForRegion = getBandwidthRateForRegion(region);
	if (rateForRegion === undefined || rateForRegion === 0n) return 0n;
	// + 1n is done to ceil the number since in bigInt division we floor the number
	const bandwidthWithAllPrecision = (bandwidthRate * BigInt(1024 * 1024)) / rateForRegion + 1n;

	return bandwidthWithAllPrecision;
}

export const getDurationInSecondsForUnit = (durationUnit: OysterDurationUnits) => {
	return OYSTER_DURATION_UNITS_LIST.find((unit) => unit.label === durationUnit)?.value ?? 1;
};

export const combineAndDeduplicateJobs = (jobsArray1: OysterInventoryDataModel[], jobsArray2: OysterInventoryDataModel[]) => {
	const combinedUniqueObjectsMap = new Map();

	// Helper function to add objects to the map, avoiding duplicates
	const addObjectsToMap = (jobs: OysterInventoryDataModel[]) => {
		jobs.forEach(job => combinedUniqueObjectsMap.set(job.id, job));
	};

	// Add objects from both arrays to the map
	addObjectsToMap(jobsArray1);
	addObjectsToMap(jobsArray2);

	// Convert the map values back to an array
	return Array.from(combinedUniqueObjectsMap.values()).sort((job1, job2) => job2.createdAt - job1.createdAt);
}
