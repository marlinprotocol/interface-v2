import type { TableModel } from '$lib/types/componentTypes';
import type {
	OysterHistoryDataModel,
	OysterInventoryDataModel
} from '$lib/types/oysterComponentType';
import { BigNumber } from 'ethers';

export const kInstancesTableHeader: TableModel['header'][] = [
	{
		title: 'Instance Type',
		id: 'type'
	},
	{
		title: 'Region',
		id: 'region',
		tooltipText: 'The amount of POND which was placed for conversion to MPond.'
	},
	{
		title: 'Price',
		id: 'price',
		tooltipText:
			'The corresponding amount of MPond received as a result of the conversion from POND. Note: 1 Million POND equals 1 MPond.'
	}
];

// Merchant, Region, Instance, Rate, Amount Paid, Amount Used, Balance, Duration Left, Status
export const kOysterInventoryTableHeader: TableModel['header'][] = [
	{
		title: 'Merchant',
		id: 'merchant'
	},
	{
		title: 'Instance',
		id: 'instance'
	},
	{
		title: 'Region',
		id: 'region'
	},
	{
		title: 'Rate',
		id: 'rate',
		sorting: true
	},
	{
		title: 'Amount Paid',
		id: 'amountPaid',
		sorting: true
	},
	{
		title: 'Amount Used',
		id: 'amountUsed',
		sorting: true
	},
	{
		title: 'Balance',
		id: 'balance',
		sorting: true
	},
	{
		title: 'Duration Left',
		id: 'durationLeft'
	},
	{
		title: '',
		id: 'action'
	}
];

export const kInventoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'tag':
			return '5%';
		case 'merchant':
			return '15%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'rate':
			return '10%';
		case 'amountPaid':
			return '12.5%';
		case 'amountUsed':
			return '12.5%';
		case 'balance':
			return '10%';
		case 'durationLeft':
			return '10%';
		case 'action':
			return '5%';
		default:
			return '5%';
	}
};

//TODO: remove this later
export const kInventoryData: OysterInventoryDataModel[] = [
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 1112222
	},
	{
		merchant: {
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 12222
	},
	{
		merchant: {
			name: 'InfStones Big Name Very InfStones InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 111222
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 111222
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'France',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 11341222
	},
	{
		merchant: {
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 111222
	}
];

// Merchant, Region, Instance,  Amount Paid, Amount Used, Refund, Status, TX Hash
export const kOysterHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'Merchant',
		id: 'merchant'
	},
	{
		title: 'Instance',
		id: 'instance'
	},
	{
		title: 'Region',
		id: 'region'
	},
	{
		title: 'Amount Paid',
		id: 'amountPaid',
		sorting: true
	},
	{
		title: 'Amount Used',
		id: 'amountUsed',
		sorting: true
	},
	{
		title: 'Refund',
		id: 'refund',
		sorting: true
	},
	{
		title: 'Status',
		id: 'status'
	},
	{
		title: 'TX Hash',
		id: 'txHash'
	},
	{
		title: '',
		id: 'action'
	}
];

export const kHistoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'merchant':
			return '15%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'amountPaid':
			return '12.5%';
		case 'amountUsed':
			return '12.5%';
		case 'refund':
			return '10%';
		case 'status':
			return '10%';
		case 'txHash':
			return '10%';
		case 'action':
			return '10%';
		default:
			return '5%';
	}
};
export const kHistoryData: OysterHistoryDataModel[] = [
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',

		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		refund: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		status: 'Completed',
		txHash: '0x00000000000'
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',

		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		refund: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		status: 'Stopped',
		txHash: '0x00000000000'
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',

		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		refund: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		status: 'Completed',
		txHash: '0x00000000000'
	}
];

export const kOysterDocLink = 'https://docs.marlin.org/docs/User%20Guides/Oyster/';
export const kOysterSupportLink = 'https://docs.marlin.org/docs/category/tutorials';
