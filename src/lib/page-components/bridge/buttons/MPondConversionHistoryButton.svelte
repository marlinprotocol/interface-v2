<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import MPondConversionHistoryModal from '../modals/MPondConversionHistoryModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let conversionHistory: MPondToPondHistoryDataModel['conversionHistory'];

	let showConversionHistoryDialog = false;
</script>

<MPondConversionHistoryModal conversions={conversionHistory} bind:showConversionHistoryDialog />
{#if !conversionHistory?.length}
	<Button variant={'outlined'} styleClass="border-none pointer-events-none">
		<HistoryDataIconButton
			variant={'disabled'}
			src={'/images/historyicon.svg'}
			imgWidth={14}
			text={'History'}
			disabled={true}
		/>
	</Button>
{:else}
	<Button
		variant={'text'}
		onclick={() => {
			showConversionHistoryDialog = true;
		}}
	>
		<HistoryDataIconButton
			variant={'primary'}
			src={'/images/historyicon.svg'}
			imgWidth={14}
			text={'History'}
		/>
	</Button>
{/if}
