<script lang="ts">
	import InputCardWithEndButton from '$lib/components/inputs/InputCardWithEndButton.svelte';

	export let styleClass: string = '';
	export let tooltipText: string = '';
	export let title: string;
	export let placeholder: string = '';

	export let input: string;

	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary disabled:placeholder:text-primary/[.3] focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};
</script>

<InputCardWithEndButton {styleClass} {tooltipText} {title}>
	<input
		bind:value={input}
		id="address-display"
		class={`hideInputNumberAppearance ${styles.inputNumber}`}
		{placeholder}
		disabled={true}
	/>
	<slot name="endButton" />
</InputCardWithEndButton>
