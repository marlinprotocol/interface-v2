<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import { kInstancesTableHeader, kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import { convertRateToPerHourString } from '$lib/utils/helpers/oysterHelpers';
	import { slide } from 'svelte/transition';

	const { symbol, decimal } = kOysterRateMetaData;

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowMini
	};

	export let tableData: Promise<CPUrlDataModel[]> = Promise.resolve([]);
	export let isOpen = false;
	export let validCPUrl = false;
</script>

<InputCardWithEndButton styleClass={'mt-4 p'} title={'Details'}>
	{#if isOpen && $connected}
		<div
			transition:slide={{ duration: 400 }}
			class="bg-white rounded mt-4 w-full max-h-40 overflow-y-auto overflow-x-hidden"
		>
			{#await tableData}
				<div class={'text-center flex justify-center my-4'}>
					<LoadingAnimatedPing />
				</div>
			{:then value}
				<Table
					tableHeading={kInstancesTableHeader}
					headingStyleClass={'text-sm'}
					tablePadding={'py-4'}
					iconWidth={'13px'}
				>
					<tbody slot="tableBody">
						{#each value as row}
							<tr>
								<td class={styles.tableCell}>{row.instance}</td>
								<td class={styles.tableCell}>{row.region}</td>
								<td class={styles.tableCell}>
									{symbol}{convertRateToPerHourString(row.rate, decimal)}
								</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			{:catch error}
				<div class={'text-center flex justify-center m-4 text-sm'}>
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
