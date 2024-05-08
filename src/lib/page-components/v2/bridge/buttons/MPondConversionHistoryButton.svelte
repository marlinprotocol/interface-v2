<script lang="ts">
	import ModalButton from '$lib/atoms/v2/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import MPondConversionHistoryModal from '$lib/page-components/v2/bridge/modals/MPondConversionHistoryModal.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let conversionHistory: MPondToPondHistoryDataModel['conversionHistory'];
	export let modalFor: string;

	const classes =
		'flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#D9DADE]';
</script>

<MPondConversionHistoryModal conversions={conversionHistory} {modalFor} />
{#if !conversionHistory?.length}
	<div class={cn(classes, 'cursor-not-allowed opacity-50')}>
		<img src={staticImages.historyIcon} alt="History Icon" />
	</div>
{:else}
	<ModalButton variant="text" size="tiniest" {modalFor}>
		<div class={cn(classes, 'hover:bg-[#F0F0F0]')}>
			<img src={staticImages.historyIcon} alt="History Icon" />
		</div>
	</ModalButton>
{/if}
