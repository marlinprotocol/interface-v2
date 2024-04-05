<script lang="ts">
	import type { ButtonModel } from '$lib/types/componentTypes';
	import { getButtonSize, getButtonStyles } from '$lib/utils/helpers/componentHelper';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onclick: ButtonModel['onclick'] = undefined;
	export let disabled = false;
	export let loading = false;

	const buttonStyles = getButtonStyles(variant);
	const buttonSize = getButtonSize(size);

	$: buttonStyleClass = cn('gap-1.5 !rounded-[100.86px]', styleClass, buttonSize, buttonStyles);
</script>

<button {disabled} on:click={onclick} class={buttonStyleClass}>
	{#if loading}
		<span data-testid="loading-spinner" class="loading loading-spinner loading-sm" />
	{/if}
	<slot />
</button>
