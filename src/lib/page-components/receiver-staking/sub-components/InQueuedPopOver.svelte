<script lang="ts">
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { epochCycleStore } from '$lib/data-stores/epochCycleStore';
	import {
		receiverStakingStore,
		updateEpochOnTimerEndInReceiverStakingStore
	} from '$lib/data-stores/receiverStakingStore';
	import type { EpochCycleStore, ReceiverStakingData } from '$lib/types/storeTypes';
	import { epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	export let iconWidth = 12;

	let localEpochCycle: EpochCycleStore = 0;
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
	$: inQueue = receiverData.queuedBalance > 0;

	//end epoch time is the time when next epoch cycle will start
	$: endEpochTime =
		receiverData.epochData.startTime + receiverData.epochData.epochLength * localEpochCycle;

	const onTimerEnd = () => {
		inQueue = false;
		updateEpochOnTimerEndInReceiverStakingStore();
	};

	const styles = {
		subtitle: 'py-2 px-3 text-left bg-black text-white rounded'
	};
</script>

<PopOver>
	<img slot="icon" src={staticImages.Info} alt="Info" width={iconWidth} />
	<svelte:fragment slot="content">
		<div class={styles.subtitle}>
			{#if inQueue && localEpochCycle > 0}
				<Timer timerId={`timer-for-staking-in-queue`} {onTimerEnd} {endEpochTime}>
					<div slot="active" let:timer>
						<Text
							variant={'small'}
							text={`${description} ${subtitle} in ${epochToDurationString(timer)}.`}
						/>
					</div>
					<div slot="inactive">
						<Text variant={'small'} text={`${description} ${subtitle} soon.`} />
					</div>
				</Timer>
			{:else}
				<Text variant="small" text={description} />
			{/if}
		</div>
	</svelte:fragment>
</PopOver>
