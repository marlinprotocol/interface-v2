<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import UnstakeModal from '$lib/page-components/receiver-staking/UnstakeModal.svelte';

	export let disabled = false;

	let modalFor = 'unstake-modal';

	const styles = {
		buttonLarge: 'h-14 text-base font-semibold w-full'
	};
</script>

<ModalButton {modalFor} {disabled} variant="outlined" styleClass={`${styles.buttonLarge}`}
	>UNSTAKE</ModalButton
>
<UnstakeModal {modalFor} />
