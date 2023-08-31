<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import UpdateTicketRewardsModal from '$lib/page-components/receiver-rewards/modals/UpdateTicketRewardsModal.svelte';

	const modalFor = 'update-ticket-reward-modal';
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold w-full'
	};
</script>

<ModalButton {modalFor} variant="outlined" styleClass={`${styles.buttonLarge}`}
	>UPDATE REWARDS</ModalButton
>
<UpdateTicketRewardsModal {modalFor} />
