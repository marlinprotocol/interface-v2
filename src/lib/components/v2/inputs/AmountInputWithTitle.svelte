<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import Text from '$lib/atoms/v2/texts/Text.svelte';
	import AmountInput from '$lib/components/v2/inputs/AmountInput.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let title: string;
	export let disabled = false;
	export let inputAmountString = '';
	export let handleUpdatedAmount = (e: Event) => {};
	export let prefix = '';
	export let suffix = '';
	export let onlyInteger = false;
	export let id = '';

	const onFocusStyle = 'left-[12px] leading-[1px] top-[-20px] font-normal';
	const titleStyleInit =
		'absolute cursor-text bg-white font-poppins text-sm text-[#030115] transition-all';

	let titleStyle = onFocusStyle;

	const handleChange = (e: any) => {
		handleUpdatedAmount(e);
	};
</script>

<InputCard variant="search" styleClass="border border-[#D9DADE]">
	<div class="relative flex flex-1 flex-col">
		<button class={cn(titleStyle, titleStyleInit)} id="title-{id}">
			{title}
		</button>
	</div>
	<div class="flex items-center">
		{#if !!prefix.length}
			<Text text={prefix} styleClass="text-sm text-[#030115] mt-1" />
		{/if}

		<AmountInput
			{id}
			bind:value={inputAmountString}
			onChange={handleChange}
			styleClass="input input-ghost min-w-[20px] w-full input-primary text-sm p-0 ml-0.5 placeholder:text-primary/[.2] h-[30px] mt-1"
			{onlyInteger}
			{disabled}
		/>
		{#if !!suffix.length}
			<Text text={suffix} styleClass="text-sm text-primary ml-1 " />
		{/if}

		<div class="w-fit">
			<slot name="endButton" />
		</div>
	</div>
</InputCard>
