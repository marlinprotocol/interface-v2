export const OYSTER_CREDIT_ABI = [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{ inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
	{
		inputs: [
			{ internalType: 'address', name: 'account', type: 'address' },
			{ internalType: 'bytes32', name: 'neededRole', type: 'bytes32' }
		],
		name: 'AccessControlUnauthorizedAccount',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
		name: 'AddressEmptyCode',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
		name: 'AddressInsufficientBalance',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
		name: 'AlreadyWhitelisted',
		type: 'error'
	},
	{ inputs: [], name: 'AmountExceedsBudget', type: 'error' },
	{
		inputs: [{ internalType: 'address', name: 'implementation', type: 'address' }],
		name: 'ERC1967InvalidImplementation',
		type: 'error'
	},
	{ inputs: [], name: 'ERC1967NonPayable', type: 'error' },
	{ inputs: [], name: 'FailedInnerCall', type: 'error' },
	{ inputs: [], name: 'InvalidInitialization', type: 'error' },
	{ inputs: [], name: 'NotInitializing', type: 'error' },
	{
		inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
		name: 'NotWhitelisted',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
		name: 'SafeERC20FailedOperation',
		type: 'error'
	},
	{ inputs: [], name: 'UUPSUnauthorizedCallContext', type: 'error' },
	{
		inputs: [{ internalType: 'bytes32', name: 'slot', type: 'bytes32' }],
		name: 'UUPSUnsupportedProxiableUUID',
		type: 'error'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'decreasedAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'newBudget', type: 'uint256' }
		],
		name: 'BudgetDecreased',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'increasedAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'newBudget', type: 'uint256' }
		],
		name: 'BudgetIncreased',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint64', name: 'version', type: 'uint64' }],
		name: 'Initialized',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'contract IMarketV1', name: 'oldMarket', type: 'address' },
			{ indexed: true, internalType: 'contract IMarketV1', name: 'newMarket', type: 'address' }
		],
		name: 'MarketUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'address', name: 'user', type: 'address' }],
		name: 'RemovedFromWhitelist',
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
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'jobId', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint8', name: 'operationType', type: 'uint8' },
			{ indexed: false, internalType: 'uint256', name: 'decreaseAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'jobCredits', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'userBudget', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
		],
		name: 'UserBudgetDecreased',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'jobId', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint8', name: 'operationType', type: 'uint8' },
			{ indexed: false, internalType: 'uint256', name: 'increaseAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'jobCredits', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'userBudget', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'timestamp', type: 'uint256' }
		],
		name: 'UserBudgetIncreased',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'WhitelistedWithBudget',
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
		name: 'UPGRADE_INTERFACE_VERSION',
		outputs: [{ internalType: 'string', name: '', type: 'string' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'WHITELIST_ROLE',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'contract IMarketV1', name: '_market', type: 'address' },
			{ internalType: 'contract IERC20', name: '_token', type: 'address' },
			{ internalType: 'address', name: '_admin', type: 'address' }
		],
		name: '__CreditManager_init',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: '_user', type: 'address' },
			{ internalType: 'uint256', name: '_budget', type: 'uint256' }
		],
		name: 'addWhitelistWithBudget',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'budgets',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: '_user', type: 'address' },
			{ internalType: 'uint256', name: '_amountToSubtract', type: 'uint256' }
		],
		name: 'decreaseBudget',
		outputs: [],
		stateMutability: 'nonpayable',
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
			{ internalType: 'address', name: '_user', type: 'address' },
			{ internalType: 'uint256', name: '_amountToAdd', type: 'uint256' }
		],
		name: 'increaseBudget',
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
		inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		name: 'jobToUser',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
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
		inputs: [],
		name: 'market',
		outputs: [{ internalType: 'contract IMarketV1', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		name: 'maxCreditsForJob',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
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
		inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
		name: 'removeWhitelistWithBudget',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'callerConfirmation', type: 'address' }
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
		inputs: [],
		name: 'token',
		outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'contract IMarketV1', name: '_market', type: 'address' }],
		name: 'updateMarket',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'contract IERC20', name: '_token', type: 'address' }],
		name: 'updateToken',
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
	},
	{
		inputs: [
			{ internalType: 'address', name: '_to', type: 'address' },
			{ internalType: 'uint256', name: '_amount', type: 'uint256' }
		],
		name: 'withdraw',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];
