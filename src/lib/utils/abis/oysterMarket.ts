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
			{ internalType: 'bytes32', name: '_job', type: 'bytes32' },
			{ internalType: 'string', name: '_metadata', type: 'string' }
		],
		name: 'jobMetadataUpdate',
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
