<script>
	import InputCard from '$lib/components/cards/InputCard.svelte';
	import { buttonClasses, dividerClasses } from '$lib/components/componentClasses';
	import Text from '$lib/components/texts/Text.svelte';
	import Tooltip from '$lib/components/tooltips/Tooltip.svelte';

	export let title = 'POND';
	export let tooltipText = 'Some info here';
	export let maxBalance = 10;

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center',
		rowClass: 'w-full flex items-center justify-between',
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost w-full p-0 fond-bold text-xl focus-within:text-primary focus:outline-none  focus-within:border-b-2 focus:bg-transparent',
		inputEndButton: `${buttonClasses.text} text-lg text-primary font-medium`,
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`
	};
</script>

<InputCard>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
		{#if !!tooltipText}
			<Tooltip {tooltipText} />
		{/if}
	</div>
	<form>
		<div class="flex items-center">
			<input type="number" id="pond" class={styles.inputNumber} placeholder="0.00" required />
			<button type="submit" class={styles.inputEndButton}>Approve</button>
		</div>
		<div class={dividerClasses.horizontal} />
		<div class="flex items-center gap-2 mt-2">
			<button class={styles.inputMaxButton}>MAX</button>
			<div class={dividerClasses.vertical} />
			<Text variant="small" text={`Balance: ${maxBalance.toFixed(2)}`} />
		</div>
	</form>
</InputCard>
