<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import GridTable from '$lib/atoms/table/GridTable.svelte';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { TableModel } from '$lib/types/componentTypes';
	import { kHistoryTableColumnsWidth } from '$lib/utils/constants/oysterConstants';

	export let tableHeading: TableModel['header'][];
	export let handleSortData: () => void;
	let loading = false;
	let noDataFound = false;
</script>

<div class={`card max-w-full bg-base-100 rounded-lg`}>
	{#if !$connected}
		<div class={`text-center flex justify-center my-4`}>
			<HeaderConnectWallet />
		</div>
	{:else if loading}
		<div class={'text-center flex justify-center my-4'}>
			<LoadingCircular />
		</div>
	{:else}
		<GridTable {tableHeading} {handleSortData} widthFunction={kHistoryTableColumnsWidth}>
			<slot />
		</GridTable>
		{#if noDataFound}
			<div class={tableCellClasses.empty}>
				{'No data found!'}
			</div>
		{/if}
	{/if}
</div>
