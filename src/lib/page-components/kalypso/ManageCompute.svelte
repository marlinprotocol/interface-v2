<script lang="ts">
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { kalypsoStore, switchComputeTabInKalypsoStore } from '$lib/data-stores/kalypsoStore';
	import IncreaseCompute from './IncreaseCompute.svelte';
	import DecreaseCompute from './DecreaseCompute.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
</script>

<div class="flex w-full flex-col gap-4">
	<div class="mb-2 flex flex-col items-start justify-center">
		<div class="flex items-center justify-center gap-1">
			<span class="font-poppins text-2xl font-medium text-[#030115]"> Compute </span>
			<Tooltip placement="top">
				<img slot="tooltipIcon" src={staticImages.alertV2Icon} alt="Info" width={16} />
				<span slot="tooltipContent">This tooltip is for Compute</span></Tooltip
			>
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<div class="join mb-2">
			<button
				class={cn(
					{
						'bg-primary text-white': $kalypsoStore.activeComputeTab === 'increase',
						'bg-white': $kalypsoStore.activeComputeTab !== 'increase'
					},
					'join-item w-full rounded-l-xl border border-primary px-4 py-3 font-poppins text-base'
				)}
				on:click={() => switchComputeTabInKalypsoStore('increase')}
			>
				Increase
			</button>
			<button
				class={cn(
					{
						'bg-primary text-white': $kalypsoStore.activeComputeTab === 'decrease',
						'bg-white': $kalypsoStore.activeComputeTab !== 'decrease'
					},
					'join-item w-full rounded-r-xl border border-primary px-4 py-3 font-poppins text-base'
				)}
				on:click={() => switchComputeTabInKalypsoStore('decrease')}
			>
				Decrease
			</button>
		</div>

		{#if $kalypsoStore.activeComputeTab === 'increase'}
			<IncreaseCompute />
		{:else}
			<DecreaseCompute />
		{/if}
	</div>
</div>
