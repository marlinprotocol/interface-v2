<script lang="ts">
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import type { MPondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import { kMPondConversionCycleTableHeader } from '$lib/utils/constants/bridgeConstants';
	import { pondPrecisions } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString, epochSecToString } from '$lib/utils/conversion';
	import TableHeadingText from '../../../components/texts/TableHeadingText.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';

	export let cycles: MPondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;
	export let modalFor: string;

	const styles = {
		wrapper: 'flex flex-row gap-4 w-full mx-auto font-semibold text-sm sm:text-base',
		column: 'flex flex-col align-center w-fit mx-auto',
		conversionRow: 'flex flex-row gap-4 h-[50px]',
		timerRow: 'flex flex-row gap-1.5 h-[50px] items-start justify-center'
	};
</script>

<Modal bind:modalFor>
	<svelte:fragment slot="title">
		{'Conversion Cycle'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-row w-full">
			{#each kMPondConversionCycleTableHeader as headingData, i}
				<div class="flex-1">
					<TableHeadingText
						styleClass="mb-8"
						title={headingData.title}
						tooltipText={headingData.tooltipText}
						tooltipDirection={i === kMPondConversionCycleTableHeader.length - 1
							? 'tooltip-left'
							: i === 0
							? 'tooltip-right'
							: 'tooltip-bottom'}
					/>
				</div>
			{/each}
		</div>
		<div class={styles.wrapper}>
			<div class="flex-1">
				<div class={styles.column}>
					{#each cycles as rowData, i}
						<div class={`${currentCycle === i ? 'pl-0.5' : 'pl-1'} ${styles.conversionRow}`}>
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
							{`${bigNumberToCommaString(
								rowData?.totalEligible,
								pondPrecisions
							)}/${bigNumberToCommaString(rowData?.netPending, pondPrecisions)}`}
						</div>
					{/each}
				</div>
			</div>
			<div class="flex-1">
				<div class={styles.column}>
					{#each cycles as rowData, i}
						<div class={styles.timerRow}>
							{#if currentCycle <= i}
								<img
									src="/images/timerclock.svg"
									alt="Clock"
									width="15px"
									height="15px"
									class="mt-1"
								/>
							{/if}
							{#if currentCycle === i}
								<Timer {endEpochTime}>
									<div slot="active" let:timer class="mx-auto">
										{`${Math.floor(timer / 60) % 60} mins`}
									</div>
								</Timer>
								<div class="w-1 h-1 bg-black rounded-2xl flex align-center mt-2.5" />
							{/if}
							{currentCycle > i ? 'Ready to claim' : epochSecToString(rowData?.timestamp)}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</svelte:fragment>
</Modal>
