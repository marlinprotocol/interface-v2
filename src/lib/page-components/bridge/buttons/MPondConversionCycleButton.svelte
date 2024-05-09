<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import MPondConversionCycleModal from '$lib/page-components/bridge/modals/MPondConversionCycleModal.svelte';

	export let modalFor: string;
	export let pondEligible: bigint;
	export let pondInProcess: bigint;
	export let pondPending: bigint;
	export let endTimestamp: number;
</script>

<ModalButton size="tiniest" variant="text" {modalFor}>
	<div
		class="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#D9DADE] hover:bg-[#F0F0F0]"
	>
		<img src={staticImages.conversionCycleIcon} alt="Conversion Cycle Icon" />
	</div>
</ModalButton>
<MPondConversionCycleModal {modalFor} {pondEligible} {pondInProcess} {pondPending} {endTimestamp} />
