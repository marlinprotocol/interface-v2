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

	$: buttonStyleClass = `${styleClass} ${buttonSize} ${buttonStyles} gap-1.5`;
</script>

<button {disabled} on:click={onclick} class={buttonStyleClass}>
	<!-- {#if icon}
		<Icon data={icon} size={14} iconColorClass="icon-white" />
	{/if}
	{#if !!iconSrc}
		<img src={iconSrc} alt="Icon" width={16} />
	{/if} -->
	{#if loading}
		<span class="loading loading-spinner loading-sm" />
	{/if}
	<slot />
</button>
