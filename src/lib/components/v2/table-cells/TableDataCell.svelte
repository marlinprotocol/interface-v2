<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
	export let styleClass = '';
</script>

<td class={cn(tableCellClasses.rowNormal, styleClass)} data-testid="table-data-cell">
	<slot />
</td>
