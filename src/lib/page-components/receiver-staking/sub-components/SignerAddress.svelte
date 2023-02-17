<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import edit from 'svelte-awesome/icons/edit';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { signerAddressStore } from '$lib/data-stores/signerStore';
	import OperatorAddressModal from './SignerAddressModal.svelte';
	import { minifyAddress } from '$lib/utils/helpers/commonHelper';
	import { DEFAULT_SIGNER_ADDRESS_STORE } from '$lib/utils/constants/storeDefaults';

	const tooltipText = 'The address of the signer account.';
	const title = 'Signer Address';
	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary disabled:placeholder:text-primary/[.3] focus-within:text-primary placeholder:text-primary/[.3] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};

	$: displayAddress =
		$signerAddressStore !== DEFAULT_SIGNER_ADDRESS_STORE
			? minifyAddress($signerAddressStore, 12, 10)
			: '';
</script>

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
				<label for="signer-address-modal">
					<Icon data={edit} size={18} />
				</label>
			{:else}
				<Icon data={edit} size={18} />
			{/if}
		</div>
	</form>
</InputCard>
<OperatorAddressModal />
