<script lang="ts">
	import type { CommonVariant } from '$lib/types/componentTypes';
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';

	export let variant: CommonVariant = 'primary';
	export let styleClass = '';

	const color = getColorHexByVariant(variant);
	$: style = `${styleClass} w-5 h-5 rounded-full mx-auto`;
</script>

<div class={style} style={`background-color:${color}`} />
