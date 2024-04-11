<script lang="ts">
	import search from 'svelte-awesome/icons/search';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';

	export let input: string;
	export let placeholder = '';
	export let disabled = false;
	export let styleClass = '';
	export let onSearchClick: (() => void) | undefined = undefined;
	export let label: string;
</script>

<InputCard
	variant="search"
	styleClass="{styleClass} relative flex gap-4 items-center border border-[#D9DADE]"
>
	{#if label}
		<p
			class="absolute left-[18px] top-[-22%] mb-4 bg-white px-2 font-poppins text-sm font-light text-[#030115]"
		>
			{label}
		</p>
	{/if}
	<img src={staticImages.searchV2Icon} alt="Search Icon" class="h-6 w-6" />
	<!-- <Icon styleClass="opacity: .2" data={search} size={18} iconColorClass="icon-info" /> -->
	<input
		prefix="0x"
		bind:value={input}
		on:click={(e) => onSearchClick?.()}
		id="address-display"
		class="hideInputNumberAppearance {inputClasses.searchInputText} placeholder-[#A8A8A8]"
		{placeholder}
		{disabled}
	/>
</InputCard>
