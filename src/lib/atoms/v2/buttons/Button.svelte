<script lang="ts">
	import type { ButtonModel } from '$lib/types/componentTypes';
	import { getButtonSize, getButtonStyles } from '$lib/utils/helpers/componentHelper';

	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onclick: ButtonModel['onclick'] = undefined;
	export let disabled = false;
	export let loading = false;

	const buttonStyles = getButtonStyles(variant);
	const buttonSize = getButtonSize(size);

	$: buttonStyleClass = `${styleClass} ${buttonSize} ${buttonStyles} gap-1.5 !rounded-[100.86px]`;
</script>

<button {disabled} on:click={onclick} class={buttonStyleClass}>
	{#if loading}
		<span data-testid="loading-spinner" class="loading loading-spinner loading-sm" />
	{/if}
	<slot />
</button>
