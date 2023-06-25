<script lang="ts">
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { tableCellClasses } from '$lib/atoms/componentClasses';

	export let tableHeading: TableModel['header'][];
	export let headingStyleClass = '';
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	export let iconWidth = '16px';
	export let widthFunction: (id: string) => string;
</script>

<div class="overflow-y-hidden py-6">
	<div class={`flex gap-1 px-8`}>
		{#each tableHeading as columnHeading, i}
			<div class={`${tableCellClasses.heading}`} style={`width:${widthFunction(columnHeading.id)}`}>
				<TableHeadingText
					heading={columnHeading}
					handleSortData={() => handleSortData?.(columnHeading.id)}
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
