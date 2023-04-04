<script lang="ts">
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import { epochCycleStore } from '$lib/data-stores/epochCycleStore';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import type { EpochCycleStore, ReceiverStakingData } from '$lib/types/storeTypes';
	import { BigNumberZero } from '$lib/utils/constants/constants';
	import { epochToDurationString } from '$lib/utils/conversion';
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
	$: inQueue = receiverData.queuedBalance.gt(0);

	//end epoch time is the time when next epoch cycle will start
	$: endEpochTime =
		receiverData.epochData.startTime + receiverData.epochData.epochLength * localEpochCycle;

	const onTimerEnd = () => {
		receiverStakingStore.update((value) => {
			inQueue = false;
			return {
				...value,
				queuedBalance: BigNumberZero,
				stakedBalance: value.stakedBalance.add(value.queuedBalance),
				epochData: {
					...value.epochData,
					epochCycle: value.epochData.epochCycle + 1
				}
			};
		});
	};

	const styles = {
		subtitle: 'py-2 px-3 text-left bg-black text-white rounded'
	};
</script>

<PopOver>
	<img slot="icon" src={'/images/info.svg'} alt="Info" width={iconWidth} />
	<svelte:fragment slot="content">
		<div class={styles.subtitle}>
			{#if inQueue && localEpochCycle > 0}
				<Timer {onTimerEnd} {endEpochTime}>
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
