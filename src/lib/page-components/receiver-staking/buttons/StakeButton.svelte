<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import StakeModal from '$lib/page-components/receiver-staking/StakeModal.svelte';

	const modalFor = 'stake-modal';
</script>

<ModalButton {modalFor} styleClass="h-14 text-base font-semibold w-full">STAKE</ModalButton>
<StakeModal {modalFor} />
