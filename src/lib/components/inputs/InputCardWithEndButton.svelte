<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';

	export let styleClass = '';
	export let tooltipText = '';
	export let title: string;

	const styles = {
		rowWrapper: 'flex items-center justify-between',
		titleIcon: 'flex items-center gap-1'
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
