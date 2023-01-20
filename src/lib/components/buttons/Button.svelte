<script lang="ts">
	import type { ButtonModel } from '$lib/types/atomTypes';
	import ErrorButton from './ErrorButton.svelte';
	import PrimaryButton from './PrimaryButton.svelte';
	import SecondaryButton from './SecondaryButton.svelte';

	export let variant: ButtonModel['variant'] = 'primary';
	export let onclick = () => {};
	export const styleClass = '';
	const buttonClass = () => {
		switch (variant) {
			case 'primary':
				return PrimaryButton;
			case 'secondary':
				return SecondaryButton;
			case 'error':
				return ErrorButton;
			default:
				return PrimaryButton;
		}
	};
	const ButtonType = buttonClass();
</script>

{#if !!ButtonType}
	<ButtonType {onclick} {styleClass}>
		<slot />
	</ButtonType>
{/if}
