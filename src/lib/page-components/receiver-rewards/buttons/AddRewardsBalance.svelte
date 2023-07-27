<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import AddRewardBalanceModal from '$lib/page-components/receiver-rewards/modals/AddRewardBalanceModal.svelte';

	const modalFor = 'initiate-reward-balance-modal';
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold w-full'
	};
</script>

<ModalButton {modalFor} styleClass={`${styles.buttonLarge}`}>ADD BALANCE</ModalButton>
<AddRewardBalanceModal {modalFor} />
