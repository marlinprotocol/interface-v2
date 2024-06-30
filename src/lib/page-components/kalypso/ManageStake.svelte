<script lang="ts">
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { kalypsoStore, switchStakeTabInKalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import AddStake from './AddStake.svelte';
	import WithdrawStake from './WithdrawStake.svelte';
</script>

<div class="flex w-full flex-col gap-4">
	<div class="mb-2 flex flex-col items-start justify-center">
		<div class="flex items-center justify-center gap-1">
			<span class="font-poppins text-2xl font-medium text-[#030115]"> Stake </span>
			<Tooltip placement="top">
				<img slot="tooltipIcon" src={staticImages.alertV2Icon} alt="Info" width={16} />
				<span slot="tooltipContent">This tooltip is for Stake</span></Tooltip
			>
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<div class="join mb-2">
			<button
				class={cn(
					{
						'bg-primary text-white': $kalypsoStore.activeStakeTab === 'add',
						'bg-white': $kalypsoStore.activeStakeTab !== 'add'
					},
					'join-item w-full rounded-l-xl border border-primary px-4 py-3 font-poppins text-base'
				)}
				on:click={() => switchStakeTabInKalypsoStore('add')}
			>
				Add
			</button>
			<button
				class={cn(
					{
						'bg-primary text-white': $kalypsoStore.activeStakeTab === 'withdraw',
						'bg-white': $kalypsoStore.activeStakeTab !== 'withdraw'
					},
					'join-item w-full rounded-r-xl border border-primary px-4 py-3 font-poppins text-base'
				)}
				on:click={() => switchStakeTabInKalypsoStore('withdraw')}
			>
				Withdraw
			</button>
		</div>
		{#if $kalypsoStore.activeStakeTab === 'add'}
			<AddStake />
		{:else}
			<WithdrawStake />
		{/if}
	</div>
</div>
