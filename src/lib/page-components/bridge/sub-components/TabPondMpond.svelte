<script lang="ts">
	import Chip from '$lib/atoms/chip/Chip.svelte';
	import type { AppVariant } from '$lib/types/componentTypes';

	export let firstText: string;
	export let secondText: string;
	export let variant: AppVariant;
</script>

<Chip {variant}>
	{firstText}
	<img
		src="/images/arrowicon.svg"
		alt="Copy"
		class={variant === 'secondary' ? 'secondary-img' : ''}
	/>
	{secondText}
</Chip>

<style>
	.secondary-img {
		filter: invert(54%) sepia(6%) saturate(105%) hue-rotate(202deg) brightness(89%) contrast(84%);
	}
</style>
