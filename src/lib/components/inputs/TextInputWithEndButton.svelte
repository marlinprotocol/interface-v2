<script lang="ts">
	import { inputClasses } from '$lib/atoms/componentClasses';
	import InputCardWithEndButton from './InputCardWithEndButton.svelte';

	export let styleClass: string = '';
	export let tooltipText: string = '';
	export let title: string;
	export let placeholder: string = '';
	export let disabled: boolean = false;

	export let input: string;

	const styles = {
		inputNumber: inputClasses.inputText
	};
</script>

<InputCardWithEndButton {styleClass} {tooltipText} {title}>
	<input
		bind:value={input}
		id="address-display"
		class={`hideInputNumberAppearance ${styles.inputNumber}`}
		{placeholder}
		{disabled}
	/>
	<svelte:fragment slot="titleEndButton">
		<slot name="titleEndButton" />
	</svelte:fragment>
	<svelte:fragment slot="endButton">
		<slot name="endButton" />
	</svelte:fragment>
</InputCardWithEndButton>
