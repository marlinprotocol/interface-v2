<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	export let styleClass: string = '';
</script>

<td class={`${styleClass} ${tableCellClasses.row}`}>
	<div class={tableCellClasses.rowWithIcon}>
		<slot />
	</div>
</td>
