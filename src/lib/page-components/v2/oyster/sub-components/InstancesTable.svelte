<script lang="ts">
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import Table from '$lib/atoms/v2/table/Table.svelte';
	import CollapseButton from '$lib/components/v2/buttons/CollapseButton.svelte';
	import InputCardWithEndButton from '$lib/components/v2/inputs/InputCardWithEndButton.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import { oysterTokenMetadataStore, oysterRateMetadataStore } from '$lib/data-stores/oysterStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import { OYSTER_INSTANCES_TABLE_HEADER } from '$lib/utils/constants/oysterConstants';
	import { convertRateToPerHourString } from '$lib/utils/helpers/conversionHelper';
	import { slide } from 'svelte/transition';

	export let tableData: Promise<CPUrlDataModel[]> = Promise.resolve([]);
	export let isOpen = false;
	export let validCPUrl = false;
</script>

<InputCardWithEndButton variant="v2Input" styleClass="mt-4" title="Details">
	{#if isOpen && $connected}
		<div
			transition:slide={{ duration: 400 }}
			class="mt-4 max-h-40 w-full overflow-y-auto overflow-x-hidden rounded bg-white"
		>
			{#await tableData}
				<div class="my-4 flex justify-center text-center">
					<LoadingAnimatedPing />
				</div>
			{:then value}
				<Table
					tableHeading={OYSTER_INSTANCES_TABLE_HEADER}
					headingStyleClass="text-sm"
					iconWidth="13px"
				>
					<tbody slot="tableBody">
						{#each value as row}
							<tr>
								<td class={tableClasses.cellMini}>{row.instance}</td>
								<td class={tableClasses.cellMini}>{row.region}</td>
								<td class={tableClasses.cellMini}>
									{$oysterTokenMetadataStore.symbol}{convertRateToPerHourString(
										row.rateScaled / $oysterRateMetadataStore.oysterRateScalingFactor,
										$oysterTokenMetadataStore.decimal
									)}
								</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			{:catch error}
				<div class="m-4 flex justify-center text-center text-sm">
					There seems to be an error. Make sure that the entered URL is correct and check again.
				</div>
			{/await}
		</div>
	{/if}
	<svelte:fragment slot="titleEndButton">
		<CollapseButton
			disabled={!$connected || !validCPUrl}
			{isOpen}
			onclick={() => {
				isOpen = !isOpen;
			}}
		/>
	</svelte:fragment>
</InputCardWithEndButton>
