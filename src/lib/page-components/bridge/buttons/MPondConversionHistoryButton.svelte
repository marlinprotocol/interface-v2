<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import MpondConversionHistoryModal from '../modals/MpondConversionHistoryModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let conversionHistory: MPondToPondHistoryDataModel['conversionHistory'];

	let showModal: boolean = false;
</script>

<MpondConversionHistoryModal conversions={conversionHistory} bind:showModal />
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
		styleClass={buttonClasses.convertButton}
		onclick={() => {
			showModal = true;
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
