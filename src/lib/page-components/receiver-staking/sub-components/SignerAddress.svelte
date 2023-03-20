<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import edit from 'svelte-awesome/icons/edit';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import OperatorAddressModal from './SignerAddressModal.svelte';
	import { minifyAddress } from '$lib/utils/helpers/commonHelper';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import SignerAddressModal from './SignerAddressModal.svelte';
	import Button from '$lib/atoms/buttons/Button.svelte';

	let showDialog = false;
	const tooltipText =
		'This is the address used by the receiver to give tickets to clusters. The signer address can be found in the receiver client.';
	const title = 'Signer Address';
	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary disabled:placeholder:text-primary/[.3] focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};

	let innerWidth = 0;

	$: displayAddress =
		$receiverStakingStore.signer !== null &&
		$receiverStakingStore.signer !== DEFAULT_RECEIVER_STAKING_DATA.signer
			? innerWidth >= 640
				? minifyAddress($receiverStakingStore.signer, 24, 10)
				: minifyAddress($receiverStakingStore.signer, 8, 6)
			: '';
</script>

<svelte:window bind:innerWidth />
<InputCard>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
		<TooltipIcon {tooltipText} />
	</div>
	<form>
		<div class="flex gap-2 items-center">
			<!-- TODO: add number validation -->
			<input
				bind:value={displayAddress}
				id="signer-address-display"
				class={`hideInputNumberAppearance ${styles.inputNumber}`}
				placeholder="Set signer address"
				disabled={true}
			/>

			{#if $connected}
				<SignerAddressModal bind:showDialog />
				<Button
					variant="text"
					onclick={() => {
						showDialog = true;
					}}
				>
					<Icon data={edit} size={18} />
				</Button>
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
		</div>
	</form>
</InputCard>
<OperatorAddressModal />
