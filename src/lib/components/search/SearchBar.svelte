<script lang="ts">
	import search from 'svelte-awesome/icons/search';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/componentClasses';

	export let input: string;
	export let placeholder = '';
	export let disabled = false;
	export let styleClass = '';
	export let onSearchClick: (() => void) | undefined = undefined;

	const styles = {
		inputNumber: `input input-ghost h-[30px] w-full p-0 text-base font-normal disabled:text-primary disabled:placeholder:text-primary/[.3] focus-within:text-primary placeholder:text-primary/[.2] placeholder:text-base`
	};
</script>

<InputCard variant="search" styleClass={`${styleClass} flex gap-4 items-center`}>
	<Icon styleClass="opacity: .2" data={search} size={18} iconColorClass={'icon-info'} />
	<input
		prefix="0x"
		bind:value={input}
		on:click={(e) => onSearchClick?.()}
		id="address-display"
		class={`hideInputNumberAppearanc ${inputClasses.searchInputText}`}
		{placeholder}
		{disabled}
	/>
</InputCard>
