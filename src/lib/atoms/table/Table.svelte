<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { tableCellClasses } from '../componentClasses';

	export let tableHeading: TableModel['header'][];
	export let styleClass = '';
	export let headingStyleClass = '';
	export let handleSortData: (() => void) | undefined = undefined;
	export let iconWidth = 16;
</script>

<div class="overflow-x-auto overflow-y-hidden px-8 py-6">
	<table class={styleClass}>
		<thead>
			<tr>
				{#each tableHeading as columnHeading, i}
					<th class={`w-[${100 / tableHeading.length}%] ${tableCellClasses.heading}`}>
						<TableHeadingText
							styleClass={headingStyleClass}
							{iconWidth}
							heading={columnHeading}
							{handleSortData}
							tooltipDirection={i === tableHeading.length - 1
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
