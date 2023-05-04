<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import { oysterAmountPrecision } from '$lib/utils/constants/constants';
	import { kInstancesTableHeader } from '$lib/utils/constants/oysterConstants';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { slide } from 'svelte/transition';

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowMini
	};

	export let tableData: Promise<CPUrlDataModel[]> = Promise.resolve([]);
	export let validCPUrl = false;

	let isOpen = false;
</script>

<InputCardWithEndButton styleClass={'mt-4'} title={'Details'}>
	{#if isOpen && validCPUrl}
		<div
			transition:slide={{ duration: 400 }}
			class="w-full max-h-40 overflow-y-auto overflow-x-hidden"
		>
			{#await tableData}
				<div class={'text-center flex justify-center my-4'}>
					<LoadingAnimatedPing />
				</div>
			{:then value}
				<Table tableHeading={kInstancesTableHeader} headingStyleClass={'text-xs'} iconWidth={13}>
					<tbody slot="tableBody">
						{#each value as row}
							<tr>
								<td class={styles.tableCell}>{row.instance}</td>
								<td class={styles.tableCell}>{row.region}</td>
								<td class={styles.tableCell}>
									{bigNumberToCommaString(row.rate, oysterAmountPrecision)}
								</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			{:catch error}
				There seems to be an error. Make sure that the entered URL is correct and check again.
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
