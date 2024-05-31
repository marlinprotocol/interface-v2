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
	name: 'N/A'
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
	'newRateScaled',
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
		centered: true,
		tooltipText: 'Instance type used for the job'
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true,
		centered: true,
		tooltipText: 'Region in which the enclave is deployed.'
	},
	{
		title: 'STARTED',
		id: 'createdAt',
		sorting: true,
		centered: true,
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
		centered: true,
		tooltipText: 'Amount earned so far by this job. You can claim this amount at any time.'
	},
	{
		title: 'STATUS',
		id: 'status',
		centered: true,
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
		sorting: true,
		tooltipText: 'Address of user who created the job'
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true,
		centered: true,
		tooltipText: 'Instance type used for the job'
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true,
		centered: true,
		tooltipText: 'Region in which the enclave is deployed.'
	},
	{
		title: 'STARTED',
		id: 'createdAt',
		sorting: true,
		centered: true,
		tooltipText: 'Time when the job was started'
	},
	{
		title: 'ENDED',
		id: 'createdAt',
		sorting: true,
		centered: true,
		tooltipText: 'Time when the job was ended'
	},
	{
		title: 'DURATION RUN',
		id: 'durationRun',
		sorting: true,
		centered: true,
		tooltipText: 'Duration for which the job has run so far'
	},
	{
		title: 'CLAIMED',
		id: 'amountToBeSettled',
		sorting: true,
		centered: true,
		tooltipText: 'Amount claimed'
	}
];

// make sure the id matches the id in Data Model
export const OYSTER_INVENTORY_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'NAME',
		id: 'jobName',
		tooltipText: 'Name of the job'
	},
	{
		title: 'IP ADDRESS',
		id: 'ip',
		sorting: true,
		centered: true,
		tooltipText: 'IP address of the deployed instance'
	},
	{
		title: 'BALANCE',
		id: 'balance',
		sorting: true,
		centered: true,
		tooltipText: 'Amount left in the job'
	},
	{
		title: 'DURATION LEFT',
		id: 'durationLeft',
		sorting: true,
		centered: true,
		tooltipText: 'Duration left for the job'
	},
	{
		title: '',
		centered: true,
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
		title: 'NAME',
		id: 'jobName'
	},
	{
		title: 'AMOUNT USED',
		id: 'amountUsed',
		sorting: true,
		centered: true
	},
	{
		title: 'REFUND',
		id: 'refund',
		sorting: true,
		centered: true
	},
	{
		title: 'DURATION RUN',
		id: 'durationRun',
		centered: true,
		sorting: true
	},
	{
		title: 'STATUS',
		id: 'status',
		centered: true,
		sorting: true
	},
	{
		title: '',
		centered: true,
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
