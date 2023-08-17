export const STAKE_MANAGER_ABI = [
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
				indexed: true,
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'iValue',
				type: 'uint256'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'unlockTime',
				type: 'uint256'
			}
		],
		name: 'LockCreated',
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
				indexed: true,
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'iValue',
				type: 'uint256'
			}
		],
		name: 'LockDeleted',
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
		name: 'LockWaitTimeUpdated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'from',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'to',
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
				internalType: 'bytes32',
				name: 'stashId',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'creator',
				type: 'address'
			}
		],
		name: 'StashCreated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'stashId',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'delegatedCluster',
				type: 'address'
			}
		],
		name: 'StashDelegated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'stashId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'bytes32[]',
				name: 'tokenIds',
				type: 'bytes32[]'
			},
			{
				indexed: false,
				internalType: 'uint256[]',
				name: 'amounts',
				type: 'uint256[]'
			}
		],
		name: 'StashDeposit',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'fromStashId',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'toStashId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'bytes32[]',
				name: 'tokenIds',
				type: 'bytes32[]'
			},
			{
				indexed: false,
				internalType: 'uint256[]',
				name: 'amounts',
				type: 'uint256[]'
			}
		],
		name: 'StashMove',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'stashId',
				type: 'bytes32'
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'delegatedCluster',
				type: 'address'
			}
		],
		name: 'StashUndelegated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'stashId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'bytes32[]',
				name: 'tokenIds',
				type: 'bytes32[]'
			},
			{
				indexed: false,
				internalType: 'uint256[]',
				name: 'amounts',
				type: 'uint256[]'
			}
		],
		name: 'StashWithdraw',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'tokenId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'tokenAddress',
				type: 'address'
			}
		],
		name: 'TokenAdded',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'bytes32',
				name: 'tokenId',
				type: 'bytes32'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'oldTokenAddress',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'address',
				name: 'newTokenAddress',
				type: 'address'
			}
		],
		name: 'TokenUpdated',
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
		name: 'ACTIVE_TOKEN_ROLE',
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
		inputs: [],
		name: 'DELEGATABLE_TOKEN_ROLE',
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
		inputs: [],
		name: 'REDELEGATION_LOCK_SELECTOR',
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
		inputs: [],
		name: 'UNDELEGATION_LOCK_SELECTOR',
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
				name: '_stashId',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32[]',
				name: '_tokens',
				type: 'bytes32[]'
			},
			{
				internalType: 'uint256[]',
				name: '_amounts',
				type: 'uint256[]'
			}
		],
		name: 'addToStash',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_tokenId',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: '_address',
				type: 'address'
			}
		],
		name: 'addToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_stashId',
				type: 'bytes32'
			}
		],
		name: 'cancelRedelegation',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_stashId',
				type: 'bytes32'
			}
		],
		name: 'cancelUndelegation',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32[]',
				name: '_tokens',
				type: 'bytes32[]'
			},
			{
				internalType: 'uint256[]',
				name: '_amounts',
				type: 'uint256[]'
			}
		],
		name: 'createStash',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32[]',
				name: '_tokens',
				type: 'bytes32[]'
			},
			{
				internalType: 'uint256[]',
				name: '_amounts',
				type: 'uint256[]'
			},
			{
				internalType: 'address',
				name: '_delegatedCluster',
				type: 'address'
			}
		],
		name: 'createStashAndDelegate',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_stashId',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: '_delegatedCluster',
				type: 'address'
			}
		],
		name: 'delegateStash',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_tokenId',
				type: 'bytes32'
			}
		],
		name: 'disableToken',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_tokenId',
				type: 'bytes32'
			}
		],
		name: 'enableToken',
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
				internalType: 'bytes32[]',
				name: '_tokenIds',
				type: 'bytes32[]'
			},
			{
				internalType: 'address[]',
				name: '_tokenAddresses',
				type: 'address[]'
			},
			{
				internalType: 'bool[]',
				name: '_delegatable',
				type: 'bool[]'
			},
			{
				internalType: 'address',
				name: '_rewardDelegatorsAddress',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_redelegationWaitTime',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_undelegationWaitTime',
				type: 'uint256'
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
		inputs: [
			{
				internalType: 'bytes32',
				name: '_stashId1',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32',
				name: '_stashId2',
				type: 'bytes32'
			}
		],
		name: 'mergeStash',
		outputs: [],
		stateMutability: 'nonpayable',
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
				name: '_stashId',
				type: 'bytes32'
			}
		],
		name: 'redelegateStash',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32[]',
				name: '_stashIds',
				type: 'bytes32[]'
			}
		],
		name: 'redelegateStashes',
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
				internalType: 'bytes32',
				name: '_stashId',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: '_newCluster',
				type: 'address'
			}
		],
		name: 'requestStashRedelegation',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32[]',
				name: '_stashIds',
				type: 'bytes32[]'
			},
			{
				internalType: 'address[]',
				name: '_newClusters',
				type: 'address[]'
			}
		],
		name: 'requestStashRedelegations',
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
				internalType: 'bytes32',
				name: '_stashId',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32[]',
				name: '_tokens',
				type: 'bytes32[]'
			},
			{
				internalType: 'uint256[]',
				name: '_amounts',
				type: 'uint256[]'
			}
		],
		name: 'splitStash',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'stashIndex',
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
		name: 'stashes',
		outputs: [
			{
				internalType: 'address',
				name: 'staker',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'delegatedCluster',
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
				name: '_stashId',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32',
				name: '_tokenId',
				type: 'bytes32'
			}
		],
		name: 'stashes__amounts',
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
		inputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32'
			}
		],
		name: 'tokenIndex',
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
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		name: 'tokenList',
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
				name: '',
				type: 'bytes32'
			}
		],
		name: 'tokens',
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
				name: '_stashId',
				type: 'bytes32'
			}
		],
		name: 'undelegateStash',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32[]',
				name: '_stashIds',
				type: 'bytes32[]'
			}
		],
		name: 'undelegateStashes',
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
				name: '_updatedRewardDelegator',
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
				internalType: 'bytes32',
				name: '_tokenId',
				type: 'bytes32'
			},
			{
				internalType: 'address',
				name: '_address',
				type: 'address'
			}
		],
		name: 'updateToken',
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
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_stashId',
				type: 'bytes32'
			}
		],
		name: 'withdrawStash',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '_stashId',
				type: 'bytes32'
			},
			{
				internalType: 'bytes32[]',
				name: '_tokens',
				type: 'bytes32[]'
			},
			{
				internalType: 'uint256[]',
				name: '_amounts',
				type: 'uint256[]'
			}
		],
		name: 'withdrawStash',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
];