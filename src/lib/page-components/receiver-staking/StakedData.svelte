<script lang="ts">
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { ReceiverStakedDataModel } from '$lib/types/receiverStakingTypes';
	import DataRowCard from '$lib/page-components/receiver-staking/sub-components/DataRowCard.svelte';
	import QueuePopOver from '$lib/page-components/receiver-staking/sub-components/QueuePopOver.svelte';
	import { BigNumber } from 'ethers';

	const stakedData: ReceiverStakedDataModel = {
		title: 'STAKED',
		value: BigNumber.from('20000000000000000000000')
	};

	const inQueueData: ReceiverStakedDataModel = {
		title: 'In queue',
		value: BigNumber.from('5000000000000000000000')
	};

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8'
	};
</script>

<div class={styles.wrapper}>
	<DataRowCard data={stakedData}>
		<TooltipIcon slot="icon" tooltipText={'Some explanatory text here!!'} styleClass="ml-1" />
	</DataRowCard>
	<Divider />
	<DataRowCard data={inQueueData}>
		<QueuePopOver slot="icon" />
	</DataRowCard>
</div>
