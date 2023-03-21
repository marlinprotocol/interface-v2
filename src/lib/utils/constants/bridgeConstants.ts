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
		tooltipText: 'The amount of POND which was placed for conversion to MPond.'
	},
	{
		title: 'MPond',
		id: 'mPond',
		tooltipText:
			'The corresponding amount of MPond received as a result of the conversion from POND. Note: 1 Million POND equals 1 MPond.'
	},
	{
		title: 'TX HASH',
		id: 'txnHash',
		tooltipText: 'Transaction hash of the conversion from POND to MPond.'
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
		tooltipText: 'Transaction hash of the conversion request from MPond to POND.'
	},
	{
		title: 'MPond',
		id: 'mPond',
		tooltipText: 'The amount of MPond that was placed for conversion to POND.'
	},
	{
		title: 'TOTAL POND',
		id: 'pond',
		tooltipText:
			'The total amount of POND to be received as a result of the conversion from MPond. Note: 1 MPond equals 1 Million POND.'
	},
	{
		title: 'PENDING',
		id: 'pending',
		tooltipText: 'The amount of POND that is currently locked and pending conversion.'
	},
	{
		title: 'IN PROCESS',
		id: 'process',
		tooltipText: 'The amount of POND in process for conversion.'
	},
	{
		title: 'ELIGIBLE',
		id: 'eligible',
		tooltipText: 'The amount of POND eligible for conversion.'
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
		tooltipText: 'Transaction hash of the conversion from MPond to POND.'
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
