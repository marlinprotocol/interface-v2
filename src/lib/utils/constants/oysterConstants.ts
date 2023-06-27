import { DEFAULT_CURRENCY_DECIMALS, SECONDS_IN_DAY } from '$lib/utils/constants/constants';

import { BigNumber } from 'ethers';
import type { TableModel } from '$lib/types/componentTypes';

export const OYSTER_CAUTION_DURATION = SECONDS_IN_DAY;
export const OYSTER_WARNING_DURATION = SECONDS_IN_DAY * 3; // 3 days

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

export const OYSTER_MARKET_ABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'address', name: 'previousAdmin', type: 'address' },
			{ indexed: false, internalType: 'address', name: 'newAdmin', type: 'address' }
		],
		name: 'AdminChanged',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'address', name: 'beacon', type: 'address' }],
		name: 'BeaconUpgraded',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }],
		name: 'Initialized',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' }],
		name: 'JobClosed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'JobDeposited',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' },
			{ indexed: false, internalType: 'string', name: 'metadata', type: 'string' },
			{ indexed: true, internalType: 'address', name: 'owner', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'provider', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'rate', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'balance', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
		],
		name: 'JobOpened',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' }],
		name: 'JobReviseRateCancelled',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' },
			{ indexed: false, internalType: 'uint256', name: 'newRate', type: 'uint256' }
		],
		name: 'JobReviseRateFinalized',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' },
			{ indexed: false, internalType: 'uint256', name: 'newRate', type: 'uint256' }
		],
		name: 'JobReviseRateInitiated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
		],
		name: 'JobSettled',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'job', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'to', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'JobWithdrew',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'selector', type: 'bytes32' },
			{ indexed: true, internalType: 'bytes32', name: 'key', type: 'bytes32' },
			{ indexed: false, internalType: 'uint256', name: 'iValue', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'unlockTime', type: 'uint256' }
		],
		name: 'LockCreated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'selector', type: 'bytes32' },
			{ indexed: true, internalType: 'bytes32', name: 'key', type: 'bytes32' },
			{ indexed: false, internalType: 'uint256', name: 'iValue', type: 'uint256' }
		],
		name: 'LockDeleted',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'selector', type: 'bytes32' },
			{ indexed: false, internalType: 'uint256', name: 'prevLockTime', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'updatedLockTime', type: 'uint256' }
		],
		name: 'LockWaitTimeUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'provider', type: 'address' },
			{ indexed: false, internalType: 'string', name: 'cp', type: 'string' }
		],
		name: 'ProviderAdded',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'address', name: 'provider', type: 'address' }],
		name: 'ProviderRemoved',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'provider', type: 'address' },
			{ indexed: false, internalType: 'string', name: 'newCp', type: 'string' }
		],
		name: 'ProviderUpdatedWithCp',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
			{ indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' }
		],
		name: 'RoleAdminChanged',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'account', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'sender', type: 'address' }
		],
		name: 'RoleGranted',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'account', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'sender', type: 'address' }
		],
		name: 'RoleRevoked',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'contract IERC20', name: 'oldToken', type: 'address' },
			{ indexed: true, internalType: 'contract IERC20', name: 'newToken', type: 'address' }
		],
		name: 'TokenUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'address', name: 'implementation', type: 'address' }],
		name: 'Upgraded',
		type: 'event'
	},
	{
		inputs: [],
		name: 'DEFAULT_ADMIN_ROLE',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'RATE_LOCK_SELECTOR',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
		name: 'getRoleAdmin',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'uint256', name: 'index', type: 'uint256' }
		],
		name: 'getRoleMember',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
		name: 'getRoleMemberCount',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'account', type: 'address' }
		],
		name: 'grantRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'account', type: 'address' }
		],
		name: 'hasRole',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: '_token', type: 'address' },
			{ internalType: 'bytes32[]', name: '_selectors', type: 'bytes32[]' },
			{ internalType: 'uint256[]', name: '_lockWaitTimes', type: 'uint256[]' }
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '_job', type: 'bytes32' }],
		name: 'jobClose',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: '_job', type: 'bytes32' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' }
		],
		name: 'jobDeposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'string', name: '_metadata', type: 'string' },
			{ internalType: 'address', name: '_provider', type: 'address' },
			{ internalType: 'uint256', name: '_rate', type: 'uint256' },
			{ internalType: 'uint256', name: '_balance', type: 'uint256' }
		],
		name: 'jobOpen',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '_job', type: 'bytes32' }],
		name: 'jobReviseRateCancel',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '_job', type: 'bytes32' }],
		name: 'jobReviseRateFinalize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: '_job', type: 'bytes32' },
			{ internalType: 'uint256', name: '_newRate', type: 'uint256' }
		],
		name: 'jobReviseRateInitiate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '_job', type: 'bytes32' }],
		name: 'jobSettle',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: '_job', type: 'bytes32' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' }
		],
		name: 'jobWithdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		name: 'jobs',
		outputs: [
			{ internalType: 'string', name: 'metadata', type: 'string' },
			{ internalType: 'address', name: 'owner', type: 'address' },
			{ internalType: 'address', name: 'provider', type: 'address' },
			{ internalType: 'uint256', name: 'rate', type: 'uint256' },
			{ internalType: 'uint256', name: 'balance', type: 'uint256' },
			{ internalType: 'uint256', name: 'lastSettled', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		name: 'lockWaitTime',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		name: 'locks',
		outputs: [
			{ internalType: 'uint256', name: 'unlockTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'iValue', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'string', name: '_cp', type: 'string' }],
		name: 'providerAdd',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'providerRemove',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'string', name: '_cp', type: 'string' }],
		name: 'providerUpdateWithCp',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'proxiableUUID',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'account', type: 'address' }
		],
		name: 'renounceRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'account', type: 'address' }
		],
		name: 'revokeRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
		name: 'supportsInterface',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'newImplementation', type: 'address' }],
		name: 'upgradeTo',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'newImplementation', type: 'address' },
			{ internalType: 'bytes', name: 'data', type: 'bytes' }
		],
		name: 'upgradeToAndCall',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	}
];
