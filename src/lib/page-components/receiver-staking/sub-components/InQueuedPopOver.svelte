<script lang="ts">
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import { epochCycleStore } from '$lib/data-stores/epochCycleStore';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import type { EpochCycleStore, ReceiverStakingData } from '$lib/types/storeTypes';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	export let iconWidth = 15;

	let localEpochCycle: EpochCycleStore;
	const unsubscribeEpochCycleStore: Unsubscriber = epochCycleStore.subscribe(
		async (value: EpochCycleStore) => {
			localEpochCycle = value;
		}
	);

	let receiverData: ReceiverStakingData;
	const unsubscribeReceiverStakedStore: Unsubscriber = receiverStakingStore.subscribe(
		async (value: ReceiverStakingData) => {
			receiverData = value;
		}
	);

	onDestroy(unsubscribeReceiverStakedStore);
	onDestroy(unsubscribeEpochCycleStore);

	$: title = `${bigNumberToCommaString(receiverData.queuedBalance)} POND in queue`;
	$: description = `Queued POND will be staked at the start of the next epoch cycle.`;
	$: subtitle = `Queued POND will be staked`;

	//if queued balance is greater than 0 then inQueue is true
	$: inQueue = receiverData.queuedBalance.gt(0);

	//end epoch time is the time when next epoch cycle will start
	$: endEpochTime =
		receiverData.epochData.startTime + receiverData.epochData.epochLength * localEpochCycle;

	const styles = {
		title: 'py-2 px-3 bg-gray-600 text-white rounded-t',
		subtitle: 'py-2 px-3 text-left bg-black text-white rounded-b'
	};
</script>

<PopOver>
	<img slot="icon" src={'./images/alert.svg'} alt="Info" width={iconWidth} />
	<svelte:fragment slot="content">
		<div class={styles.title}>
			<Text variant="h6" text={title} />
		</div>
		<div class={styles.subtitle}>
			<Text variant="small" text={description} />
			{#if inQueue}
				<Timer {endEpochTime} initialText={subtitle} textVariant="small" />
			{/if}
		</div>
	</svelte:fragment>
</PopOver>
