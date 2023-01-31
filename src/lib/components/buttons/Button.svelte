<script lang="ts">
	import type { ButtonModel } from '$lib/types/componentTypes';
	import ErrorButton from './ErrorButton.svelte';
	import FilledButton from './FilledButton.svelte';
	import OutlinedButton from './OutlinedButton.svelte';

	export let variant: ButtonModel['variant'] = 'filled';
	export let onclick: ButtonModel['onclick'] = () => {};

	export const styleClass = '';
	const buttonClass = () => {
		switch (variant) {
			case 'filled':
				return FilledButton;
			case 'outlined':
				return OutlinedButton;
			case 'error':
				return ErrorButton;
			default:
				return FilledButton;
		}
	};
	const ButtonType = buttonClass();
</script>

{#if !!ButtonType}
	<ButtonType {onclick} {styleClass}>
		<slot />
	</ButtonType>
{/if}
