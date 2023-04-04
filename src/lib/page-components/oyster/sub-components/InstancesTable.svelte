<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { kInstancesTableHeader } from '$lib/utils/constants/oysterConstants';
	import refresh from 'svelte-awesome/icons/refresh';

	const styles = {
		docButton: 'text-primary font-medium',
		tableCell: tableCellClasses.rowMini
	};

	const registered = false;
	const tableData = [
		{
			instanceType: 't3.small',
			region: 'US East',
			price: '0.0001'
		},
		{
			instanceType: 't3.small',
			region: 'EMEA',
			price: '0.00013'
		},
		{
			instanceType: 't3.small',
			region: 'US West',
			price: '0.00028'
		},
		{
			instanceType: 't3.small',
			region: 'EMEA',
			price: '0.00013'
		},
		{
			instanceType: 't3.small',
			region: 'US West',
			price: '0.00028'
		},
		{
			instanceType: 't3.small',
			region: 'EMEA',
			price: '0.00013'
		},
		{
			instanceType: 't3.small',
			region: 'US West',
			price: '0.00028'
		}
	];
</script>

<InputCardWithEndButton styleClass={'mt-4'} title={'Details'}>
	<div class="w-full max-h-40 overflow-y-auto overflow-x-hidden">
		<Table tableHeading={kInstancesTableHeader} headingStyleClass={'text-xs'} iconWidth={13}>
			<tbody slot="tableBody">
				{#each tableData as row}
					<tr>
						<td class={styles.tableCell}>{row.instanceType}</td>
						<td class={styles.tableCell}>{row.region}</td>
						<td class={styles.tableCell}>{row.price}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</div>
	<svelte:fragment slot="titleEndButton">
		{#if $connected}
			<ModalButton disabled={!registered} variant="text" size="tiniest" modalFor={''}>
				<Icon data={refresh} size={18} />
			</ModalButton>
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
