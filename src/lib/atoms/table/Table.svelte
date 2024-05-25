<script lang="ts">
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';
	import type { TableModel } from '$lib/types/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let tableHeading: TableModel['header'][];
	export let styleClass = '';
	export let headingStyleClass = '';
	export let handleSortData: ((id: string) => void) | undefined = undefined;
	export let iconWidth = '16px';
	export let roundedBorders: boolean = true;
</script>

<div data-testid="table-container" class={styleClass}>
	<table class="w-full rounded-[18px] text-center">
		<thead class="w-full">
			<tr>
				{#each tableHeading as columnHeading, i}
					<th
						class={cn('bg-[#F0F0F0] py-[26px] first:rounded-tl-[18px] last:rounded-tr-[18px]', {
							'first:rounded-tl-none': !roundedBorders
						})}
					>
						<TableHeadingText
							styleClass={cn(headingStyleClass, {
								'ml-4': i === 0,
								'text-center': i !== 0
							})}
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
