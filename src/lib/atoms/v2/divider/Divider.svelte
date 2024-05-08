<script lang="ts">
	import type { DividerDirection } from '$lib/types/v2/componentTypes';
	import {
		getDividerColor,
		getDividerHeight,
		getDividerWidth
	} from '$lib/utils/v2/helpers/componentHelper';

	export let direction: DividerDirection = 'divider-horizontal';
	export let margin = 'my-0';
	export let color: string = '';
	export let height: string = '';
	export let width: string = '';

	$: dividerHeight = height !== '' ? height : getDividerHeight(direction);
	$: dividerWidth = width !== '' ? width : getDividerWidth(direction);
	$: dividerColor = color !== '' ? color : getDividerColor(direction);
</script>

<div class="{dividerHeight} {dividerWidth} {dividerColor} {margin}" data-testid="divider" />
