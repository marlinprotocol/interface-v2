import { BigNumber } from 'ethers';
import type { TableModel } from '$lib/types/componentTypes';

//
export const kOysterOwnerInventory = '/oyster/inventory';
export const kOysterOwnerHistory = '/oyster/history';

//operator pages
export const kOperatorJobs = '/oyster/operator/jobs';
export const kOperatorHistory = '/oyster/operator/history';

// while developing locally change currency to POND
export const kOysterRateMetaData = {
	currency: 'POND',
	symbol: '$',
	decimal: 6,
	precision: 6,
	rateUnit: 'hour',
	rateCPUrlUnitInSeconds: 1, // 1 hour
	rateReviseWaitingTime: 5 * 60 // 5 minutes
};

export const oysterTableItemsPerPage = 10;

export const RATE_SCALING_FACTOR = BigNumber.from(10).pow(12);

// make sure the id matches the id in Data Model
export const kInstancesTableHeader: TableModel['header'][] = [
	{
		title: 'Instance Type',
		id: 'type'
	},
	{
		title: 'Region',
		id: 'region',
		tooltipText: 'Region in which enclave is to be deployed.'
	},
	{
		title: 'Price',
		id: 'price',
		tooltipText: 'Price per hour to run the enclave'
	}
];

// make sure the id matches the id in Data Model
export const kOysterMerchantJobTableHeader: TableModel['header'][] = [
	{
		title: 'USER',
		id: 'provider',
		sorting: true,
		tooltipText: 'Address of user who created the job'
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true,
		tooltipText: 'Instance type used for the job'
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true,
		tooltipText: 'Region in which the enclave is deployed.'
	},
	{
		title: 'STARTED',
		id: 'createdAt',
		sorting: true,
		tooltipText: 'Time when the job was started'
	},
	{
		title: 'DURATION RUN',
		id: 'durationRun',
		sorting: true,
		tooltipText: 'Duration for which the job has run so far'
	},
	{
		title: 'ACCRUED',
		id: 'amountToBeSettled',
		sorting: true,
		tooltipText: 'Amount earned so far by this job. You can claim this amount at any time.'
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
		case 'provider':
			return '17.5%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'createdAt':
			return '12.5%';
		case 'durationRun':
			return '12.5%';
		case 'amountToBeSettled':
			return '12.5%';
		case 'status':
			return '12.5%';
		default:
			return '12.5%';
	}
};

// make sure the id matches the id in Data Model
export const kOysterOperatorHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'USER',
		id: 'provider',
		sorting: true
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true
	},
	{
		title: 'STARTED',
		id: 'createdAt',
		sorting: true
	},
	{
		title: 'ENDED',
		id: 'createdAt',
		sorting: true
	},
	{
		title: 'DURATION RUN',
		id: 'durationRun',
		sorting: true
	},
	{
		title: 'CLAIMED',
		id: 'amountToBeSettled',
		sorting: true
	},
	{
		title: '',
		id: 'action'
	}
];

export const kOperatorHistoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'provider':
			return '17.5%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'createdAt':
			return '12.5%';
		case 'durationRun':
			return '12.5%';
		case 'amountToBeSettled':
			return '12.5%';
		default:
			return '12.5%';
	}
};

// make sure the id matches the id in Data Model
export const kOysterInventoryTableHeader: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'provider',
		tooltipText: 'Address of oyster operator'
	},
	{
		title: 'IP ADDRESS',
		id: 'ip',
		sorting: true,
		tooltipText: 'Ip address of the deployed instance'
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true,
		tooltipText: 'Instance type used for the job'
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true,
		tooltipText: 'Region in which the enclave is deployed.'
	},
	{
		title: 'HOURLY RATE',
		id: 'rate',
		sorting: true,
		tooltipText: 'Rate that the operator charges for each hour of usage.'
	},
	{
		title: 'BALANCE',
		id: 'balance',
		sorting: true,
		tooltipText: 'Amount left in the job'
	},
	{
		title: 'DURATION LEFT',
		id: 'durationLeft',
		sorting: true,
		tooltipText: 'Duration left for the job'
	},
	{
		title: '',
		id: 'action'
	}
];

export const kInventoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'provider':
			return '17.5%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'rate':
			return '10%';
		case 'vcpu':
			return '10%';
		case 'memory':
			return '12.5%';
		case 'balance':
			return '10%';
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

// make sure the id matches the id in Data Model
export const kOysterHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'provider'
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true
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
		id: 'durationRun',
		sorting: true
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

export const kHistoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'provider':
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
		case 'durationRun':
			return '10%';
		case 'status':
			return '12.5%';
		case 'action':
			return '7.5%';
		default:
			return '0%';
	}
};

// make sure the id matches the id in Data Model
export const kOysterMarketplaceTableHeader: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'provider',
		tooltipText: 'Address of oyster operator'
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true,
		tooltipText: 'Instance type used for the job'
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true,
		tooltipText: 'Region in which the enclave is deployed.'
	},
	{
		title: 'HOURLY RATE',
		id: 'rate',
		sorting: true,
		tooltipText: 'Rate that the operator charges for each hour of usage.'
	},
	{
		title: 'vCPU',
		id: 'vcpu',
		sorting: true,
		tooltipText: 'Number of vCPUs in the instance'
	},
	{
		title: 'MEMORY',
		id: 'memory',
		sorting: true,
		tooltipText: 'Memory allocated to the instance'
	},
	{
		title: '',
		id: 'action'
	}
];

export const kOysterDocLink = 'https://docs.marlin.org/docs/User%20Guides/Oyster/';
export const kOysterSupportLink = 'https://discord.gg/xqJfSGY6gR';

export const kDurationUnitsList = [
	{
		label: 'Minutes',
		id: 'minute',
		value: 60
	},
	{
		label: 'Hours',
		id: 'hour',
		value: 3600
	},
	{
		label: 'Days',
		id: 'day',
		value: 86400
	}
	// {
	// 	label: 'Weeks',
	// 	id: 'week',
	// 	value: 86400 * 7
	// },
	// {
	// 	label: 'Months',
	// 	id: 'month',
	// 	value: 86400 * 30
	// }
];

export const kBandwidthUnitsList = [
	{
		label: 'KB/s',
		id: 'kbps',
		value: 1024 * 1024
	},
	{
		label: 'MB/s',
		id: 'mbps',
		value: 1024
	},
	{
		label: 'GB/s',
		id: 'gbps',
		value: 1
	}
];
export const getDurationInSecondsForUnit = (durationUnit: string) => {
	return kDurationUnitsList.find((unit) => unit.label === durationUnit)?.value ?? 1;
};
