<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import HeaderConnectWallet from '$lib/components/header/sub-components/HeaderConnectWallet.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { TableModel } from '$lib/types/componentTypes';
	import HistoryBackButton from '../sub-components/HistoryBackButton.svelte';

	export let tableTitle: {
		backButton: {
			firstText: string;
			secondText: string;
			href: string;
		};
		title: string;
	};
	export let loading: boolean;
	export let handleSortData: () => void;
	export let noDataFound: boolean;
	export let tableHeading: TableModel['header'][];
	export let fullWidth = true;
</script>

<HistoryBackButton
	firstText={tableTitle.backButton.firstText}
	secondText={tableTitle.backButton.secondText}
	href={tableTitle.backButton.href}
/>
<Text variant="h2" text={tableTitle.title} styleClass="mt-3 mb-8" />
<div
	class={`card ${
		fullWidth ? 'max-w-full' : 'sm:max-w-full md:max-w-[66.66%]'
	} bg-base-100 rounded-lg`}
>
	{#if !$connected}
		<div class={`text-center flex justify-center my-4`}>
			<HeaderConnectWallet />
		</div>
	{:else if loading}
		<div class={'text-center flex justify-center my-4'}>
			<LoadingCircular />
		</div>
	{:else}
		<Table {tableHeading} {handleSortData}>
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
