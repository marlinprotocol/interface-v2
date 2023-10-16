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
	import { epochToDurationString } from '$lib/utils/helpers/conversionHelper';

	export let iconWidth = 12;

	const description = `The total amount of POND in queue to be staked to the receiver's address.`;
	const subtitle = `Queued POND will be staked`;
	const styles = {
		subtitle: 'py-2 px-3 text-left bg-black text-white rounded'
	};

	const onTimerEnd = () => {
		inQueue = false;
		updateEpochOnTimerEndInReceiverStakingStore();
	};

	//if queued balance is greater than 0 then inQueue is true
	$: inQueue = $receiverStakingStore.queuedBalance > 0;
	//end epoch time is the time when next epoch cycle will start
	$: endEpochTime =
		$receiverStakingStore.epochData.startTime +
		$receiverStakingStore.epochData.epochLength * $epochCycleStore;
</script>

<PopOver>
	<img slot="icon" src={staticImages.Info} alt="Info" width={iconWidth} />
	<svelte:fragment slot="content">
		<div class={styles.subtitle}>
			{#if inQueue && $epochCycleStore > 0}
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
