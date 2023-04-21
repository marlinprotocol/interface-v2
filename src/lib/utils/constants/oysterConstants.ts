import type { TableModel } from '$lib/types/componentTypes';

//
export const kOysterOwnerInventory = '/oyster/inventory';
export const kOysterOwnerHistory = '/oyster/history';

//merchant pages
export const kMerchantJobs = '/oyster/operator/jobs';
export const kMerchantHistory = '/oyster/operator/history';

export const kOysterRateMetaData = {
	currency: 'USDC',
	symbol: '$',
	decimal: 18,
	rateUnit: 'hour',
	rateUnitInSeconds: 3600,
	userDurationUnit: 'day',
	userDurationUnitInRateUnit: 24
};

export const oysterTableItemsPerPage = 10;

export const kInstancesTableHeader: TableModel['header'][] = [
	{
		title: 'Instance Type',
		id: 'type'
	},
	{
		title: 'Region',
		id: 'region',
		tooltipText: 'The amount of POND which was placed for conversion to MPond.'
	},
	{
		title: 'Price',
		id: 'price',
		tooltipText:
			'The corresponding amount of MPond received as a result of the conversion from POND. Note: 1 Million POND equals 1 MPond.'
	}
];

export const kOysterMerchantJobTableHeader: TableModel['header'][] = [
	{
		title: 'USER',
		id: 'user',
		sorting: true
	},
	{
		title: 'INSTANCE',
		id: 'instance'
	},
	{
		title: 'REGION',
		id: 'region'
	},
	{
		title: 'STARTED',
		id: 'started'
	},
	{
		title: 'DURATION RUN',
		id: 'duration'
	},
	{
		title: 'ACCRUED',
		id: 'accrued'
	},
	{
		title: 'STATUS',
		id: 'status',
		sorting: true
	},
	{
		title: '',
		id: 'action'
	}
];

export const kOysterMerchantJobTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'user':
			return '17.5%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'started':
			return '12.5%';
		case 'duration':
			return '12.5%';
		case 'accrued':
			return '12.5%';
		case 'status':
			return '12.5%';
		default:
			return '12.5%';
	}
};

// Merchant, Region, Instance, Rate, Amount Paid, Amount Used, Balance, Duration Left, Status
export const kOysterInventoryTableHeader: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'merchant'
	},
	{
		title: 'INSTANCE',
		id: 'instance'
	},
	{
		title: 'REGION',
		id: 'region'
	},
	{
		title: 'HOURLY RATE',
		id: 'rate',
		sorting: true,
		tooltipText: 'Hourly rate of the instance'
	},
	{
		title: 'vCPU',
		id: 'vcpu'
	},
	{
		title: 'MEMORY',
		id: 'memory'
	},
	{
		title: 'BALANCE',
		id: 'balance',
		sorting: true
	},
	{
		title: 'DURATION LEFT',
		id: 'durationLeft'
	},
	{
		title: '',
		id: 'action'
	}
];

export const kInventoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'merchant':
			return '20%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'rate':
			return '12.5%';
		case 'vcpu':
			return '7.5%';
		case 'memory':
			return '7.5%';
		case 'balance':
			return '12.5%';
		case 'durationLeft':
			return '15%';
		case 'action':
			return '5%';
		default:
			return '5%';
	}
};

export const kOysterPaymentHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'DATE',
		id: 'date'
	},
	{
		title: 'AMOUNT',
		id: 'amount'
	},
	{
		title: 'TX HASH',
		id: 'txHash'
	}
];

export const kOysterHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'merchant'
	},
	{
		title: 'INSTANCE',
		id: 'instance'
	},
	{
		title: 'REGION',
		id: 'region'
	},
	{
		title: 'AMOUNT PAID',
		id: 'totalDeposit',
		sorting: true
	},
	{
		title: 'AMOUNT USED',
		id: 'amountUsed',
		sorting: true
	},
	{
		title: 'REFUND',
		id: 'refund',
		sorting: true
	},
	{
		title: 'DURATION RUN',
		id: 'duration'
	},
	{
		title: 'STATUS',
		id: 'status'
	},
	{
		title: '',
		id: 'action'
	}
];

export const kHistoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'merchant':
			return '20%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'totalDeposit':
			return '10%';
		case 'amountUsed':
			return '10%';
		case 'refund':
			return '10%';
		case 'duration':
			return '10%';
		case 'status':
			return '12.5%';
		case 'action':
			return '7.5%';
		default:
			return '0%';
	}
};

export const kOysterDocLink = 'https://docs.marlin.org/docs/User%20Guides/Oyster/';
export const kOysterSupportLink = 'https://docs.marlin.org/docs/category/tutorials';
