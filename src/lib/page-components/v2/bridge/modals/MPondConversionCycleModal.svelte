<script lang="ts">
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import LoadingAnimationModal from '$lib/components/loading/LoadingAnimationModal.svelte';
	import type { MPondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import { MPOND_CONVERSION_CYCLE_TABLE_HEADER } from '$lib/utils/constants/bridgeConstants';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import TableHeadingText from '$lib/components/texts/TableHeadingText.svelte';

	export let cycles: MPondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;
	export let modalFor: string;
</script>

<Modal {modalFor} isScrollable>
	<svelte:fragment slot="title">Conversion Cycle</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="mb-8 flex w-full flex-row">
			{#each MPOND_CONVERSION_CYCLE_TABLE_HEADER as headingData, i}
				<div class="flex-1">
					<TableHeadingText
						heading={headingData}
						tooltipDirection={i === MPOND_CONVERSION_CYCLE_TABLE_HEADER.length - 1
							? 'tooltip-left'
							: i === 0
								? 'tooltip-right'
								: 'tooltip-bottom'}
					/>
				</div>
			{/each}
		</div>
		<div class="mx-auto flex w-full flex-row gap-4 text-sm font-semibold sm:text-base">
			<div class="flex-1">
				<div class="align-center mx-auto flex w-fit flex-col">
					{#each cycles as rowData, i}
						<div class="{currentCycle === i ? 'pl-0.5' : 'pl-1'} flex h-[50px] flex-row gap-4">
							<div class="flex flex-col items-center">
								{#if currentCycle > i}
									<img src={staticImages.Check} alt="Copy" width="20px" height="20px" />
								{:else if currentCycle === i}
									<LoadingAnimationModal loading={true} hasPadding={true}>
										<img src={staticImages.CycleLoader} alt="Copy" width="19px" height="19px" />
									</LoadingAnimationModal>
								{:else}
									<img src={staticImages.UnActiveTick} alt="Copy" width="20px" height="20px" />
								{/if}
								{#if i + 1 !== cycles?.length}
									<div class="h-full w-[0.1px] bg-grey-400" />
								{/if}
							</div>
							{bigNumberToString(
								rowData?.totalEligible,
								DEFAULT_CURRENCY_DECIMALS,
								POND_PRECISIONS
							)}/{bigNumberToString(
								rowData?.netPending,
								DEFAULT_CURRENCY_DECIMALS,
								POND_PRECISIONS
							)}
						</div>
					{/each}
				</div>
			</div>
			<div class="flex-1">
				<div class="align-center mx-auto flex w-fit flex-col">
					{#each cycles as rowData, i}
						<div class="flex h-[50px] flex-row items-start justify-center gap-1.5">
							{#if currentCycle <= i}
								<img src={staticImages.Timer} alt="Clock" width="15px" height="15px" class="mt-1" />
							{/if}
							{#if currentCycle === i}
								<Timer timerId="timer-for-mpond-conversion-{i}" {endEpochTime}>
									<div slot="active" let:timer class="mx-auto">
										{epochToDurationString(timer, true)}
									</div>
								</Timer>
								<div class="align-center mt-2.5 flex h-1 w-1 rounded-2xl bg-black" />
							{/if}
							{currentCycle > i ? 'Ready to claim' : epochSecToString(rowData?.timestamp)}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</svelte:fragment>
</Modal>
