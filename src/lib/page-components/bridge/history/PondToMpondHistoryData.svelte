<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TxnHashText from '$lib/components/TxnHashText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { bigNumberToCommaString, dateToString, shortenText } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';
	import HistoryBackButton from '../sub-components/HistoryBackButton.svelte';

	const tableHeading: TableModel['header'][] = [
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

<HistoryBackButton firstText="MPond" secondText="POND" href="/bridge/mPondtoPondHistory" />
<Text variant="h2" text="POND to MPond conversion history" styleClass="mt-3 mb-8" />
<Table {tableHeading} {handleSortData}>
	<tbody slot="tableBody">
		{#if sortedData.length === 0}
			<div class={tableCellClasses.empty}>
				{'No conversion history yet. Convert POND to MPond to see your conversion history here.'}
			</div>
		{:else}
			{#each sortedData as row}
				<tr>
					<td class={tableCellClasses.row}>{dateToString(row.date)}</td>
					<td class={tableCellClasses.row}>{bigNumberToCommaString(row.pond)}</td>
					<td class={tableCellClasses.row}>{bigNumberToCommaString(row.mpond, 8)}</td>
					<td class={tableCellClasses.row}>
						<TxnHashText txnHash={row.txnHash} txnHashUrl={row.txnHashUrl} />
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</Table>
