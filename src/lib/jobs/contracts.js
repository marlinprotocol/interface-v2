import { Contract } from 'ethers';

export function pondContract(provider) {
	return new Contract(import.meta.env.VITE_ADDRESS_POND, erc20Abi, provider.getSigner());
}

export function marketContract(provider) {
	return new Contract(import.meta.env.VITE_ADDRESS_MARKETV1, marketAbi, provider.getSigner());
}

let marketAbi = [
	{
		inputs: [
			{
				internalType: 'string',
				name: '_metadata',
				type: 'string'
			},
			{
				internalType: 'address',
				name: '_owner',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_rate',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: '_balance',
				type: 'uint256'
			}
		],
		name: 'jobOpen',
		outputs: [],
		stateMutability: 'public',
		type: 'function'
	}
];

let gwL2Abi = [
	{
		inputs: [
			{
				internalType: 'address',
				name: '_to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256'
			}
		],
		name: 'transferL1',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256'
			}
		],
		stateMutability: 'public',
		type: 'function'
	}
];

let outboxAbi = [
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'batchNum',
				type: 'uint256'
			},
			{
				internalType: 'bytes32[]',
				name: 'proof',
				type: 'bytes32[]'
			},
			{
				internalType: 'uint256',
				name: 'index',
				type: 'uint256'
			},
			{
				internalType: 'address',
				name: 'l2Sender',
				type: 'address'
			},
			{
				internalType: 'address',
				name: 'destAddr',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: 'l2Block',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'l1Block',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'l2Timestamp',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256'
			},
			{
				internalType: 'bytes',
				name: 'calldataForL1',
				type: 'bytes'
			}
		],
		name: 'executeTransaction',
		outputs: [],
		stateMutability: 'public',
		type: 'function'
	}
];

let erc20Abi = [
	{
		constant: true,
		inputs: [],
		name: 'name',
		outputs: [
			{
				name: '',
				type: 'string'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_spender',
				type: 'address'
			},
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'approve',
		outputs: [
			{
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'totalSupply',
		outputs: [
			{
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_from',
				type: 'address'
			},
			{
				name: '_to',
				type: 'address'
			},
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'transferFrom',
		outputs: [
			{
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'decimals',
		outputs: [
			{
				name: '',
				type: 'uint8'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: '_owner',
				type: 'address'
			}
		],
		name: 'balanceOf',
		outputs: [
			{
				name: 'balance',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'symbol',
		outputs: [
			{
				name: '',
				type: 'string'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [
			{
				name: '_to',
				type: 'address'
			},
			{
				name: '_value',
				type: 'uint256'
			}
		],
		name: 'transfer',
		outputs: [
			{
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				name: '_owner',
				type: 'address'
			},
			{
				name: '_spender',
				type: 'address'
			}
		],
		name: 'allowance',
		outputs: [
			{
				name: '',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		payable: true,
		stateMutability: 'payable',
		type: 'fallback'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'owner',
				type: 'address'
			},
			{
				indexed: true,
				name: 'spender',
				type: 'address'
			},
			{
				indexed: false,
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Approval',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				name: 'from',
				type: 'address'
			},
			{
				indexed: true,
				name: 'to',
				type: 'address'
			},
			{
				indexed: false,
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'Transfer',
		type: 'event'
	}
];
