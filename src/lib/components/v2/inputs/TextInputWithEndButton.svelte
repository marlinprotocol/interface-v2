<script lang="ts">
	import { inputClasses } from '$lib/atoms/componentClasses';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';

	export let styleClass = '';
	export let tooltipText = '';
	export let title: string;
	export let placeholder = '';
	export let disabled = false;
	export let input: string;
</script>

<InputCardWithEndButton {styleClass} {tooltipText} {title}>
	<input
		id="address-display"
		bind:value={input}
		class="hideInputNumberAppearance {inputClasses.inputText}"
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
