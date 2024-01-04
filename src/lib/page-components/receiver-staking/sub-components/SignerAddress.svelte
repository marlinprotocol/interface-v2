<script lang="ts">
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import { minifyAddress } from '$lib/utils/helpers/commonHelper';
	import edit from 'svelte-awesome/icons/edit';
	import SignerAddressModal from '$lib/page-components/receiver-staking/sub-components/SignerAddressModal.svelte';

	const modalFor = 'signer-address-modal';

	let innerWidth = 0;

	$: displayAddress =
		$receiverStakingStore.signer !== null &&
		$receiverStakingStore.signer !== DEFAULT_RECEIVER_STAKING_DATA.signer
			? innerWidth >= 640
				? minifyAddress($receiverStakingStore.signer, 22, 10)
				: minifyAddress($receiverStakingStore.signer, 6, 6)
			: '';
</script>

<svelte:window bind:innerWidth />
<TextInputWithEndButton
	title="Signer Address"
	tooltipText="This is the address used by the receiver to give tickets to clusters. The signer address can be found in the receiver client."
	placeholder="Set signer address"
	bind:input={displayAddress}
	disabled={true}
>
	<svelte:fragment slot="endButton">
		{#if $connected}
			<ModalButton variant="text" size="tiniest" {modalFor}>
				<Icon data={edit} size={18} />
			</ModalButton>
			<SignerAddressModal {modalFor} />
		{:else}
			<button
				type="button"
				on:click={() => {
					addToast({
						message: 'Please connect your wallet.',
						variant: 'error'
					});
				}}
			>
				<Icon data={edit} size={18} />
			</button>
		{/if}
	</svelte:fragment>
</TextInputWithEndButton>
