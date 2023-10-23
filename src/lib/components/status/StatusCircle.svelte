<script lang="ts">
	import type { CommonVariant } from '$lib/types/componentTypes';
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';

	export let variant: CommonVariant = 'primary';
	export let styleClass = '';

	$: style = `${styleClass}`;
</script>

<div
	class="mx-auto h-5 w-5 rounded-full {style}"
	style="background-color:${getColorHexByVariant(variant)}"
/>
