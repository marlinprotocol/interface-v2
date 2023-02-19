<script lang="ts">
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import { epochCycleStore } from '$lib/data-stores/epochCycleStore';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import type { EpochCycleStore, ReceiverStakingData } from '$lib/types/storeTypes';
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

	const description = `The total amount of POND in queue to be staked to the receiver's address.`;
	const subtitle = `Queued POND will be staked`;

	//if queued balance is greater than 0 then inQueue is true
	$: inQueue = receiverData.queuedBalance.gt(0);

	//end epoch time is the time when next epoch cycle will start
	$: endEpochTime =
		receiverData.epochData.startTime + receiverData.epochData.epochLength * localEpochCycle;

	const styles = {
		subtitle: 'py-2 px-3 text-left bg-black text-white rounded'
	};
</script>

<PopOver>
	<img slot="icon" src={'./images/alert.svg'} alt="Info" width={iconWidth} />
	<svelte:fragment slot="content">
		<div class={styles.subtitle}>
			<Text variant="small" text={description} />
			{#if inQueue}
				<Timer {endEpochTime} initialText={subtitle} textVariant="small" />
			{/if}
		</div>
	</svelte:fragment>
</PopOver>
