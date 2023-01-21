<script lang="ts">
	import Text from '$lib/components/texts/Text.svelte';
	import Tooltip from '$lib/components/tooltips/Tooltip.svelte';
	import type { ReceiverStakedDataModel } from '$lib/types/receiverStakingTypes';
	import { bigNumbertoString } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';

	const content: ReceiverStakedDataModel[] = [
		{
			title: 'STAKED',
			value: BigNumber.from('20000000000000000000000'),
			tooltipText: 'Some explanatory text here'
		},
		{
			title: 'In queue',
			value: BigNumber.from('5000000000000000000000'),
			tooltipText: 'Some explanatory text here'
		}
	];

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center',
		rowClass: 'w-full flex items-center justify-between',
		titleIcon: 'flex items-center gap-1'
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
			<Text variant="h6" text={`${bigNumbertoString(item.value, 2)} POND`} />
		</div>
	{/each}
</div>
