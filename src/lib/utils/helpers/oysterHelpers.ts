import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import { BigNumber } from 'ethers';

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
	sort: keyof OysterInventoryDataModel,
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
