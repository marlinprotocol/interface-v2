<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import MPondConversionHistoryModal from '../modals/MPondConversionHistoryModal.svelte';
	import HistoryDataIconButton from '../sub-components/HistoryDataIconButton.svelte';

	export let conversionHistory: MPondToPondHistoryDataModel['conversionHistory'];

	export let modalFor: string;
</script>

<MPondConversionHistoryModal conversions={conversionHistory} {modalFor} />
{#if !conversionHistory?.length}
	<HistoryDataIconButton
		variant={'disabled'}
		src={'/images/historyicon.svg'}
		imgWidth={14}
		text={'History'}
		disabled={true}
	/>
{:else}
	<ModalButton variant="text" size="tiniest" {modalFor}>
		<HistoryDataIconButton
			variant={'primary'}
			src={'/images/historyicon.svg'}
			imgWidth={14}
			text={'History'}
		/>
	</ModalButton>
{/if}
