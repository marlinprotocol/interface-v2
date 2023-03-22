<script lang="ts">
	import ErrorButton from '$lib/atoms/buttons/ErrorButton.svelte';
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import OutlinedButton from '$lib/atoms/buttons/OutlinedButton.svelte';
	import type { ButtonModel } from '$lib/types/componentTypes';
	import GreyFilledButton from './GreyFilledButton.svelte';
	import InfoButton from './InfoButton.svelte';
	import TextButton from './TextButton.svelte';
	import WhiteFilledButton from './WhiteFilledButton.svelte';

	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onclick: ButtonModel['onclick'];
	export let disabled = false;
	export let loading = false;

	const buttonClass = () => {
		switch (variant) {
			case 'filled':
				return FilledButton;
			case 'outlined':
				return OutlinedButton;
			case 'error':
				return ErrorButton;
			case 'text':
				return TextButton;
			case 'info':
				return InfoButton;
			case 'greyFilled':
				return GreyFilledButton;
			case 'whiteFilled':
				return WhiteFilledButton;
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
				return 'h-14 text-base font-semibold w-full';
			default:
				return 'h-10';
		}
	};
	const ButtonType = buttonClass();
	const buttonSize = getButtonSize();
</script>

{#if ButtonType}
	<ButtonType {onclick} {disabled} {loading} styleClass={`${styleClass} ${buttonSize}`}>
		<slot />
	</ButtonType>
{/if}
