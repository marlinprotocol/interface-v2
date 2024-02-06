<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	export let styleClass = '';
</script>

<td class="pb-8 pt-6 {styleClass} {tableCellClasses.row}" data-testid="table-data-with-button">
	<div class={tableCellClasses.rowWithIcon}>
		<div class="m-auto flex h-[35px] items-center">
			<slot name="line1" />
		</div>
		<div class="flex h-[18px] items-center pt-[10px]">
			<slot name="line2" />
		</div>
	</div>
</td>
