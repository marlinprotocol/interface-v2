import type { TableModel } from '$lib/types/componentTypes';

export const pondToMpondTableHeader: TableModel['header'][] = [
	{
		title: 'DATE',
		id: 'date',
		sorting: true
	},
	{
		title: 'POND',
		id: 'pond',
		tooltipText: 'Amount of Pond received'
	},
	{
		title: 'MPond',
		id: 'mpond',
		tooltipText: 'Amount of MPond converted'
	},
	{
		title: 'TX HASH',
		id: 'txnHash',
		tooltipText: 'Transaction hash'
	}
];

export const mpondToPondTableHeader: TableModel['header'][] = [
	{
		title: 'DATE',
		id: 'date',
		sorting: true
	},
	{
		title: 'TX HASH',
		id: 'txnHash',
		tooltipText: 'Transaction hash'
	},
	{
		title: 'MPond',
		id: 'mpond',
		tooltipText: 'Amount of MPond converted'
	},
	{
		title: 'TOTAL POND',
		id: 'pond',
		tooltipText: 'Amount of Pond received'
	},
	{
		title: 'PENDING',
		id: 'pending',
		tooltipText: 'Amount of Pond received'
	},
	{
		title: 'IN PROCESS',
		id: 'process',
		tooltipText: 'Amount of Pond received'
	},
	{
		title: 'ELIGIBLE',
		id: 'eligible',
		tooltipText: 'Amount of Pond received'
	},
	{
		title: '',
		id: 'convert'
	}
];

export const mpondConversionHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'DATE',
		id: 'date'
	},
	{
		title: 'Converted',
		id: 'pond',
		tooltipText: 'Amount of Pond converted.'
	},
	{
		title: 'TX HASH',
		id: 'txnHash',
		tooltipText: 'Transaction hash'
	}
];

export const mpondConversionCycleTableHeader: TableModel['header'][] = [
	{
		title: 'ELIGIBLE / PENDING',
		id: 'pond',
		tooltipText: 'The amount of POND that is eligible/pending for conversion.'
	},
	{
		title: 'TIMESTAMP',
		id: 'time',
		tooltipText: 'When POND is eligible for conversion.'
	}
];
