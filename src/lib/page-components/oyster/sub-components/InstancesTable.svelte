<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Table from '$lib/atoms/table/Table.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import { kInstancesTableHeader } from '$lib/utils/constants/oysterConstants';
	import { slide } from 'svelte/transition';

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowMini
	};

	export let tableData: CPUrlDataModel[] = [];
	export let loading = false;
	export let error = false;
	export let validCPUrl = false;

	let isOpen = false;
</script>

<InputCardWithEndButton styleClass={'mt-4'} title={'Details'}>
	{#if isOpen}
		<div
			transition:slide={{ duration: 400 }}
			class="w-full max-h-40 overflow-y-auto overflow-x-hidden"
		>
			{#if loading}
				please wait while we fetch your instance details...
			{:else if error}
				There seems to be an error. Make sure that the entered URL is correct and check again.
			{:else}
				<Table tableHeading={kInstancesTableHeader} headingStyleClass={'text-xs'} iconWidth={13}>
					<tbody slot="tableBody">
						{#each tableData as row}
							<tr>
								<td class={styles.tableCell}>{row.instance}</td>
								<td class={styles.tableCell}>{row.region}</td>
								<td class={styles.tableCell}>{row.rate}</td>
							</tr>
						{/each}
					</tbody>
				</Table>
			{/if}
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
