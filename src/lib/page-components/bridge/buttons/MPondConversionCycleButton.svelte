<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import type { MPondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import MPondConversionCycleModal from '../modals/MPondConversionCycleModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let eligibleCycles: MPondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;
	export let modalFor: string;
</script>

<ModalButton size="tiniest" variant="text" {modalFor}>
	<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
</ModalButton>
<MPondConversionCycleModal {modalFor} {endEpochTime} {currentCycle} cycles={eligibleCycles} />
