<script lang="ts">
	import type { ButtonModel } from '$lib/types/componentTypes';
	import { getButtonStyles } from '$lib/utils/helpers/componentHelper';
	import { getButtonSize } from '$lib/utils/helpers/componentHelper';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onclick: ButtonModel['onclick'] = undefined;
	export let disabled = false;
	export let loading = false;
	export let id = '';

	const buttonStyles = getButtonStyles(variant);
	const buttonSize = getButtonSize(size);
</script>

{#if variant.includes('icon')}
	<button
		{id}
		{disabled}
		on:click={onclick}
		class={cn('gap-1.5', buttonSize, buttonStyles, styleClass)}
	>
		{#if loading}
			<span data-testid="loading-spinner-icon" class="loading loading-spinner loading-sm" />
		{:else}
			<slot />
		{/if}
	</button>
{:else}
	<button
		{id}
		{disabled}
		on:click={onclick}
		class={cn('gap-1.5', buttonSize, buttonStyles, styleClass)}
	>
		{#if loading}
			<span data-testid="loading-spinner" class="loading loading-spinner loading-sm" />
		{/if}
		<slot />
	</button>
{/if}
