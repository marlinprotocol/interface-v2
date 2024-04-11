<script lang="ts">
	import TableHeadingText from '$lib/components/v2/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let tableHeading: TableModel['header'][];
	export let styleClass = '';
	export let headingStyleClass = '';
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	export let iconWidth = '16px';
</script>

<div data-testid="table-container" class={styleClass}>
	<table class="w-full rounded-[18px] text-center">
		<thead class="w-full">
			<tr>
				{#each tableHeading as columnHeading, i}
					<th class="bg-[#F0F0F0] py-[26px] first:rounded-tl-[18px] last:rounded-tr-[18px]">
						<TableHeadingText
							styleClass={cn(headingStyleClass, i === 0 ? 'ml-4' : '')}
							heading={columnHeading}
							placement={i > tableHeading.length - 3 ? 'left' : i === 0 ? 'right' : 'bottom'}
							{handleSortData}
							{iconWidth}
						/>
					</th>
				{/each}
			</tr>
		</thead>
		<slot name="tableBody" />
	</table>
</div>
