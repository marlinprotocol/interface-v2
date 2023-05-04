<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { TableModel } from '$lib/types/componentTypes';

	export let loading: boolean = false;
	export let handleSortData: (id: string) => void;
	export let noDataFound: boolean;
	export let tableHeading: TableModel['header'][];
	export let headingWidth: string | undefined = undefined;
	export let walletConnectionRequired = true;
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
	{:else}
		<Table
			{tableHeading}
			{handleSortData}
			{headingWidth}
			tablePadding={'py-6'}
			headingStyleClass={'h-[32px]'}
		>
			<tbody slot="tableBody">
				<slot />
			</tbody>
		</Table>
		{#if noDataFound}
			<div class={tableCellClasses.empty}>
				{'No data found!'}
			</div>
		{/if}
	{/if}
</div>
