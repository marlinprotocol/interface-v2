<script lang="ts">
	import Text from '$lib/components/texts/Text.svelte';
	import Tooltip from '$lib/components/tooltips/Tooltip.svelte';
	import type { ReceiverStakedDataModel } from '$lib/types/receiverStakingModel';

	const content: ReceiverStakedDataModel[] = [
		{
			title: 'STAKED',
			value: '20,000 POND',
			tooltipText: 'Some explanatory text here'
		},
		{
			title: 'In queue',
			value: '5,000 POND',
			tooltipText: 'Some explanatory text here'
		}
	];

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-5 px-10',
		rowClass: 'w-full flex items-center justify-between',
		titleIcon: 'flex items-center'
	};
</script>

<div class={styles.wrapper}>
	{#each content as item}
		<div class={styles.rowClass}>
			<div class={styles.titleIcon}>
				<Text variant="small" styleClass="text-gray-500" text={item.title} />
				{#if !!item.tooltipText}
					<Tooltip tooltipText={item.tooltipText} />
				{/if}
			</div>
			<Text variant="h6" text={item.value} />
		</div>
	{/each}
</div>
