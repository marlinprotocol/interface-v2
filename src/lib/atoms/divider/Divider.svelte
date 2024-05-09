<script lang="ts">
	import type { DividerDirection } from '$lib/types/componentTypes';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import {
		getDividerColor,
		getDividerHeight,
		getDividerWidth
	} from '$lib/utils/helpers/componentHelper';

	export let direction: DividerDirection = 'divider-horizontal';
	export let margin = 'my-0';
	export let color: string = '';
	export let height: string = '';
	export let width: string = '';

	$: dividerHeight = height !== '' ? height : getDividerHeight(direction);
	$: dividerWidth = width !== '' ? width : getDividerWidth(direction);
	$: dividerColor = color !== '' ? color : getDividerColor(direction);
</script>

<div
	class={cn(dividerHeight, dividerWidth, dividerColor, margin, 'shrink-0')}
	data-testid="divider"
/>
