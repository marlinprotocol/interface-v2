<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import { inventoryData, kOysterInventoryTableHeader } from '$lib/utils/constants/oysterConstants';
	import CreateOrderModal from './CreateOrderModal.svelte';
	import InventoryTable from './InventoryTable.svelte';
	import InventoryTableRow from './InventoryTableRow.svelte';
	let input = '';
</script>

<PageTitle title={'My Active Orders'}>
	<svelte:fragment slot="button">
		<Button variant="outlined" size="tiny" onclick={() => {}}>Guide</Button>
	</svelte:fragment>
</PageTitle>
<div class="flex gap-4 items-center mb-6 max-w-4xl">
	<SearchBar bind:input placeholder={'Search for Operator'} />
	<Button variant="outlined" onclick={() => {}}>History</Button>
	<ModalButton variant="outlined" modalFor={'create-new-order'}>+ Add Order</ModalButton>
</div>
<InventoryTable handleSortData={() => {}} tableHeading={kOysterInventoryTableHeader}>
	{#if inventoryData?.length}
		{#each inventoryData as rowData, rowIndex}
			<InventoryTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
	<!-- TODO: paginatipn -->
</InventoryTable>
<CreateOrderModal modalFor="create-new-order" />
