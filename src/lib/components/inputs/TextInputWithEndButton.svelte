<script lang="ts">
	import InputCardWithEndButton from './InputCardWithEndButton.svelte';

	export let styleClass: string = '';
	export let tooltipText: string = '';
	export let title: string;
	export let placeholder: string = '';

	export let input: string;

	$: fontSize = input.length > 35 ? 'text-lg' : 'text-xl';

	const styles = {
		inputNumber: `input input-ghost h-[30px] w-full mt-1 p-0 font-semibold disabled:text-primary disabled:placeholder:text-primary/[.3] focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent`
	};
</script>

<InputCardWithEndButton {styleClass} {tooltipText} {title}>
	<input
		bind:value={input}
		id="address-display"
		class={`hideInputNumberAppearance ${fontSize} ${styles.inputNumber}`}
		{placeholder}
		disabled={true}
	/>
	<svelte:fragment slot="titleEndButton">
		<slot name="titleEndButton" />
	</svelte:fragment>
	<svelte:fragment slot="endButton">
		<slot name="endButton" />
	</svelte:fragment>
</InputCardWithEndButton>
