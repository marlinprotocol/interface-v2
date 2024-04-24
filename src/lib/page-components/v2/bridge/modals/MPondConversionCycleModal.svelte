<script lang="ts">
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { bigNumberToString, epochSecToString } from '$lib/utils/helpers/conversionHelper';

	export let modalFor: string;
	export let pondEligible: bigint;
	export let pondInProcess: bigint;
	export let pondPending: bigint;
	export let endTimestamp: number;
</script>

<Modal {modalFor} isScrollable modalWidth="w-[642px] max-w-none">
	<svelte:fragment slot="title">Conversion Cycle</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex items-center justify-between gap-2">
			<div
				class="flex h-52 w-36 flex-col items-center justify-center rounded-xl bg-[#F4F4F6] text-[#030115]"
			>
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#2DB8E3]">
					<img src={staticImages.checkmarkCircleIcon} alt="Eligible" />
				</div>
				<span class="mt-4 text-lg font-light leading-5">Eligible</span>
				<span class="text-xl font-semibold"
					>{bigNumberToString(pondEligible, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}</span
				>
			</div>
			<div
				class="flex h-52 w-36 flex-col items-center justify-center rounded-xl bg-[#F4F4F6] text-[#030115]"
			>
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2C25E]">
					<img src={staticImages.loadingIcon} alt="In Process" />
				</div>
				<span class="mt-4 text-lg font-light leading-5">In Process</span>
				<span class="text-xl font-semibold"
					>{bigNumberToString(pondInProcess, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}</span
				>
			</div>
			<div
				class="flex h-52 w-36 flex-col items-center justify-center rounded-xl bg-[#F4F4F6] text-[#030115]"
			>
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#F2675E]">
					<img src={staticImages.clock} alt="Pending" />
				</div>
				<span class="mt-4 text-lg font-light leading-5">Pending</span>
				<span class="text-xl font-semibold"
					>{bigNumberToString(pondPending, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)}</span
				>
			</div>
			<div
				class="flex h-52 w-36 flex-col items-center justify-center rounded-xl bg-[#F4F4F6] text-[#030115]"
			>
				<div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#B4B6B6]">
					<img src={staticImages.calendarIcon} alt="End of cycle" />
				</div>
				<span class="mt-4 text-lg font-light leading-5">End of cycle</span>
				<span class="text-xl font-semibold">{epochSecToString(endTimestamp)}</span>
			</div>
		</div>
	</svelte:fragment>
</Modal>
