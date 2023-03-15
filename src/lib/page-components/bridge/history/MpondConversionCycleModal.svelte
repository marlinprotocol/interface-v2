<script lang="ts">
	import LoadingCircular from '$lib/atoms/loading/LoadingCircular.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Table from '$lib/atoms/table/Table.svelte';
	import TableDataWithButton from '$lib/components/table-cells/TableDataWithButton.svelte';
	import type { MpondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import { mpondConversionCycleTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';

	export let loading: boolean = false;
	export let cycles: MpondEligibleCyclesModel[];

	export let modalFor: string;

	const nowTime = Date.now() / 1000;
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{'Conversion History'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<Table tableHeading={mpondConversionCycleTableHeader}>
			<tbody slot="tableBody">
				{#if loading}
					<div class={'w-full text-center flex justify-center'}>
						<LoadingCircular />
					</div>
				{:else}
					{#each cycles as rowData}
						<tr>
							<TableDataWithButton styleClass="text-sm">
								{#if nowTime > rowData?.timestamp}
									<img src="/images/vectorcheck.svg" alt="Copy" width="20px" height="20px" />
								{:else}
									<img src="/images/timerclock.svg" alt="Copy" width="20px" height="20px" />
								{/if}
								{`${bigNumberToCommaString(rowData?.totalEligible)} / ${bigNumberToCommaString(
									rowData?.netPending
								)}`}
							</TableDataWithButton>
							<TableDataWithButton>
								<!-- TODO: check if we should add HH:mm here -->
								{nowTime > rowData?.timestamp
									? 'Ready to claim'
									: epochSecToString(rowData?.timestamp)}
							</TableDataWithButton>
						</tr>
					{/each}
				{/if}
			</tbody>
		</Table>
	</svelte:fragment>
</Modal>
