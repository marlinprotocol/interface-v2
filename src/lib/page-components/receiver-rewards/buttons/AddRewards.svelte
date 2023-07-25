<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import AddRewardModal from '$lib/page-components/receiver-rewards/modals/AddRewardModal.svelte';

	const modalFor = 'initiate-reward-modal';
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold w-full'
	};
</script>

<ModalButton {modalFor} styleClass={`${styles.buttonLarge}`}>GIVE REWARDS</ModalButton>
<AddRewardModal {modalFor} />
