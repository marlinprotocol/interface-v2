export const CLUSTER_REGISTRY_ABI = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'previousAdmin',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'newAdmin',
				type: 'address'
			}
		],
		name: 'AdminChanged',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'beacon',
				type: 'address'
			}
		],
		name: 'BeaconUpgraded',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'clientKey',
				type: 'address'
			}
		],
		name: 'ClientKeyUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'networkId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'commission',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'rewardAddress',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'clientKey',
				type: 'address'
			}
		],
		name: 'ClusterRegistered',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'effectiveTime',
				type: 'uint256'
			}
		],
		name: 'ClusterUnregisterRequested',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'updatedAt',
				type: 'uint256'
			}
		],
		name: 'ClusterUnregistered',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'commissionAfterUpdate',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'effectiveTime',
				type: 'uint256'
			}
		],
		name: 'CommissionUpdateRequested',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'updatedCommission',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'updatedAt',
				type: 'uint256'
			}
		],
		name: 'CommissionUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'uint8',
				name: 'version',
				type: 'uint8'
			}
		],
		name: 'Initialized',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'selector',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'prevLockTime',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'updatedLockTime',
				type: 'uint256'
			}
		],
		name: 'LockTimeUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'networkId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'effectiveTime',
				type: 'uint256'
			}
		],
		name: 'NetworkSwitchRequested',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'networkId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'updatedAt',
				type: 'uint256'
			}
		],
		name: 'NetworkSwitched',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'cluster',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'updatedRewardAddress',
				type: 'address'
			}
		],
		name: 'RewardAddressUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'rewardDelegators',
				type: 'address'
			}
		],
		name: 'RewardDelegatorsUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'previousAdminRole',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'newAdminRole',
				type: 'bytes32'
			}
		],
		name: 'RoleAdminChanged',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'sender',
				type: 'address'
			}
		],
		name: 'RoleGranted',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'sender',
				type: 'address'
			}
		],
		name: 'RoleRevoked',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'implementation',
				type: 'address'
			}
		],
		name: 'Upgraded',
		type: 'event'
	},
	{
		inputs: [],
		name: 'DEFAULT_ADMIN_ROLE',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'clientKeys',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_cluster',
				type: 'address'
			}
		],
		name: 'getClientKey',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_cluster',
				type: 'address'
			}
		],
		name: 'getCluster',
		outputs: [
			{
				internalType: 'uint256',
				name: 'commission',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'rewardAddress',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'clientKey',
				type: 'address'
			},
			{
				internalType: 'bytes32',
				name: 'networkId',
				type: 'bytes32'
			},
			{
				internalType: 'bool',
				name: 'isValidCluster',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_cluster',
				type: 'address'
			}
		],
		name: 'getCommission',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_cluster',
				type: 'address'
			}
		],
		name: 'getNetwork',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_cluster',
				type: 'address'
			}
		],
		name: 'getRewardAddress',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_cluster',
				type: 'address'
			}
		],
		name: 'getRewardInfo',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			}
		],
		name: 'getRoleAdmin',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256'
			}
		],
		name: 'getRoleMember',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			}
		],
		name: 'getRoleMemberCount',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'grantRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'hasRole',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[3]',
				name: '_lockWaitTimes',
				type: 'uint256[3]'
			},
			{
				internalType: 'address',
				name: '_rewardDelegators',
				type: 'address'
			}
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_cluster',
				type: 'address'
			}
		],
		name: 'isClusterValid',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		name: 'lockWaitTime',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		name: 'locks',
		outputs: [
			{
				internalType: 'uint256',
				name: 'unlockTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'iValue',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'proxiableUUID',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_networkId',
				type: 'bytes32'
			},
			{
				internalType: 'uint256',
				name: '_commission',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: '_rewardAddress',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_clientKey',
				type: 'address'
			}
		],
		name: 'register',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'renounceRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_commission',
				type: 'uint256'
			}
		],
		name: 'requestCommissionUpdate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_networkId',
				type: 'bytes32'
			}
		],
		name: 'requestNetworkSwitch',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'requestUnregister',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'role',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: 'account',
				type: 'address'
			}
		],
		name: 'revokeRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'rewardDelegators',
		outputs: [
			{
				internalType: 'contract IRewardDelegators',
				name: '',
				type: 'address'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes4',
				name: 'interfaceId',
				type: 'bytes4'
			}
		],
		name: 'supportsInterface',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'switchNetwork',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'unregister',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_clientKey',
				type: 'address'
			}
		],
		name: 'updateClientKey',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_commission',
				type: 'uint256'
			},
			{
				internalType: 'bytes32',
				name: '_networkId',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: '_rewardAddress',
				type: 'address'
			},
			{
				internalType: 'address',
				name: '_clientKey',
				type: 'address'
			}
		],
		name: 'updateCluster',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'updateCommission',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_selector',
				type: 'bytes32'
			},
			{
				internalType: 'uint256',
				name: '_updatedWaitTime',
				type: 'uint256'
			}
		],
		name: 'updateLockWaitTime',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_rewardAddress',
				type: 'address'
			}
		],
		name: 'updateRewardAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_updatedRewardDelegators',
				type: 'address'
			}
		],
		name: 'updateRewardDelegators',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newImplementation',
				type: 'address'
			}
		],
		name: 'upgradeTo',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newImplementation',
				type: 'address'
			},
			{
				internalType: 'bytes',
				name: 'data',
				type: 'bytes'
			}
		],
		name: 'upgradeToAndCall',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	}
];