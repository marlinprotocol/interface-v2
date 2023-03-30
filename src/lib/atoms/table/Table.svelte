<script lang="ts">
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { tableCellClasses } from '../componentClasses';

	export let tableHeading: TableModel['header'][];
	export let styleClass = '';
	export let handleSortData: (() => void) | undefined = undefined;
</script>

<div class="overflow-x-auto overflow-y-hidden">
	<table class={styleClass}>
		<thead>
			<tr>
				{#each tableHeading as columnHeading, i}
					<th class={`w-[${100 / tableHeading.length}%] ${tableCellClasses.heading}`}>
						<div class="flex justify-center items-center gap-0.5">
							{#if columnHeading.sorting}
								<button on:click={handleSortData}>
									<img src="/images/sort.svg" alt="sort" width="14px" />
								</button>
							{/if}
							<TableHeadingText
								title={columnHeading.title}
								tooltipText={columnHeading.tooltipText}
								tooltipDirection={i === tableHeading.length - 1
									? 'tooltip-left'
									: i === 0
									? 'tooltip-right'
									: 'tooltip-bottom'}
							/>
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<slot name="tableBody" />
	</table>
</div>

<style>
	table {
		width: 100%;
		text-align: center;
	}

	thead {
		width: 100%;
	}
</style>
