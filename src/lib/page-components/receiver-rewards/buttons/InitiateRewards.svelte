<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import InitiateRewardModal from '$lib/page-components/receiver-rewards/modals/InitiateRewardModal.svelte';

	const modalFor = 'initiate-reward-modal';
</script>

<ModalButton {modalFor} styleClass="h-14 text-base font-semibold w-full">GIVE REWARDS</ModalButton>
<InitiateRewardModal {modalFor} />
