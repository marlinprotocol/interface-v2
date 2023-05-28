<script lang="ts">
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { tableCellClasses } from '../componentClasses';

	export let tableHeading: TableModel['header'][];
	export let styleClass = '';
	export let headingStyleClass = '';
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	export let iconWidth = '16px';
	export let tablePadding = 'px-8 py-6';
	export let headingWidth: string | undefined = undefined;
</script>

<div class={`${styleClass} overflow-x-auto overflow-y-hidden ${tablePadding}`}>
	<table>
		<thead>
			<tr>
				{#each tableHeading as columnHeading, i}
					<th
						class={`${headingWidth ? headingWidth : `w-[${100 / tableHeading.length}%]`} ${
							tableCellClasses.heading
						}`}
					>
						<TableHeadingText
							styleClass={headingStyleClass}
							{iconWidth}
							heading={columnHeading}
							{handleSortData}
							tooltipDirection={i > tableHeading.length - 3
								? 'tooltip-left'
								: i === 0
								? 'tooltip-right'
								: 'tooltip-bottom'}
						/>
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
