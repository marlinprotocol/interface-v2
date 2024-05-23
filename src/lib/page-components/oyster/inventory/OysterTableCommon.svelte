<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import EmptyCard from '$lib/components/empty-state/EmptyCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
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

<div
	class={cn('card max-w-full rounded-[18px] bg-base-100', {
		'rounded-tl-none': !roundedBorders
	})}
>
	{#if !$connected && walletConnectionRequired}
		<div class="my-4 flex h-96 flex-col items-center justify-center text-center">
			<ConnectWalletButton styleClass="bg-[#F4F4F6] h-fit px-8 py-4 rounded-2xl" />
		</div>
	{:else if loading}
		<div class="my-4 flex justify-center text-center">
			<LoadingAnimatedPing />
		</div>
	{:else if noDataFound}
		<Table {roundedBorders} {tableHeading} {handleSortData} headingStyleClass="h-[32px]" />
		<div class={cn(tableClasses.empty, 'mb-8')}>
			<EmptyCard
				title="Curious fishies can visit the link below to learn more about Marlin's ZK proof marketplace."
				imageSrc={staticImages.fishingMan}
				imageAlt="Fishing Man"
				href="https://docs.marlin.org/learn/what-is-kalypso"
				buttonText="Learn about Kalypso"
			/>
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
