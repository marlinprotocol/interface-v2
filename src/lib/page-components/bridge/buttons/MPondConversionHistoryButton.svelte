<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import MpondConversionHistoryModal from '../modals/MpondConversionHistoryModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let conversionHistory: MPondToPondHistoryDataModel['conversionHistory'];

	let showDialog: boolean = false;
</script>

<MpondConversionHistoryModal conversions={conversionHistory} bind:showDialog />
{#if !conversionHistory?.length}
	<div class="mt-2">
		<HistoryDataIconButton
			variant={'disabled'}
			src={'/images/historyicon.svg'}
			text={'History'}
			disabled={true}
		/>
	</div>
{:else}
	<Button
		variant={'text'}
		styleClass={buttonClasses.convertButton}
		onclick={() => {
			showDialog = true;
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
