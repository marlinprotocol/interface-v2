<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { TableModel } from '$lib/types/componentTypes';

	export let loading = false;
	export let handleSortData: (id: string) => void;
	export let noDataFound: boolean;
	export let tableHeading: TableModel['header'][];
	export let walletConnectionRequired = true;
	export let emptyTableMessage = 'No data found!';
</script>

<div class={`card max-w-full bg-base-100 rounded-lg`}>
	{#if !$connected && walletConnectionRequired}
		<div class={`text-center flex justify-center my-4`}>
			<HeaderConnectWallet />
		</div>
	{:else if loading}
		<div class={'text-center flex justify-center my-4'}>
			<LoadingAnimatedPing />
		</div>
	{:else if noDataFound}
		<div class={tableCellClasses.empty + ' mb-8'}>
			{emptyTableMessage}
		</div>
	{:else}
		<Table {tableHeading} {handleSortData} tablePadding={'py-6'} headingStyleClass={'h-[32px]'}>
			<tbody slot="tableBody">
				<slot />
			</tbody>
		</Table>
		{#if $$slots.pagination}
			<div class="flex justify-center items-center mb-4">
				<slot name="pagination" />
			</div>
		{/if}
	{/if}
</div>
