<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import type { MpondEligibleCyclesModel } from '$lib/types/bridgeComponentType';
	import MpondConversionCycleModal from '../modals/MpondConversionCycleModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let eligibleCycles: MpondEligibleCyclesModel[];
	export let endEpochTime: number;
	export let currentCycle: number;

	let showModalConversionCycleDialog: boolean = false;
</script>

<Button
	variant="text"
	onclick={() => {
		showModalConversionCycleDialog = true;
	}}
>
	<HistoryDataIconButton src={'/images/cycleimg.svg'} text={'See cycle'} />
</Button>
<MpondConversionCycleModal
	cycles={eligibleCycles}
	bind:showModalConversionCycleDialog
	{endEpochTime}
	{currentCycle}
/>
