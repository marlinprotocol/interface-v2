import type { TableModel } from '$lib/types/componentTypes';

export const POND_TO_MPOND_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'Date',
		id: 'date',
		sorting: true
	},
	{
		title: 'POND',
		id: 'pond',
		tooltipText: 'The amount of POND which was placed for conversion to MPond.',
		centered: true
	},
	{
		title: 'MPond',
		id: 'mPond',
		tooltipText:
			'The corresponding amount of MPond received as a result of the conversion from POND. Note: 1 Million POND equals 1 MPond.',
		centered: true
	}
];

export const MPOND_TO_POND_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'Date',
		id: 'date',
		sorting: true
	},
	{
		title: 'POND',
		id: 'pond',
		centered: true,
		tooltipText:
			'The total amount of POND to be received as a result of the conversion from MPond. Note: 1 MPond equals 1 Million POND.'
	},
	{
		title: 'MPond',
		id: 'mPond',
		centered: true,
		tooltipText: 'The amount of MPond that was placed for conversion to POND.'
	},
	{
		title: 'Actions',
		centered: true,
		id: 'actions'
	}
];

export const MPOND_CONVERSION_HISTORY_TABLE_HEADER: TableModel['header'][] = [
	{
		title: 'Date',
		id: 'date'
	},
	{
		title: 'Converted',
		id: 'pond'
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
