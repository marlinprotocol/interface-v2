<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { TableModel } from '$lib/types/componentTypes';
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';

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

<div class="flex items-center gap-4">
	<a
		class="mb-8 flex h-[56px] w-[56px] items-center justify-center rounded-full border border-[#D9DADE] bg-white"
		href={tableTitle.backButton.href}
	>
		<img src={staticImages.backIcon} alt="Back Icon" />
	</a>
	<PageTitle title={tableTitle.title} />
</div>
<div
	class={cn(
		'card rounded-[18px] bg-base-100',
		fullWidth ? 'max-w-full' : 'sm:max-w-full md:max-w-[66.66%]'
	)}
>
	{#if !$connected}
		<div class="my-4 flex justify-center text-center">
			<NetworkPrompt
				showIcon={false}
				description="Switch to the appropriate network and connect your wallet to get started."
				variant="white"
			>
				<ConnectWalletButton slot="cta" styleClass="bg-white h-fit mt-4 px-8 py-4 rounded-2xl" />
			</NetworkPrompt>
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
			<div class={tableClasses.empty}>No data found!</div>
		{/if}
	{/if}
</div>
