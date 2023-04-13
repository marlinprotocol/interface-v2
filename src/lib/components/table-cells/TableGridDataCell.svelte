<script lang="ts">
	import { tableCellClasses } from '$lib/atoms/componentClasses';
	export let styleClass = '';
	export let width = '';
</script>

<div class={`${styleClass} ${tableCellClasses.rowNormal}`} style={`width:${width}`}>
	<slot />
</div>
