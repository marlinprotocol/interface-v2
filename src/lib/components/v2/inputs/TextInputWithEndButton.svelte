<script lang="ts">
	import { inputClasses } from '$lib/atoms/componentClasses';
	import InputCardWithEndButton from '$lib/components/v2/inputs/InputCardWithEndButton.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let styleClass = '';
	export let tooltipText = '';
	export let title = '';
	export let placeholder = '';
	export let disabled = false;
	export let input: string;
</script>

<InputCardWithEndButton {styleClass} {tooltipText} {title}>
	<input
		id="address-display"
		bind:value={input}
		class={cn(inputClasses.inputText, 'hideInputNumberAppearance')}
		{placeholder}
		{disabled}
	/>
	<svelte:fragment slot="endInfoBox">
		<slot name="endInfoBox" />
	</svelte:fragment>
	<svelte:fragment slot="titleEndButton">
		<slot name="titleEndButton" />
	</svelte:fragment>
	<svelte:fragment slot="endButton">
		<slot name="endButton" />
	</svelte:fragment>
</InputCardWithEndButton>
