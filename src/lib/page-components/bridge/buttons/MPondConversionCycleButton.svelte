<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import MpondConversionCycleModal from '../modals/MpondConversionCycleModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';
	import type { MpondEligibleCyclesModel } from '$lib/types/bridgeComponentType';

	export let eligibleCycles: MpondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;

	let showDialog: boolean = false;
</script>

<Button
	variant="text"
	onclick={() => {
		showDialog = true;
	}}
>
	<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
</Button>
<MpondConversionCycleModal cycles={eligibleCycles} bind:showDialog {endEpochTime} {currentCycle} />
