<script lang="ts">
	import type { TableModel } from '$lib/types/componentTypes';
	import { tableCellClasses } from '../componentClasses';
	import TooltipIcon from '../tooltips/TooltipIcon.svelte';

	export let tableHeading: TableModel['header'][];
	export let styleClass: string = '';
	export let handleSortData: () => void;
</script>

<table class={`card max-w-full bg-base-100 rounded-lg px-6 py-4 ${styleClass}`}>
	<thead>
		<tr>
			{#each tableHeading as columnHeading}
				<th class={tableCellClasses.heading}>
					<div class="flex justify-center items-center gap-0.5">
						{#if columnHeading.sorting}
							<button on:click={handleSortData}>
								<img src="/images/sort.svg" alt="sort" width="14px" />
							</button>
						{/if}
						{columnHeading.title}
						{#if !!columnHeading.tooltipText}
							<TooltipIcon
								iconWidth={16}
								styleClass="ml-1"
								iconSrc="/images/alert.svg"
								tooltipText={columnHeading.tooltipText}
								tooltipDirection="tooltip-bottom"
							/>
						{/if}
					</div>
				</th>
			{/each}
		</tr>
	</thead>
	<slot name="tableBody" />
</table>

<style>
	table {
		width: fit-content;
		text-align: center;
	}
</style>
