<script lang="ts">
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { epochStore } from '$lib/data-stores/epochStore';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import DataRowCard from '$lib/page-components/receiver-staking/sub-components/DataRowCard.svelte';
	import InQueuedPopOver from '$lib/page-components/receiver-staking/sub-components/InQueuedPopOver.svelte';
	import type { EpochStore, ReceiverStakingData } from '$lib/types/storeTypes';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let receiverData: ReceiverStakingData;
	let epochData: EpochStore;
	const unsubscribeReceiverStakedStore: Unsubscriber = receiverStakingStore.subscribe(
		async (value: ReceiverStakingData) => {
			receiverData = value;
		}
	);
	const unsubscribeEpochStore: Unsubscriber = epochStore.subscribe(async (value: EpochStore) => {
		epochData = value;
	});

	onDestroy(unsubscribeReceiverStakedStore);
	onDestroy(unsubscribeEpochStore);

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8'
	};
</script>

<div class={styles.wrapper}>
	<DataRowCard
		data={{
			title: 'STAKED',
			value: receiverData.stakedBalance
		}}
	>
		<TooltipIcon slot="icon" tooltipText={'Some explanatory text here!!'} styleClass="ml-1" />
	</DataRowCard>
	<Divider />
	<DataRowCard
		data={{
			title: 'In queue',
			value: receiverData.queuedBalance
		}}
	>
		<InQueuedPopOver slot="icon" queuedBalance={receiverData.queuedBalance} {epochData} />
	</DataRowCard>
</div>
