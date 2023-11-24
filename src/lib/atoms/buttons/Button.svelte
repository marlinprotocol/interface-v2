<script lang="ts">
	import type { ButtonModel } from '$lib/types/componentTypes';
	import { buttonClasses } from '../componentClasses';

	export let variant: ButtonModel['variant'] = 'filled';
	export let size: ButtonModel['size'] = 'medium';
	export let styleClass = '';
	export let onclick: ButtonModel['onclick'] = undefined;
	export let disabled = false;
	export let loading = false;

	const getButtonStyles = () => {
		switch (variant) {
			case 'filled':
				return buttonClasses.filled;
			case 'outlined':
				return buttonClasses.outlined;
			case 'error':
				return buttonClasses.error;
			case 'text':
				return buttonClasses.text;
			case 'info':
				return buttonClasses.lightblueFilled;
			case 'greyFilled':
				return buttonClasses.greyFilled;
			case 'whiteFilled':
				return buttonClasses.whiteFilled;
			case 'tableConvertButton':
				return buttonClasses.tableConvertButton;
			default:
				return buttonClasses.filled;
		}
	};
	const getButtonSize = () => {
		switch (size) {
			case 'tiniest':
				return '';
			case 'tiny':
				return 'h-8';
			case 'smaller':
				return 'h-9';
			case 'small':
				return 'h-10';
			case 'medium':
				return 'h-12';
			case 'large':
				return 'h-14 text-base font-semibold';
			default:
				return 'h-12';
		}
	};
	const buttonStyles = getButtonStyles();
	const buttonSize = getButtonSize();

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
