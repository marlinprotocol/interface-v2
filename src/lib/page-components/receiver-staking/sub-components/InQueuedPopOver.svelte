<script lang="ts">
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import { epochCycleStore } from '$lib/data-stores/epochCycleStore';
	import type { EpochCycleStore, ReceiverStakingData } from '$lib/types/storeTypes';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import question from 'svelte-awesome/icons/question';
	import type { Unsubscriber } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';

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
	$: description = `Add some description over here!!!`;
	$: subtitle = `Queued POND will be staked`;

	//if queued balance is greater than 0 then inQueue is true
	$: inQueue = receiverData.queuedBalance.gt(0);

	//end epoch time is the time when next epoch cycle will start
	$: endEpochTime =
		receiverData.epochData.startTime + receiverData.epochData.epochLength * localEpochCycle;

	console.log('endEpochTime :>> ', endEpochTime);
	const styles = {
		title: 'py-2 px-3 bg-gray-200 rounded',
		subtitle: 'py-2 px-3 text-left'
	};
</script>

<PopOver>
	<Icon slot="icon" data={question} size={iconWidth} border={true} />
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
