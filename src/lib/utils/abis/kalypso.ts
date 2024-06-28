export const KALYPSO_ABI = [
	{
		inputs: [
			{ internalType: 'contract IERC20', name: '_stakingToken', type: 'address' },
			{ internalType: 'contract EntityKeyRegistry', name: '_entityRegistry', type: 'address' }
		],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
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
	{ inputs: [], name: 'AlreadyJoinedMarket', type: 'error' },
	{ inputs: [], name: 'AssignOnlyToIdleGenerators', type: 'error' },
	{ inputs: [], name: 'CannotBeMoreThanDeclaredCompute', type: 'error' },
	{ inputs: [], name: 'CannotBeSlashed', type: 'error' },
	{ inputs: [], name: 'CannotBeZero', type: 'error' },
	{ inputs: [], name: 'CannotLeaveMarketWithActiveRequest', type: 'error' },
	{ inputs: [], name: 'CannotLeaveWithActiveMarket', type: 'error' },
	{ inputs: [], name: 'ECDSAInvalidSignature', type: 'error' },
	{
		inputs: [{ internalType: 'uint256', name: 'length', type: 'uint256' }],
		name: 'ECDSAInvalidSignatureLength',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'bytes32', name: 's', type: 'bytes32' }],
		name: 'ECDSAInvalidSignatureS',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'address', name: 'implementation', type: 'address' }],
		name: 'ERC1967InvalidImplementation',
		type: 'error'
	},
	{ inputs: [], name: 'ERC1967NonPayable', type: 'error' },
	{ inputs: [], name: 'ExceedsAcceptableRange', type: 'error' },
	{ inputs: [], name: 'FailedInnerCall', type: 'error' },
	{ inputs: [], name: 'GeneratorAlreadyExists', type: 'error' },
	{ inputs: [], name: 'IncorrectImageId', type: 'error' },
	{ inputs: [], name: 'InsufficientGeneratorComputeAvailable', type: 'error' },
	{ inputs: [], name: 'InsufficientStakeToLock', type: 'error' },
	{ inputs: [], name: 'InvalidEnclaveKey', type: 'error' },
	{
		inputs: [{ internalType: 'address', name: 'invalidSignerAddress', type: 'address' }],
		name: 'InvalidEnclaveSignature',
		type: 'error'
	},
	{ inputs: [], name: 'InvalidGenerator', type: 'error' },
	{ inputs: [], name: 'InvalidGeneratorStatePerMarket', type: 'error' },
	{ inputs: [], name: 'InvalidInitialization', type: 'error' },
	{ inputs: [], name: 'InvalidMarket', type: 'error' },
	{ inputs: [], name: 'MaxParallelRequestsPerMarketExceeded', type: 'error' },
	{ inputs: [], name: 'NotInitializing', type: 'error' },
	{ inputs: [], name: 'OnlyValidGeneratorsCanRequestExit', type: 'error' },
	{ inputs: [], name: 'OnlyWorkingGenerators', type: 'error' },
	{ inputs: [], name: 'PublicMarketsDontNeedKey', type: 'error' },
	{ inputs: [], name: 'ReduceComputeRequestNotInPlace', type: 'error' },
	{ inputs: [], name: 'ReductionRequestNotValid', type: 'error' },
	{ inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
	{ inputs: [], name: 'RequestAlreadyInPlace', type: 'error' },
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
	{ inputs: [], name: 'UnstakeRequestNotInPlace', type: 'error' },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ indexed: true, internalType: 'address', name: 'signer', type: 'address' }
		],
		name: 'AddIvsKey',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'AddedStake',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'address', name: 'newRewardAddress', type: 'address' }
		],
		name: 'ChangedGeneratorRewardAddress',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'stake', type: 'uint256' }
		],
		name: 'ComputeLockImposed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'stake', type: 'uint256' }
		],
		name: 'ComputeLockReleased',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'compute', type: 'uint256' }
		],
		name: 'DecreaseCompute',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: true, internalType: 'address', name: 'generator', type: 'address' }],
		name: 'DeregisteredGenerator',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'compute', type: 'uint256' }
		],
		name: 'IncreasedCompute',
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
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'computeAllocation', type: 'uint256' }
		],
		name: 'JoinedMarketplace',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' }
		],
		name: 'LeftMarketplace',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'initialCompute', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'initialStake', type: 'uint256' }
		],
		name: 'RegisteredGenerator',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'RemovedStake',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'intendedUtilization', type: 'uint256' }
		],
		name: 'RequestComputeDecrease',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: true, internalType: 'uint256', name: 'marketId', type: 'uint256' }
		],
		name: 'RequestExitMarketplace',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'intendedUtilization', type: 'uint256' }
		],
		name: 'RequestStakeDecrease',
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
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'stake', type: 'uint256' }
		],
		name: 'StakeLockImposed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'generator', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'stake', type: 'uint256' }
		],
		name: 'StakeLockReleased',
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
		name: 'ENTITY_KEY_REGISTRY',
		outputs: [{ internalType: 'contract EntityKeyRegistry', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'PARALLEL_REQUESTS_UPPER_LIMIT',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'PROOF_MARKET_PLACE_ROLE',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'STAKING_TOKEN',
		outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'UNLOCK_WAIT_BLOCKS',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
		inputs: [
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ internalType: 'bytes', name: 'attestationData', type: 'bytes' },
			{ internalType: 'bytes', name: 'enclaveSignature', type: 'bytes' }
		],
		name: 'addIvsKey',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'generatorAddress', type: 'address' },
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ internalType: 'uint256', name: 'stakeToLock', type: 'uint256' }
		],
		name: 'assignGeneratorTask',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'newRewardAddress', type: 'address' }],
		name: 'changeRewardAddress',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'generatorAddress', type: 'address' },
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ internalType: 'uint256', name: 'stakeToRelease', type: 'uint256' }
		],
		name: 'completeGeneratorTask',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'decreaseDeclaredCompute',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'refundAddress', type: 'address' }],
		name: 'deregister',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: '', type: 'address' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
		name: 'generatorInfoPerMarket',
		outputs: [
			{ internalType: 'enum GeneratorRegistry.GeneratorState', name: 'state', type: 'uint8' },
			{ internalType: 'uint256', name: 'computePerRequestRequired', type: 'uint256' },
			{ internalType: 'uint256', name: 'proofGenerationCost', type: 'uint256' },
			{ internalType: 'uint256', name: 'proposedTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'activeRequests', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'generatorRegistry',
		outputs: [
			{ internalType: 'address', name: 'rewardAddress', type: 'address' },
			{ internalType: 'uint256', name: 'totalStake', type: 'uint256' },
			{ internalType: 'uint256', name: 'sumOfComputeAllocations', type: 'uint256' },
			{ internalType: 'uint256', name: 'computeConsumed', type: 'uint256' },
			{ internalType: 'uint256', name: 'stakeLocked', type: 'uint256' },
			{ internalType: 'uint256', name: 'activeMarketplaces', type: 'uint256' },
			{ internalType: 'uint256', name: 'declaredCompute', type: 'uint256' },
			{ internalType: 'uint256', name: 'intendedStakeUtilization', type: 'uint256' },
			{ internalType: 'uint256', name: 'intendedComputeUtilization', type: 'uint256' },
			{ internalType: 'bytes', name: 'generatorData', type: 'bytes' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'generatorAddress', type: 'address' },
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' }
		],
		name: 'getGeneratorAssignmentDetails',
		outputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'generatorAddress', type: 'address' },
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' }
		],
		name: 'getGeneratorRewardDetails',
		outputs: [
			{ internalType: 'address', name: '', type: 'address' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'generatorAddress', type: 'address' },
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' }
		],
		name: 'getGeneratorState',
		outputs: [
			{ internalType: 'enum GeneratorRegistry.GeneratorState', name: '', type: 'uint8' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
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
		inputs: [{ internalType: 'uint256', name: 'computeToIncrease', type: 'uint256' }],
		name: 'increaseDeclaredCompute',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: '_admin', type: 'address' },
			{ internalType: 'address', name: '_proofMarketplace', type: 'address' }
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'computeToReduce', type: 'uint256' }],
		name: 'intendToReduceCompute',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'stakeToReduce', type: 'uint256' }],
		name: 'intendToReduceStake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ internalType: 'uint256', name: 'computePerRequestRequired', type: 'uint256' },
			{ internalType: 'uint256', name: 'proofGenerationCost', type: 'uint256' },
			{ internalType: 'uint256', name: 'proposedTime', type: 'uint256' },
			{ internalType: 'bool', name: 'updateMarketDedicatedKey', type: 'bool' },
			{ internalType: 'bytes', name: 'attestationData', type: 'bytes' },
			{ internalType: 'bytes', name: 'enclaveSignature', type: 'bytes' }
		],
		name: 'joinMarketplace',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'marketId', type: 'uint256' }],
		name: 'leaveMarketplace',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256[]', name: 'marketIds', type: 'uint256[]' }],
		name: 'leaveMarketplaces',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'proofMarketplace',
		outputs: [{ internalType: 'contract ProofMarketplace', name: '', type: 'address' }],
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
		inputs: [
			{ internalType: 'address', name: 'rewardAddress', type: 'address' },
			{ internalType: 'uint256', name: 'declaredCompute', type: 'uint256' },
			{ internalType: 'uint256', name: 'initialStake', type: 'uint256' },
			{ internalType: 'bytes', name: 'generatorData', type: 'bytes' }
		],
		name: 'register',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'marketId', type: 'uint256' }],
		name: 'removeEncryptionKey',
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
		inputs: [{ internalType: 'uint256', name: 'marketId', type: 'uint256' }],
		name: 'requestForExitMarketplace',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256[]', name: 'marketIds', type: 'uint256[]' }],
		name: 'requestForExitMarketplaces',
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
		inputs: [
			{ internalType: 'address', name: 'generatorAddress', type: 'address' },
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ internalType: 'uint256', name: 'slashingAmount', type: 'uint256' },
			{ internalType: 'address', name: 'rewardAddress', type: 'address' }
		],
		name: 'slashGenerator',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'generatorAddress', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'stake',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
		inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
		name: 'unstake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'marketId', type: 'uint256' },
			{ internalType: 'bytes', name: 'attestationData', type: 'bytes' },
			{ internalType: 'bytes', name: 'enclaveSignature', type: 'bytes' }
		],
		name: 'updateEncryptionKey',
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
