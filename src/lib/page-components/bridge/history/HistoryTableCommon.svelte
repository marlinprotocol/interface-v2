<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { TableModel } from '$lib/types/componentTypes';
	import HistoryBackButton from '$lib/page-components/bridge/sub-components/HistoryBackButton.svelte';

	export let tableTitle: {
		backButton: {
			firstText: string;
			secondText: string;
			href: string;
		};
		title: string;
	};
	export let loading: boolean;
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	export let noDataFound: boolean;
	export let tableHeading: TableModel['header'][];
	export let fullWidth = true;
</script>

<HistoryBackButton
	firstText={tableTitle.backButton.firstText}
	secondText={tableTitle.backButton.secondText}
	href={tableTitle.backButton.href}
/>
<PageTitle title={tableTitle.title} />
<div
	class="card rounded-lg bg-base-100 {fullWidth ? 'max-w-full' : 'sm:max-w-full md:max-w-[66.66%]'}"
>
	{#if !$connected}
		<div class="my-4 flex justify-center text-center">
			<HeaderConnectWallet />
		</div>
	{:else if loading}
		<div class="my-4 flex justify-center text-center">
			<LoadingAnimatedPing />
		</div>
	{:else}
		<Table {tableHeading} {handleSortData}>
			<tbody slot="tableBody">
				<slot />
			</tbody>
		</Table>
		{#if noDataFound}
			<div class={tableCellClasses.empty}>No data found!</div>
		{/if}
	{/if}
</div>
