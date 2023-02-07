<script lang="ts">
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import type { EpochStore, ReceiverStakingData } from '$lib/types/storeTypes';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import question from 'svelte-awesome/icons/question';

	export let iconWidth = 15;
	export let queuedBalance: ReceiverStakingData['queuedBalance'];
	export let epochData: EpochStore;

	$: title = `${bigNumberToCommaString(queuedBalance, 2)} POND in queue`;
	$: description = `Add some description over here!!!`;
	$: subtitle = `Queued POND will be staked`;

	//if queued balance is greater than 0 then inQueue is true
	$: inQueue = queuedBalance.gt(0);

	const styles = {
		title: 'py-2 px-3 bg-gray-200 rounded',
		subtitle: 'py-2 px-3 text-left'
	};

	const { epochStartTime, epochLength, epochCycle } = epochData;

	//end epoch time is the time when next epoch cycle will start
	$: endEpochTime = epochStartTime + epochLength * epochCycle;
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
