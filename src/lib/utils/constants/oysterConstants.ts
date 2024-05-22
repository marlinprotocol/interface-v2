import { SECONDS_IN_DAY } from '$lib/utils/constants/constants';
import type { TableModel } from '$lib/types/componentTypes';
import type { OysterDurationUnitList, OysterJobMetadata } from '$lib/types/oysterComponentType';
import type { TokenMetadata } from '$lib/types/environmentTypes';

export const OYSTER_URL_ENDPOINTS = {
	instances_using_cp_url: 'operators/spec/cp/',
	instances_using_operator_address: 'operators/spec/',
	provider_names_url: 'operators/names',
	provider_instances_url: 'operators/spec/',
	job_status_url: 'operators/jobs/',
	job_refresh_url: 'operators/jobs/refresh/'
};

export const OYSTER_MARLIN_CREDIT_METADATA: Omit<TokenMetadata, 'address'> = {
	symbol: '$',
	precision: 6,
	decimal: 6,
	currency: 'OYSTER_CREDIT'
};

export const OYSTER_CAUTION_DURATION = SECONDS_IN_DAY;
export const OYSTER_WARNING_DURATION = SECONDS_IN_DAY * 3; // 3 days

// fallback metadata for when job metadata is not available or cannot be parsed
export const DEFAULT_JOB_METADATA: OysterJobMetadata = {
	url: 'N/A',
	instance: 'N/A',
	region: 'N/A',
	vcpu: 0,
	memory: 0,
	arch: 'N/A',
	inputs: 'N/A'
};

// explicit keys in the oyster inventory data model which are of type bigint
export const OYSTER_INVENTORY_DATA_MODEL_BIG_INT_KEYS = [
	'totalDeposit',
	'amountUsed',
	'balance',
	'refund',
	'amountToBeSettled',
	'rate',
	'amount',
	'newRate',
	'rateScaled'
];

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
		id: 'owner',
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
		centered: true,
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
		id: 'owner',
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
	}
];

// make sure the id matches the id in Data Model
export const OYSTER_HISTORY_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'provider'
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
		title: 'Operator',
		id: 'provider',
		tooltipText: 'Address of oyster operator'
	},
	{
		title: 'Instance',
		id: 'instance',
		centered: true,
		sorting: true,
		tooltipText: 'Instance type used for the job'
	},
	{
		title: 'Region',
		id: 'region',
		sorting: true,
		centered: true,
		tooltipText: 'Region in which the enclave is deployed.'
	},
	{
		title: 'vCPU',
		id: 'vcpu',
		sorting: true,
		centered: true,
		tooltipText: 'Number of vCPUs in the instance'
	},
	{
		title: 'Memory',
		id: 'memory',
		sorting: true,
		centered: true,
		tooltipText: 'Memory allocated to the instance'
	},
	{
		title: 'Arch',
		id: 'arch',
		centered: true,
		tooltipText: 'Architecture of the instance'
	},
	{
		title: 'Rate',
		id: 'rateScaled',
		sorting: true,
		centered: true,
		tooltipText: 'Rate that the operator charges for each hour of usage.'
	},
	{
		title: '',
		centered: true,
		id: 'action'
	}
];

export const OYSTER_DURATION_UNITS_LIST: OysterDurationUnitList[] = [
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

export const DEFAULT_OYSTER_DURATION_UNIT = 'Days';

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

export const DEFAULT_BANDWIDTH_UNIT = 'KB/s';
