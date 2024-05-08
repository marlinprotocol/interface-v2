<script lang="ts">
	import { tableClasses } from '$lib/atoms/componentClasses';
	import Timer from '$lib/atoms/timer/Timer.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import NameWithAddress from '$lib/components/texts/NameWithAddress.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import type { BytesLike } from 'ethers';
	import { refreshJobStatusForJobId } from '$lib/controllers/httpController';
	import {
		oysterTokenMetadataStore,
		updateJobStatusByIdInOysterStore
	} from '$lib/data-stores/oysterStore';
	import { handleCopyClick } from '$lib/utils/helpers/componentHelper';
	import {
		epochToDurationString,
		bigNumberToString,
		epochToDurationStringLong
	} from '$lib/utils/helpers/conversionHelper';
	import { getInventoryDurationVariant } from '$lib/utils/helpers/oysterHelpers';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let rowData: OysterInventoryDataModel;
	export let rowIndex: number;
	export let expandedRows: Set<string>;

	let refreshLoading = false;

	// Handler function for toggling the expansion of a row
	function toggleRowExpansion(rowId: string) {
		if (expandedRows.size > 0 && expandedRows.has(rowId)) {
			expandedRows.clear();
		} else if (expandedRows.size > 0) {
			expandedRows.clear();
			expandedRows.add(rowId);
		} else {
			expandedRows.add(rowId);
		}
		// assignment to self for reactivity purposes check out svelte docs updating arrays and object for more info
		expandedRows = expandedRows;
	}

	async function refreshJobStatus(jobId: BytesLike) {
		refreshLoading = true;
		const updatedStatus = await refreshJobStatusForJobId(jobId);
		updateJobStatusByIdInOysterStore(updatedStatus);
		refreshLoading = false;
	}

	$: ({
		provider: { address, name },
		id,
		ip,
		balance,
		durationLeft,
		endEpochTime, // epoch time in seconds based on duration left,
		// newRate is being passed to the modal for the amend rate modal and is not used here
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		reviseRate: { newRate = null, rateStatus = '', stopStatus = '' } = {}
	} = rowData);
	$: isOpen = expandedRows.has(id.toString());
</script>

<td class={tableClasses.cell}>
	<NameWithAddress {name} {address} {rowIndex}>
		<svelte:fragment slot="copyIcon">
			<div class="w-4">
				<div
					class="invisible cursor-pointer opacity-0 group-hover/row:visible group-hover/row:opacity-100"
				>
					<img src={staticImages.copyIcon} alt="Copy" />
				</div>
			</div>
		</svelte:fragment>
	</NameWithAddress>
</td>
<td class={tableClasses.cell}>
	<div class="flex items-center justify-start gap-2">
		{ip ?? 'N/A'}
		{#if ip}
			<button
				class="cursor-pointer opacity-0 group-hover/row:opacity-100"
				on:click={() => handleCopyClick(ip, 'IP Address copied to clipboard')}
			>
				<img src={staticImages.copyIcon} alt="Copy" />
			</button>
		{/if}
		<button
			class={cn('flex cursor-pointer items-center opacity-0 group-hover/row:opacity-100', {
				'animate-spin': refreshLoading
			})}
			on:click={() => refreshJobStatus(id)}
		>
			<img src={staticImages.refreshV2Icon} alt="Refresh Icon" />
		</button>
	</div>
</td>
<td class={tableClasses.cell}>
	<Tooltip>
		<span class="font-normal" slot="tooltipContent"
			>{$oysterTokenMetadataStore.symbol}{bigNumberToString(
				balance,
				$oysterTokenMetadataStore.decimal,
				$oysterTokenMetadataStore.precision
			)}</span
		>
		<span slot="tooltipIcon"
			>{$oysterTokenMetadataStore.symbol}{bigNumberToString(
				balance,
				$oysterTokenMetadataStore.decimal
			)}</span
		>
	</Tooltip>
</td>
<td class={tableClasses.cell}>
	<Timer timerId="timer-for-inventory-table-row-{id}" {endEpochTime}>
		<div slot="active">
			<Tooltip>
				<span slot="tooltipContent">{epochToDurationStringLong(durationLeft)}</span>
				<span slot="tooltipIcon">
					<div
						class="mx-auto rounded-full px-[31.5px] py-[10.5px] text-center text-sm text-[#030115]"
						style="background-color: {getInventoryDurationVariant(durationLeft)}"
					>
						{epochToDurationString(durationLeft, false)}
					</div>
				</span>
			</Tooltip>
		</div>
		<div
			class="w-min rounded-full bg-[#0F62FE23] px-[31.5px] py-[10.5px] text-center text-sm text-[#030115]"
			slot="inactive"
		>
			Ended
		</div>
	</Timer>
</td>
<td class={tableClasses.cell}>
	<CollapseButton
		{isOpen}
		onclick={() => {
			toggleRowExpansion(id.toString());
		}}
	/>
</td>
