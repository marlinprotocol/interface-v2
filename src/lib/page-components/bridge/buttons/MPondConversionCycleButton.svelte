<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import type { MPondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import MPondConversionCycleModal from '../modals/MPondConversionCycleModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let eligibleCycles: MPondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;

	let showModalConversionCycleDialog = false;
</script>

<Button
	size="small"
	variant="text"
	onclick={() => {
		showModalConversionCycleDialog = true;
	}}
>
	<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
</Button>
<MPondConversionCycleModal
	cycles={eligibleCycles}
	bind:showModalConversionCycleDialog
	{endEpochTime}
	{currentCycle}
/>
