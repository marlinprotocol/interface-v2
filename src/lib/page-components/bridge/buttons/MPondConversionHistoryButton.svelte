<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import MPondConversionHistoryModal from '$lib/page-components/bridge/modals/MPondConversionHistoryModal.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let conversionHistory: MPondToPondHistoryDataModel['conversionHistory'];
	export let modalFor: string;

	const classes =
		'flex h-[45px] w-[45px] items-center justify-center rounded-full border border-grey-100';
</script>

<MPondConversionHistoryModal conversions={conversionHistory} {modalFor} />
{#if !conversionHistory?.length}
	<div class={cn(classes, 'icon-invert cursor-not-allowed opacity-50')}>
		<img src={staticImages.historyIcon} alt="History Icon" />
	</div>
{:else}
	<ModalButton variant="text" size="tiniest" {modalFor}>
		<div class={cn(classes, 'icon-invert hover:bg-[#F0F0F0]')}>
			<img src={staticImages.historyIcon} alt="History Icon" />
		</div>
	</ModalButton>
{/if}
