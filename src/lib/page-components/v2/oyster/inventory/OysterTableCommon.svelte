<script lang="ts">
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import Table from '$lib/atoms/v2/table/Table.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
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

<div class="card max-w-full rounded-[18px] bg-base-100">
	{#if !$connected && walletConnectionRequired}
		<div class="my-4 flex justify-center text-center">
			<ConnectWalletButton />
		</div>
	{:else if loading}
		<div class="my-4 flex justify-center text-center">
			<LoadingAnimatedPing />
		</div>
	{:else if noDataFound}
		<Table {tableHeading} {handleSortData} headingStyleClass="h-[32px]" />
		<div class="mb-8 {tableClasses.empty}">
			{emptyTableMessage}
		</div>
	{:else}
		<Table {tableHeading} {handleSortData} headingStyleClass="h-[32px]">
			<tbody slot="tableBody">
				<slot />
			</tbody>
		</Table>
		{#if $$slots.pagination}
			<div class="mb-4 flex items-center justify-center">
				<slot name="pagination" />
			</div>
		{/if}
	{/if}
</div>
