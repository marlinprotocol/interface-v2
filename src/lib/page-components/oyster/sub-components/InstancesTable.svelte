<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';

	import Table from '$lib/atoms/table/Table.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import { getInstancesFromControlPlane } from '$lib/controllers/httpController';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import { kInstancesTableHeader } from '$lib/utils/constants/oysterConstants';
	import { chevronDown } from 'svelte-awesome/icons';
	import refresh from 'svelte-awesome/icons/refresh';
	import { slide } from 'svelte/transition';

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowMini
	};

	export let tableData: CPUrlDataModel[] = [];

	let isOpen = false;
</script>

<InputCardWithEndButton styleClass={'mt-4'} title={'Details'}>
	{#if isOpen}
		<div
			transition:slide={{ duration: 400 }}
			class="w-full max-h-40 overflow-y-auto overflow-x-hidden"
		>
			<Table tableHeading={kInstancesTableHeader} headingStyleClass={'text-xs'} iconWidth={13}>
				<tbody slot="tableBody">
					{#each tableData as row}
						<tr>
							<td class={styles.tableCell}>{row.instanceType}</td>
							<td class={styles.tableCell}>{row.region}</td>
							<td class={styles.tableCell}>{row.min_rate}</td>
						</tr>
					{/each}
				</tbody>
			</Table>
		</div>
	{/if}
	<svelte:fragment slot="titleEndButton">
		{#if $connected}
			<CollapseButton
				{isOpen}
				onclick={() => {
					isOpen = !isOpen;
				}}
			/>
		{:else}
			<CollapseButton
				onclick={() => {
					addToast({
						message: 'Please connect your wallet.',
						variant: 'error'
					});
				}}
			/>
		{/if}
	</svelte:fragment>
</InputCardWithEndButton>
