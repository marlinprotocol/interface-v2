<script lang="ts">
	import { tableClasses } from '$lib/atoms/v2/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
	export let styleClass = '';
</script>

<td class={cn(tableClasses.rowNormal, styleClass)} data-testid="table-data-cell">
	<slot />
</td>
