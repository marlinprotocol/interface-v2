<script lang="ts">
	import search from 'svelte-awesome/icons/search';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';

	export let input: string;
	export let placeholder: string = '';
	export let disabled: boolean = false;
	export let styleClass: string = '';

	$: fontSize = input.length > 35 ? 'text-lg' : 'text-xl';

	const styles = {
		inputNumber: `input input-ghost h-[30px] w-full p-0 text-base font-normal disabled:text-primary disabled:placeholder:text-primary/[.3] focus-within:text-primary placeholder:text-primary/[.2] placeholder:text-base focus:outline-none focus-within:border-b-2 focus:bg-transparent`
	};
</script>

<InputCard variant="search" styleClass={`${styleClass} flex gap-4 items-center`}>
	<Icon data={search} size={18} iconColorClass={'icon-info'} />
	<input class={`hideInputNumberAppearance ${fontSize} ${styles.inputNumber}`} {disabled} />
</InputCard>
