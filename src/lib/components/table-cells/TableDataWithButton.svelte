<script>
	import { tableCellClasses } from '$lib/atoms/componentClasses';
</script>

<td class={tableCellClasses.row}>
	<div class={tableCellClasses.rowWithIcon}>
		<slot />
	</div>
</td>
