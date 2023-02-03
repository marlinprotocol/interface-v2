<script lang="ts">
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import PopOver from '$lib/atoms/pop-over/PopOver.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import type { ReceiverStakeBalanceSnapshotData } from '$lib/types/storeTypes';
	import question from 'svelte-awesome/icons/question';

	export let iconWidth = 15;
	export let balanceSnapshot: ReceiverStakeBalanceSnapshotData;

	$: title = `${balanceSnapshot?.balance} in queue`;
	$: description = `2 line long description here here!!!`;
	$: subtitle = `Queued POND will be staked`;

	$: inQueue = !!balanceSnapshot?.balance;

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
				<Timer endEpochTime={1677003171} initialText={subtitle} textVariant="small" />
			{/if}
		</div>
	</svelte:fragment>
</PopOver>
