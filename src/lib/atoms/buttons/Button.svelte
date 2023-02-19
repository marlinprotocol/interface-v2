<script lang="ts">
	import type { ButtonModel } from '$lib/types/componentTypes';
	import ErrorButton from '$lib/atoms/buttons/ErrorButton.svelte';
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import OutlinedButton from '$lib/atoms/buttons/OutlinedButton.svelte';

	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onclick: ButtonModel['onclick'] = () => {};
	export let disabled: boolean = false;

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
	const getButtonSize = () => {
		switch (size) {
			case 'small':
				return 'h-11';
			case 'medium':
				return 'h-12';
			case 'large':
				return 'h-14';
			default:
				return 'h-10';
		}
	};
	const ButtonType = buttonClass();
	const buttonSize = getButtonSize();
</script>

{#if !!ButtonType}
	<ButtonType {onclick} {disabled} styleClass={`${styleClass} ${buttonSize}`}>
		<slot />
	</ButtonType>
{/if}
