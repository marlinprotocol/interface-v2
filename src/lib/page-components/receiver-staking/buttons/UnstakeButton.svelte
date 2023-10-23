<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import UnstakeModal from '$lib/page-components/receiver-staking/UnstakeModal.svelte';

	export let disabled = false;

	let modalFor = 'unstake-modal';
</script>

<ModalButton
	{modalFor}
	{disabled}
	variant="outlined"
	styleClass="h-14 text-base font-semibold w-full">UNSTAKE</ModalButton
>
<UnstakeModal {modalFor} />
