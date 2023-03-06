<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses, tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TableDataWithButton from '$lib/components/table-cells/TableDataWithButton.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { bigNumberToCommaString, dateToString, shortenText } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';
	import HistoryBackButton from '../sub-components/HistoryBackButton.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	const tableHeading: TableModel['header'][] = [
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

	type TableData = {
		date: Date;
		pond: BigNumber;
		mpond: BigNumber;
		txnHash: string;
		txnHashUrl: string;
	};

	// TODO: replace with real data
	const tableData: TableData[] = [
		{
			date: new Date(2023, 2, 1),
			pond: BigNumber.from('100000000000000000000'),
			mpond: BigNumber.from('100000000000000'),
			txnHash: '0x1234567890',
			txnHashUrl: 'https://etherscan.io/tx/0x1234567890'
		},
		{
			date: new Date(2023, 1, 10),
			pond: BigNumber.from('38000000000000000000000'),
			mpond: BigNumber.from('38000000000000000'),
			txnHash: '0x137823949',
			txnHashUrl: 'https://etherscan.io/tx/0x137823949'
		},
		{
			date: new Date(2023, 2, 2),
			pond: BigNumber.from('770000000000000000000000'),
			mpond: BigNumber.from('770000000000000000'),
			txnHash: '0x0000000000',
			txnHashUrl: 'https://etherscan.io/tx/0x0000000000'
		},
		{
			date: new Date(2023, 1, 20),
			pond: BigNumber.from('456345600000000000000000'),
			mpond: BigNumber.from('456345600000000000'),
			txnHash: '0x899999934555',
			txnHashUrl: 'https://etherscan.io/tx/0x899999934555'
		},
		{
			date: new Date(2023, 1, 16),
			pond: BigNumber.from('6345600000000000000000'),
			mpond: BigNumber.from('6345600000000000'),
			txnHash: '0x9876543000',
			txnHashUrl: 'https://etherscan.io/tx/0x9876543000'
		}
	];

	let sortedData: typeof tableData = tableData.sort((a, b) => b.date.getTime() - a.date.getTime());

	// reverse the order of sortedData
	const handleSortData = () => {
		sortedData = sortedData.reverse();
	};
</script>

<HistoryBackButton firstText="POND" secondText="MPond" href="/bridge/pondToMpondHistory" />
<Text variant="h2" text="MPond to POND conversion history" styleClass="mt-3 mb-8" />
<Table {tableHeading} {handleSortData}>
	<tbody slot="tableBody">
		{#if sortedData.length === 0}
			<div class={tableCellClasses.empty}>
				{'No conversion history yet. Convert MPond to POND to see your conversion history here.'}
			</div>
		{:else}
			{#each sortedData as row}
				<tr>
					<TableDataWithButton>
						{dateToString(row.date)}
					</TableDataWithButton>
					<TableDataWithButton>
						<TxnHashText txnHash={row.txnHash} txnHashUrl={row.txnHashUrl} />
					</TableDataWithButton>
					<TableDataWithButton>
						{bigNumberToCommaString(row.mpond, 8)}
					</TableDataWithButton>
					<TableDataWithButton>
						{bigNumberToCommaString(row.pond)}
					</TableDataWithButton>
					<TableDataWithButton>
						{bigNumberToCommaString(row.pond)}
						<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
					</TableDataWithButton>
					<TableDataWithButton>
						{bigNumberToCommaString(row.pond)}
						<HistoryDataIconButton
							src={'/images/timerclock.svg'}
							text={'58 mins'}
							variant="secondary"
						/>
					</TableDataWithButton>
					<TableDataWithButton>
						{bigNumberToCommaString(row.pond)}
						<HistoryDataIconButton
							src={'/images/historyicon.svg'}
							imgWidth={14}
							text={'History'}
							variant="disabled"
							disabled
						/>
					</TableDataWithButton>
					<TableDataWithButton>
						<Button
							variant="filled"
							styleClass={buttonClasses.convertButton}
							onclick={() => {
								console.log('Convert');
							}}
						>
							CONVERT
						</Button>
						<HistoryDataIconButton
							text={'Cancel'}
							variant="primary"
							tooltipText={'Cancel current MPond conversion requests in process. Users who want the updated MPond conversion parameters to take immediate effect may cancel the current conversion request and place a new conversion request.'}
						/>
					</TableDataWithButton>
				</tr>
			{/each}
		{/if}
	</tbody>
</Table>
