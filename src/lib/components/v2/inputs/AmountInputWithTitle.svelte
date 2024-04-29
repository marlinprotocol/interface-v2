<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import AmountInput from '$lib/components/v2/inputs/AmountInput.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let title: string;
	export let disabled = false;
	export let inputAmountString = '';
	export let handleUpdatedAmount = (e: Event) => {};
	export let onFocusOut = () => {};
	export let prefix = '';
	export let suffix = '';
	export let onlyInteger = false;
	export let id = '';
	export let showLabelFocused: boolean = false;

	const onBlurStyle = 'top-0 left-0 mt-1.5 font-medium';
	const onFocusStyle = ' left-[12px] top-[-20px] mb-4 font-light';
	const titleStyleInit =
		'absolute  cursor-text bg-white px-1 font-poppins  text-sm text-[#030115] transition-all';

	let titleStyle = onFocusStyle;

	const onFocus = () => {
		titleStyle = onFocusStyle;
	};

	function onBlurAction() {
		if (!inputAmountString.length) {
			titleStyle = onBlurStyle;
		} else {
			titleStyle = onFocusStyle;
		}
	}

	const onBlur = () => {
		if (showLabelFocused) return;
		onBlurAction();
	};

	const handleChange = (e: any) => {
		handleUpdatedAmount(e);
		if (e && e.target && e.target.id && e.target.id === 'pond-input-amount-Duration') {
			const elementToFocus: HTMLElement | null = document.getElementById(`title-cost`);
			if (!!inputAmountString.length && elementToFocus) {
				elementToFocus.className = ` ${onFocusStyle} ${titleStyleInit}`;
			} else if (elementToFocus) {
				elementToFocus.className = ` ${onBlurStyle} ${titleStyleInit}`;
			}
		}
	};

	function focusElement() {
		const eleToFocus: HTMLElement | null = document.getElementById(`pond-input-amount-${id}`);
		if (eleToFocus) {
			eleToFocus.focus();
		}
	}
	if (!disabled) {
		titleStyle = onBlurStyle;
	}
	if (showLabelFocused) {
		titleStyle = onFocusStyle;
	}
</script>

<InputCard variant="search" styleClass="border border-[#D9DADE]">
	<div class="relative flex flex-1 flex-col">
		<button class={cn(titleStyle, titleStyleInit)} id="title-{id}" on:click={focusElement}>
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
			{onFocusOut}
			{onlyInteger}
			{disabled}
			{onFocus}
			{onBlur}
		/>
		{#if !!suffix.length}
			<Text text={suffix} styleClass="text-sm text-primary ml-1 " />
		{/if}

		<div class="w-fit">
			<slot name="endButton" />
		</div>
	</div>
</InputCard>
