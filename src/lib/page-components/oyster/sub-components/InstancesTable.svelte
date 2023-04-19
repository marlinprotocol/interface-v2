<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';

	import Table from '$lib/atoms/table/Table.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import { getInstancesFromControlPlane } from '$lib/controllers/httpController';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import { kInstancesTableHeader } from '$lib/utils/constants/oysterConstants';
	import refresh from 'svelte-awesome/icons/refresh';

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowMini
	};

	export let updatedCpURL: string = '';
	export let validCPUrl: boolean = false;
	export let tableData: CPUrlDataModel[] = [];

	const onRefresh = async () => {
		try {
			tableData = await getInstancesFromControlPlane(updatedCpURL);
		} catch (error) {
			console.log(error);
			tableData = [];
		}
	};
</script>

<InputCardWithEndButton styleClass={'mt-4'} title={'Details'}>
	<div class="w-full max-h-40 overflow-y-auto overflow-x-hidden">
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
	<svelte:fragment slot="titleEndButton">
		{#if $connected}
			<Button onclick={onRefresh} disabled={!validCPUrl} variant="text" size="tiniest">
				<Icon data={refresh} size={18} />
			</Button>
		{:else}
			<button
				type="button"
				on:click={() => {
					addToast({
						message: 'Please connect your wallet.',
						variant: 'error'
					});
				}}
			>
				<Icon data={refresh} size={18} />
			</button>
		{/if}
	</svelte:fragment>
</InputCardWithEndButton>
