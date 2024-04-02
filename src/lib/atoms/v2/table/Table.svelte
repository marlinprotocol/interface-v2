<script lang="ts">
	import TableHeadingText from '$lib/components/v2/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';

	export let tableHeading: TableModel['header'][];
	export let styleClass = '';
	export let headingStyleClass = '';
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	export let iconWidth = '16px';
	export let tablePadding = 'px-8 pb-6';
</script>

<div
	data-testid="table-container"
	class="overflow-x-auto overflow-y-hidden {tablePadding} {styleClass}"
>
	<table class="w-full overflow-hidden rounded-[18px] text-center">
		<thead class="w-full bg-[#F0F0F0]">
			<tr>
				{#each tableHeading as columnHeading, i}
					<th class="py-[26px]">
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
