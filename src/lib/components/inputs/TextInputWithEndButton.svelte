<script lang="ts">
	import { inputClasses } from '$lib/atoms/componentClasses';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let styleClass = '';
	export let title = '';
	export let placeholder = '';
	export let disabled = false;
	export let input: string;
	export let id: string = '';
	export let label: string = '';
	export let showTitle: boolean = false;
	export let labelTooltip: string = '';
</script>

<InputCardWithEndButton
	{showTitle}
	{label}
	variant="v2Input"
	{title}
	tooltipText={labelTooltip}
	styleClass={cn(styleClass, 'relative')}
>
	<input
		id={'address-display' + id}
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
