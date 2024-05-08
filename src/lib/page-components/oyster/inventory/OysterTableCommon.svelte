<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { TableModel } from '$lib/types/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let loading = false;
	export let handleSortData: (id: string) => void;
	export let noDataFound: boolean;
	export let tableHeading: TableModel['header'][];
	export let walletConnectionRequired = true;
	export let emptyTableMessage = 'No data found!';
	export let roundedBorders: boolean = true;
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
		<Table {roundedBorders} {tableHeading} {handleSortData} headingStyleClass="h-[32px]" />
		<div class={cn(tableClasses.empty, 'mb-8')}>
			{emptyTableMessage}
		</div>
	{:else}
		<Table {roundedBorders} {tableHeading} {handleSortData} headingStyleClass="h-[32px]">
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
