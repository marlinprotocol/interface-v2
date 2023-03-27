<script lang="ts">
	import type { MPondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import MPondConversionCycleModal from '../modals/MPondConversionCycleModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let eligibleCycles: MPondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;
	export let modalFor: string;
</script>

<label for={modalFor}>
	<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
</label>
<MPondConversionCycleModal {modalFor} {endEpochTime} {currentCycle} cycles={eligibleCycles} />
