import type { TableModel } from '$lib/types/componentTypes';

export const POND_TO_MPOND_TABLE_HEADER: TableModel['header'][] = [
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
	}
];

export const MPOND_TO_POND_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'DATE',
		id: 'date',
		sorting: true
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
		title: 'ACTIONS',
		id: 'actions'
	}
];

export const MPOND_CONVERSION_HISTORY_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'DATE',
		id: 'date'
	},
	{
		title: 'CONVERTED',
		id: 'pond',
		tooltipText: 'The amount of POND converted.'
	},
	{
		title: 'TX HASH',
		id: 'txnHash',
		tooltipText: 'The transaction hash of the conversion.'
	}
];

export const MPOND_CONVERSION_CYCLE_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'ELIGIBLE / PENDING',
		id: 'eligible',
		tooltipText: 'The amount of POND that is eligible/pending for conversion.'
	},
	{
		title: 'TIMESTAMP',
		id: 'timestamp',
		tooltipText: 'When POND is eligible for conversion.'
	}
];
