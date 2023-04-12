<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import SearchBar from '$lib/components/search/SearchBar.svelte';
	import PageTitle from '$lib/components/texts/PageTitle.svelte';
	import {
		kInventoryData,
		kOysterInventoryTableHeader
	} from '$lib/utils/constants/oysterConstants';
	import CreateOrderModal from './CreateOrderModal.svelte';
	import OysterInventoryTable from './InventoryTable.svelte';
	import OysterInventoryTableRow from './InventoryTableRow.svelte';
	let input = '';
</script>

<PageTitle title={'My Active Orders'}>
	<svelte:fragment slot="button">
		<Button variant="outlined" size="tiny" onclick={() => {}}>GUIDE</Button>
	</svelte:fragment>
</PageTitle>
<div class="flex gap-4 items-center mb-6">
	<SearchBar bind:input placeholder={'Search for Operator'} styleClass={'max-w-2xl'} />
	<a href={`/oyster/history`}>
		<div class={`h-12 ${buttonClasses.outlined}`}>HISTORY</div>
	</a>
	<ModalButton variant="outlined" modalFor={'create-new-order'}>+ ADD ORDER</ModalButton>
</div>
<OysterInventoryTable handleSortData={() => {}} tableHeading={kOysterInventoryTableHeader}>
	{#if kInventoryData?.length}
		{#each kInventoryData as rowData, rowIndex}
			<OysterInventoryTableRow {rowData} {rowIndex} />
		{/each}
	{/if}
	<!-- TODO: paginatipn -->
</OysterInventoryTable>
<CreateOrderModal modalFor="create-new-order" />
