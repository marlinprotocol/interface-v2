<script lang="ts">
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import DataRowCard from '$lib/page-components/receiver-staking/sub-components/DataRowCard.svelte';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';
	import { epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { getInventoryDurationVariant } from '$lib/utils/helpers/oysterHelpers';
	import type { BigNumber } from 'ethers';

	const styles = {
		wrapper: 'w-full flex flex-col items-center justify-center py-8',
		cardWrapper: 'w-full flex px-2 mb-2'
	};

	function getRewardTimeEnd(
		startTime: number,
		epochDuration: number,
		rewardBalance: BigNumber,
		rewardPerEpoch: BigNumber,
		lastTicketIssuedEpoch: number | undefined
	) {
		if (rewardPerEpoch.eq(BIG_NUMBER_ZERO) || epochDuration === 0) return 0;
		const currentEpochNumber = lastTicketIssuedEpoch
			? lastTicketIssuedEpoch
			: Math.floor((Date.now() / 1000 - startTime) / epochDuration);
		const finalEpochNumber = currentEpochNumber + rewardBalance.div(rewardPerEpoch).toNumber();
		return startTime + epochDuration * finalEpochNumber;
	}

	$: rewardTimeEnd = getRewardTimeEnd(
		$receiverRewardsStore.startTime,
		$receiverRewardsStore.epochDuration,
		$receiverRewardsStore.rewardBalance,
		$receiverRewardsStore.rewardPerEpoch,
		$receiverRewardsStore.lastTicketIssuedEpoch
	);
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
	<div class={`${styles.cardWrapper} justify-between`}>
		<div class="flex items-center">
			<span> Rewards End in </span>
			<TooltipIcon
				tooltipText={`Total amount that you currently have locked in for rewards.`}
				styleClass="ml-1"
			/>
		</div>
		{#if $receiverRewardsStore.rewardBalance.gt(BIG_NUMBER_ZERO)}
			<Timer timerId="receiver-funding-end-timer" endEpochTime={rewardTimeEnd}>
				<div slot="active" let:timer class="mx-auto">
					<Tooltip tooltipText={epochToDurationString(timer)} tooltipDirection="tooltip-left">
						<div
							class="py-1 w-24 text-white rounded mx-auto text-sm text-center"
							style={`background-color:${getColorHexByVariant(getInventoryDurationVariant(timer))}`}
						>
							{epochToDurationString(timer, true)}
						</div>
					</Tooltip>
				</div>
				<div slot="inactive" class="mx-auto">Ended</div>
			</Timer>
		{:else}
			<span class="font-medium">N/A</span>
		{/if}
	</div>
</div>
