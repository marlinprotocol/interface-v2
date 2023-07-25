<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import UpdateRewardModal from '$lib/page-components/receiver-rewards/modals/UpdateRewardModal.svelte';

	const modalFor = 'initiate-reward-modal';
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold w-full'
	};
</script>

<ModalButton {modalFor} styleClass={`${styles.buttonLarge}`}>UPDATE REWARDS</ModalButton>
<UpdateRewardModal {modalFor} />
