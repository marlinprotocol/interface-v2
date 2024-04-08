<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import type { MPondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import MPondConversionCycleModal from '$lib/page-components/bridge/modals/MPondConversionCycleModal.svelte';
	import HistoryDataIconButton from '$lib/page-components/bridge/sub-components/HistoryDataIconButton.svelte';

	export let eligibleCycles: MPondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;
	export let modalFor: string;
</script>

<ModalButton size="tiniest" variant="text" {modalFor}>
	<HistoryDataIconButton src={staticImages.Cycle} text="See cycle" />
</ModalButton>
<MPondConversionCycleModal {modalFor} {endEpochTime} {currentCycle} cycles={eligibleCycles} />
