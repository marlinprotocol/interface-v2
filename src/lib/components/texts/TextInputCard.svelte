<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';

	export let title: string;
	export let tooltipText: string = '';
	export let value: string = '';
	export let textStyle: string = '';
	export let centered: boolean = false;

	const styles = {
		titleIcon: `flex items-center gap-1 ${centered ? 'justify-center' : ''} mb-1`,
		value: `${textStyle} ${centered ? 'text-center' : ''}`
	};
</script>

<InputCard variant={'primary'}>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
		{#if tooltipText}
			<TooltipIcon
				{tooltipText}
				tooltipVariant="tooltip-secondary"
				tooltipDirection="tooltip-right"
			/>
		{/if}
	</div>
	<div class={styles.value}>
		<Text variant="small" text={value} fontWeight="font-medium" styleClass={styles.value} />
	</div>
</InputCard>
