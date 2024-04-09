<script lang="ts">
	import ModalButton from '$lib/atoms/v2/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import type { MPondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import MPondConversionCycleModal from '$lib/page-components/v2/bridge/modals/MPondConversionCycleModal.svelte';

	export let eligibleCycles: MPondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;
	export let modalFor: string;
</script>

<ModalButton size="tiniest" variant="text" {modalFor}>
	<div
		class="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#D9DADE] hover:bg-[#F0F0F0]"
	>
		<img src={staticImages.conversionCycleIcon} alt="Conversion Cycle Icon" />
	</div>
</ModalButton>
<MPondConversionCycleModal {modalFor} {endEpochTime} {currentCycle} cycles={eligibleCycles} />
