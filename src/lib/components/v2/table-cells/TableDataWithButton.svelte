<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
	export let styleClass = '';
	export let firstRow: boolean = false;
</script>

<td class={cn(styleClass, firstRow ? 'pl-4' : '', 'h-[64px]')} data-testid="table-data-with-button">
	<div class={tableCellClasses.rowNormal}>
		<div class="m-auto flex h-[35px] items-center">
			<slot name="line1" />
		</div>
		<div class="flex h-[18px] items-center pt-[10px]">
			<slot name="line2" />
		</div>
	</div>
</td>
