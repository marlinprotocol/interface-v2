<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
	export let styleClass = '';
</script>

<td class={cn(tableClasses.row, styleClass)} data-testid="table-data-cell">
	<slot />
</td>
