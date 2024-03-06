<script lang="ts">
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';

	export let tableHeading: TableModel['header'][];
	export let styleClass = '';
	export let headingStyleClass = '';
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	export let iconWidth = '16px';
	export let tablePadding = 'px-8 py-6';
</script>

<div
	data-testid="table-container"
	class="overflow-x-auto overflow-y-hidden {tablePadding} {styleClass}"
>
	<table class="w-full text-center">
		<thead class="w-full">
			<tr>
				{#each tableHeading as columnHeading, i}
					<th>
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
