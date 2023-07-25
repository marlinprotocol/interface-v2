<script lang="ts">
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import DataRowCard from '$lib/page-components/receiver-staking/sub-components/DataRowCard.svelte';

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8',
		cardWrapper: 'w-full flex px-2 mb-2'
	};
</script>

<div class={`${styles.wrapper}`}>
	<div class={`${styles.cardWrapper}`}>
		<DataRowCard
			data={{
				title: 'Reward per Ticket',
				value: $receiverRewardsStore.rewardPerEpoch
			}}
		>
			<TooltipIcon
				slot="icon"
				tooltipText={`Reward you choose to give the operator per successful ticket.`}
				styleClass="ml-1"
			/>
		</DataRowCard>
	</div>
	<div class={styles.cardWrapper}>
		<DataRowCard
			data={{
				title: 'Rewards Balance',
				value: $receiverRewardsStore.rewardBalance
			}}
		>
			<TooltipIcon
				slot="icon"
				tooltipText={`Total amount that you currently have locked in for rewards.`}
				styleClass="ml-1"
			/>
		</DataRowCard>
	</div>
</div>
