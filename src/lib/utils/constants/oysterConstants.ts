import { BigNumber } from 'ethers';
import { DEFAULT_CURRENCY_DECIMALS } from '$lib/utils/constants/constants';
import type { TableModel } from '$lib/types/componentTypes';

// while developing locally change currency to POND
export const OYSTER_RATE_METADATA = {
	currency: 'POND',
	symbol: '$',
	decimal: 6,
	precision: 6,
	rateUnit: 'hour',
	rateCPUrlUnitInSeconds: 1, // 1 hour
	rateReviseWaitingTime: 5 * 60 // 5 minutes
};

// scaling for rates in order to maintain precision while calculating cost
export const OYSTER_RATE_SCALING_FACTOR = BigNumber.from(10).pow(
	DEFAULT_CURRENCY_DECIMALS - OYSTER_RATE_METADATA.decimal
);

// make sure the id matches the id in Data Model
export const OYSTER_INSTANCES_TABLE_HEADER: TableModel['header'][] = [
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
export const OYSTER_MERCHANT_JOB_TABLE_HEADER: TableModel['header'][] = [
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

// make sure the id matches the id in Data Model
export const OYSTER_OPERATOR_HISTORY_TABLE_HEADER: TableModel['header'][] = [
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

// make sure the id matches the id in Data Model
export const OYSTER_INVENTORY_TABLE_HEADER: TableModel['header'][] = [
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

// make sure the id matches the id in Data Model
export const OYSTER_PAYMENT_HISTORY_TABLE_HEADER: TableModel['header'][] = [
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
export const OYSTER_HISTORY_TABLE_HEADER: TableModel['header'][] = [
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

// make sure the id matches the id in Data Model
export const OYSTER_MARKETPLACE_TABLE_HEADER: TableModel['header'][] = [
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

export const OYSTER_DURATION_UNITS_LIST = [
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
];

export const OYSTER_BANDWIDTH_UNITS_LIST = [
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
