<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import AmountInput from '$lib/components/inputs/AmountInput.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let title: string;
	export let disabled = false;
	export let inputAmountString = '';
	export let handleUpdatedAmount = (e: Event) => {};
	export let prefix = '';
	export let suffix = '';
	export let onlyInteger = false;
	export let id = '';
	export let styleClass = '';
	export let placeholder = '';
</script>

<InputCard variant="search" styleClass="border border-grey-100 relative">
	{#if title}
		<p
			class="absolute left-7 top-[-1px] z-[1] inline-flex bg-base-100 font-poppins text-sm font-normal leading-[1px] text-grey-800"
		>
			{title}
		</p>
	{/if}

	<div class="mt-1 flex items-center">
		{#if !!prefix.length}
			<Text text={prefix} styleClass="text-sm text-grey-800" />
		{/if}

		<AmountInput
			{id}
			bind:value={inputAmountString}
			onChange={handleUpdatedAmount}
			styleClass={cn(inputClasses.inputText, styleClass)}
			{onlyInteger}
			{disabled}
			{placeholder}
		/>
		{#if !!suffix.length}
			<Text text={suffix} styleClass="text-sm text-primary ml-1 " />
		{/if}

		<div class="w-fit">
			<slot name="endButton" />
		</div>
	</div>
</InputCard>
