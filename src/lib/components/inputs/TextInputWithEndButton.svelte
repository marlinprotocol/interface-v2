<script lang="ts">
	import { inputClasses } from '$lib/atoms/componentClasses';
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let styleClass = '';
	export let title = '';
	export let placeholder = '';
	export let disabled = false;
	export let input: string;

	const titleStyleInit =
		'absolute cursor-text px-1 font-poppins text-sm text-[#030115] transition-all';
	const onBlurStyle = 'top-[50%] left-10% font-medium bg-transparent translate-y-[-50%]';
	const onFocusStyle = 'left-10% top-[-10px] hidden font-normal bg-white';
	let titleStyle = onFocusStyle;
	export let label: string = '';
	export let showTitle: boolean = false;

	const onFocus = () => {
		titleStyle = onFocusStyle;
	};
	const onBlur = () => {
		if (!input.length) {
			titleStyle = onBlurStyle;
		} else {
			onFocus();
		}
	};
	if (!disabled) {
		titleStyle = onBlurStyle;
	}
	$: if (!!input.length) {
		titleStyle = onFocusStyle;
	}
</script>

<InputCardWithEndButton
	{showTitle}
	{label}
	variant="v2Input"
	{title}
	styleClass={cn(styleClass, 'relative')}
>
	{#if !!title.length}
		<button class={cn(titleStyle, titleStyleInit)}>
			{title}
		</button>
	{/if}
	<input
		id="address-display"
		bind:value={input}
		on:focus={onFocus}
		on:blur={onBlur}
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
