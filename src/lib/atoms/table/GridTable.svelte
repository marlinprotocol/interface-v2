<script lang="ts">
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { tableCellClasses } from '../componentClasses';

	export let tableHeading: TableModel['header'][];
	export let headingStyleClass = '';
	export let handleSortData: (() => void) | undefined = undefined;
	export let iconWidth = 16;
	export let widthFunction: (id: string) => string;
</script>

<div class="overflow-y-hidden py-6 min-w-[1100px]">
	<div class={`flex gap-1 px-8`}>
		{#each tableHeading as columnHeading, i}
			<div class={`${tableCellClasses.heading}`} style={`width:${widthFunction(columnHeading.id)}`}>
				<TableHeadingText
					heading={columnHeading}
					{handleSortData}
					styleClass={headingStyleClass}
					{iconWidth}
					tooltipDirection={i === tableHeading.length - 1
						? 'tooltip-left'
						: i === 0
						? 'tooltip-right'
						: 'tooltip-bottom'}
				/>
			</div>
		{/each}
	</div>
	<slot />
</div>
