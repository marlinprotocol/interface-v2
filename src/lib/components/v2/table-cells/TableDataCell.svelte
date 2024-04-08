<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	export let styleClass = '';
</script>

<td class="{styleClass} {tableCellClasses.rowNormal}" data-testid="table-data-cell">
	<slot />
</td>
