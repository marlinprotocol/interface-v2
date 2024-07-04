<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let input: string;
	export let placeholder = '';
	export let disabled = false;
	export let styleClass = '';
	export let onSearchClick: (() => void) | undefined = undefined;
	export let label: string = '';
</script>

<InputCard
	variant="search"
	styleClass={cn('relative flex gap-4 items-center border border-grey-100', styleClass)}
>
	{#if label}
		<p
			class="absolute left-[18px] top-[-22%] mb-4 bg-white px-2 font-poppins text-sm font-light text-grey-800"
		>
			{label}
		</p>
	{/if}
	<img src={staticImages.searchV2Icon} alt="Search Icon" class="h-6 w-6" />
	<input
		prefix="0x"
		bind:value={input}
		on:click={(e) => onSearchClick?.()}
		id="address-display"
		class={cn(inputClasses.searchInputText, 'hideInputNumberAppearance')}
		{placeholder}
		{disabled}
	/>
</InputCard>
