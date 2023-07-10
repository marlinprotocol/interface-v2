<script lang="ts">
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import DataRowCard from '$lib/page-components/receiver-staking/sub-components/DataRowCard.svelte';
	import InQueuedPopOver from '$lib/page-components/receiver-staking/sub-components/InQueuedPopOver.svelte';
	import type { ReceiverStakingData } from '$lib/types/storeTypes';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import SignerAddress from '$lib/page-components/receiver-staking/sub-components/SignerAddress.svelte';

	let receiverData: ReceiverStakingData;
	const unsubscribeReceiverStakedStore: Unsubscriber = receiverStakingStore.subscribe(
		async (value: ReceiverStakingData) => {
			receiverData = value;
		}
	);
	onDestroy(unsubscribeReceiverStakedStore);

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8',
		cardWrapper: 'w-full flex px-2 mb-2'
	};
</script>

<div class={styles.wrapper}>
	<div class={`${styles.cardWrapper}`}>
		<DataRowCard
			data={{
				title: 'Staked',
				value: receiverData.stakedBalance
			}}
		>
			<TooltipIcon
				slot="icon"
				tooltipText={`The total amount of POND currently staked to the receivers address.`}
				styleClass="ml-1"
			/>
		</DataRowCard>
	</div>
	<div class={styles.cardWrapper}>
		<DataRowCard
			data={{
				title: 'Queued',
				value: receiverData.queuedBalance
			}}
		>
			<InQueuedPopOver slot="icon" />
		</DataRowCard>
	</div>
	<Divider margin="mt-1 mb-6" />
	<SignerAddress />
</div>
