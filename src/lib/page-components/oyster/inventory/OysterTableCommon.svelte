<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import EmptyCard from '$lib/components/empty-state/EmptyCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
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
	export let flexibleHeight: boolean = false;
</script>

<div
	class={cn('card max-w-full rounded-[18px] bg-base-100', {
		'rounded-tl-none': !roundedBorders
	})}
>
	{#if !$connected && walletConnectionRequired}
		<div
			class={cn('my-4 flex flex-col items-center justify-center text-center', {
				'h-96': !flexibleHeight
			})}
		>
			<NetworkPrompt
				description="Switch to the appropriate network and connect your wallet to get started"
				variant="white"
				showIcon={false}
			>
				<ConnectWalletButton
					chainDomId="oyster-table-column-chain-switcher-dropdown"
					slot="cta"
					styleClass="bg-secondary-content h-fit mt-4 px-8 py-4 rounded-2xl"
				/>
			</NetworkPrompt>
		</div>
	{:else if loading}
		<div class="my-4 flex justify-center text-center">
			<LoadingAnimatedPing />
		</div>
	{:else if noDataFound}
		<Table {roundedBorders} {tableHeading} {handleSortData} headingStyleClass="h-[32px]" />
		<div class={cn(tableClasses.empty, 'mb-8')}>
			{#if $$slots.emptyState}
				<slot name="emptyState" />
			{:else}
				{emptyTableMessage}
			{/if}
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
