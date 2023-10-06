import { SECONDS_IN_DAY } from '$lib/utils/constants/constants';
import type { TableModel } from '$lib/types/componentTypes';

export const OYSTER_URL_ENDPOINTS = {
	instances_using_cp_url: 'operators/spec/cp/',
	instances_using_operator_address: 'operators/spec/',
	provider_names_url: 'operators/names',
	provider_instances_url: 'operators/spec/',
	job_status_url: 'operators/jobs/',
	job_refresh_url: 'operators/jobs/refresh/'
};

export const OYSTER_CAUTION_DURATION = SECONDS_IN_DAY;
export const OYSTER_WARNING_DURATION = SECONDS_IN_DAY * 3; // 3 days

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
		title: 'RATE',
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
		title: 'ARCH',
		id: 'arch',
		sorting: true,
		tooltipText: 'Architecture of the instance'
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
