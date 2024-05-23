<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
	export let styleClass = '';
	export let firstRow: boolean = false;
</script>

<td class={cn(styleClass, firstRow ? 'pl-4' : '')} data-testid="table-data-with-button">
	<div class={tableClasses.row}>
		<div class="m-auto flex h-[35px] items-center">
			<slot name="line1" />
		</div>
	</div>
</td>
