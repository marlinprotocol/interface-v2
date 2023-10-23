<script lang="ts">
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import DataRowCard from '$lib/page-components/receiver-staking/sub-components/DataRowCard.svelte';
	import InQueuedPopOver from '$lib/page-components/receiver-staking/sub-components/InQueuedPopOver.svelte';
	import SignerAddress from '$lib/page-components/receiver-staking/sub-components/SignerAddress.svelte';
</script>

<div class="flex w-full flex-col items-center justify-center pb-8 pt-4">
	<div class="mb-2 flex w-full px-2">
		<DataRowCard
			data={{
				title: 'Staked',
				value: $receiverStakingStore.stakedBalance
			}}
		>
			<TooltipIcon
				slot="icon"
				tooltipText="The total amount of POND currently staked to the receivers address."
				styleClass="ml-1"
			/>
		</DataRowCard>
	</div>
	<div class="mb-2 flex w-full px-2">
		<DataRowCard
			data={{
				title: 'Queued',
				value: $receiverStakingStore.queuedBalance
			}}
		>
			<InQueuedPopOver slot="icon" />
		</DataRowCard>
	</div>
	<Divider margin="mt-1 mb-6" />
	<SignerAddress />
</div>
