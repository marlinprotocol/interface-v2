<script lang="ts">
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { getColorHexByVariant } from '$lib/utils/helpers/componentHelper';
	import { epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import { getInventoryDurationVariant } from '$lib/utils/helpers/oysterHelpers';

	function getRewardTimeEnd(
		startTime: number,
		epochDuration: number,
		rewardBalance: bigint,
		rewardPerEpoch: bigint,
		lastTicketIssuedEpoch: number | undefined
	) {
		if (rewardPerEpoch === 0n || epochDuration === 0) return 0;
		const currentEpochNumber = lastTicketIssuedEpoch
			? lastTicketIssuedEpoch
			: Math.floor((Date.now() / 1000 - startTime) / epochDuration);
		const finalEpochNumber = currentEpochNumber + Number(rewardBalance / rewardPerEpoch);
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

<div class="flex w-full flex-col items-center justify-center py-8">
	<div class="mb-2 flex w-full px-2"></div>
	<div class="mb-2 flex w-full px-2"></div>
	<div class="mb-2 flex w-full justify-between px-2">
		<div class="flex items-center">
			<span> Rewards End in </span>
			<TooltipIcon
				tooltipText="Total amount that you currently have locked in for rewards."
				styleClass="ml-1"
			/>
		</div>
		{#if $receiverRewardsStore.rewardBalance > 0n}
			<Timer timerId="receiver-funding-end-timer" endEpochTime={rewardTimeEnd}>
				<div slot="active" let:timer class="mx-auto">
					<Tooltip tooltipText={epochToDurationString(timer)} tooltipDirection="tooltip-left">
						<div
							class="mx-auto w-24 rounded py-1 text-center text-sm text-white"
							style="background-color: {getColorHexByVariant(getInventoryDurationVariant(timer))}"
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
