<script lang="ts">
	import Divider from '$lib/components/divider/Divider.svelte';
	import type { ReceiverStakedDataModel } from '$lib/types/receiverStakingTypes';
	import { BigNumber } from 'ethers';
	import DataRowCard from './sub-components/DataRowCard.svelte';

	const stakedData: ReceiverStakedDataModel = {
		title: 'STAKED',
		value: BigNumber.from('20000000000000000000000'),
		tooltipText: 'Some explanatory text here'
	};

	const inQueueData: ReceiverStakedDataModel = {
		title: 'In queue',
		value: BigNumber.from('5000000000000000000000'),
		tooltipText: 'Some explanatory text here'
	};

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8'
	};
</script>

<div class={styles.wrapper}>
	<DataRowCard data={stakedData} />
	<Divider />
	<DataRowCard data={inQueueData} />
</div>
