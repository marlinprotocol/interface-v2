<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';

	export let styleClass: string = '';
	export let tooltipText: string = '';
	export let title: string;

	const styles = {
		rowWrapper: 'flex items-center justify-between',
		titleIcon: 'flex items-center gap-2',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary disabled:placeholder:text-primary/[.3] focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};
	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<InputCard {styleClass}>
	<div class={styles.rowWrapper}>
		<div class={styles.titleIcon}>
			<Text variant="small" text={title} />
			{#if !!tooltipText}
				<TooltipIcon {tooltipText} />
			{/if}
		</div>
		<slot name="titleEndButton" />
	</div>
	<div class={styles.rowWrapper}>
		<slot />
		<slot name="endButton" />
	</div>
</InputCard>
