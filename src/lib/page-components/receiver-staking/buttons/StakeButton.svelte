<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import StakeModal from '$lib/page-components/receiver-staking/StakeModal.svelte';

	const modalFor = 'stake-modal';
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold w-full'
	};
</script>

<ModalButton {modalFor} styleClass={`${styles.buttonLarge}`}>STAKE</ModalButton>
<StakeModal {modalFor} />
