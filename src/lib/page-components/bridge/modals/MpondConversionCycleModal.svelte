<script lang="ts">
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import type { MpondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import TableHeadingText from '../../../components/texts/TableHeadingText.svelte';

	export let cycles: MpondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;

	export let showDialog: boolean = false;

	const heading = [
		{
			title: 'ELIGIBLE / PENDING',
			tooltipText: 'The amount of POND that is eligible/pending for conversion.'
		},
		{
			title: 'TIMESTAMP',
			tooltipText: 'When POND is eligible for conversion.'
		}
	];
</script>

<Dialog bind:showDialog>
	<svelte:fragment slot="title">
		{'Conversion Cycle'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-row w-full">
			{#each heading as headingData, i}
				<div class="flex-1">
					<TableHeadingText
						styleClass="mb-8"
						title={headingData.title}
						tooltipText={headingData.tooltipText}
						tooltipDirection={i === heading.length - 1
							? 'tooltip-left'
							: i === 0
							? 'tooltip-right'
							: 'tooltip-bottom'}
					/>
				</div>
			{/each}
		</div>
		<div class="flex flex-row gap-4 w-full mx-auto">
			<div class="flex-1">
				<div class="flex flex-col align-center w-fit mx-auto">
					{#each cycles as rowData, i}
						<div class="flex flex-row gap-4  h-[50px]">
							<div class="flex flex-col items-center">
								{#if currentCycle > i}
									<img src="/images/vectorcheck.svg" alt="Copy" width="20px" height="20px" />
								{:else if currentCycle === i}
									<LoadingAnimatedPing loading={true} hasPadding={true}>
										<img src="/images/cycleloader.svg" alt="Copy" width="19px" height="19px" />
									</LoadingAnimatedPing>
								{:else}
									<img src="/images/unactivetick.svg" alt="Copy" width="20px" height="20px" />
								{/if}
								{#if i + 1 !== cycles?.length}
									<div class="h-full w-[0.1px] bg-grey-400" />
								{/if}
							</div>
							{`${bigNumberToCommaString(rowData?.totalEligible, 3)}/${bigNumberToCommaString(
								rowData?.netPending,
								3
							)}`}
						</div>
					{/each}
				</div>
			</div>
			<div class="flex-1">
				<div class="flex flex-col align-center w-fit mx-auto">
					{#each cycles as rowData, i}
						<div class="flex flex-row gap-2 h-[50px] items-start justify-center">
							{#if currentCycle <= i}
								<img src="/images/timerclock.svg" alt="Copy" width="20px" height="20px" />
							{/if}
							{#if currentCycle === i}
								<Timer {endEpochTime}>
									<div slot="active" let:timer class="mx-auto">
										{`${Math.floor(timer / 60) % 60} mins`}
									</div>
								</Timer>
								<span class="font-xl font-bold mb-1">{'.'}</span>
							{/if}
							{currentCycle > i ? 'Ready to claim' : epochSecToString(rowData?.timestamp)}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</svelte:fragment>
</Dialog>
