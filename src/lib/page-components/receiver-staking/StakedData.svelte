<script lang="ts">
	import Divider from '$lib/components/divider/Divider.svelte';
	import Tooltip from '$lib/components/tooltips/Tooltip.svelte';
	import type { ReceiverStakedDataModel } from '$lib/types/receiverStakingTypes';
	import { BigNumber } from 'ethers';
	import DataRowCard from './sub-components/DataRowCard.svelte';
	import QueuePopOver from './sub-components/QueuePopOver.svelte';

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
		<Tooltip slot="icon" tooltipText={'Some explanatory text here!!'} styleClass="ml-1" />
	</DataRowCard>
	<Divider />
	<DataRowCard data={inQueueData}>
		<QueuePopOver slot="icon" />
	</DataRowCard>
</div>
