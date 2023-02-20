<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { setSignerAddress } from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import type { Address } from '$lib/types/storeTypes';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import { closeModal, isAddressValid } from '$lib/utils/helpers/commonHelper';

	let updatedSignerAddress: Address = '';
	let submitLoading = false;
	let updatedSignerAddressInputDirty = false;
	let signerAddressIsValid: boolean;
	const modalFor = 'signer-address-modal';
	const subtitle =
		'This is the address used by the receiver to give tickets to clusters. The signer address can be found in the receiver client.';
	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary text-primary focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};

	async function handleSubmitClick() {
		submitLoading = true;
		await setSignerAddress(updatedSignerAddress);
		await receiverStakingStore.update((data) => {
			data.signer = updatedSignerAddress;
			return data;
		});
		updatedSignerAddress = '';
		submitLoading = false;
		closeModal(modalFor);
	}

	const handleUpdatedSignerAddressInput = (event: Event) => {
		updatedSignerAddressInputDirty = true;
		const target = event.target as HTMLInputElement;

		signerAddressIsValid = target.value ? isAddressValid(target.value) : false;
	};

	$: submitEnable =
		!!updatedSignerAddress &&
		updatedSignerAddress !== $receiverStakingStore.signer &&
		signerAddressIsValid &&
		updatedSignerAddressInputDirty;
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{#if $receiverStakingStore.signer !== DEFAULT_RECEIVER_STAKING_DATA.signer}
			{'UPDATE SIGNER ADDRESS'}
		{:else}
			{'SIGNER ADDRESS'}
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		{#if $receiverStakingStore.signer !== DEFAULT_RECEIVER_STAKING_DATA.signer}
			<InputCard styles="mb-4">
				<div class={styles.titleIcon}>
					<Text variant="small" text={'Current Signer Address'} />
				</div>
				<form>
					<div class="flex gap-2 items-center">
						<!-- TODO: address validation -->
						<input
							bind:value={$receiverStakingStore.signer}
							id="currentSignerAddress"
							class={`hideInputNumberAppearance ${styles.inputNumber}`}
							disabled={true}
						/>
					</div>
				</form>
			</InputCard>
		{/if}
		<InputCard>
			<div class={styles.titleIcon}>
				<Text variant="small" text={'New Signer Address'} />
			</div>
			<form>
				<div class="flex gap-2 items-center">
					<!-- TODO: address validation -->
					<input
						bind:value={updatedSignerAddress}
						on:input={handleUpdatedSignerAddressInput}
						id="updatedSignerAddress"
						class={`hideInputNumberAppearance ${styles.inputNumber}`}
						placeholder="Enter Here"
					/>
				</div>
			</form>
		</InputCard>

		{#if !signerAddressIsValid && updatedSignerAddressInputDirty}
			<InputCard variant="warning" styles="mt-4">
				<Text
					variant="small"
					styleClass="text-red-500 my-2"
					text={MESSAGES.FORM.VALIDATION.ADDRESS}
				/>
			</InputCard>
		{/if}
		{#if updatedSignerAddress === $receiverStakingStore.signer && signerAddressIsValid}
			<InputCard variant="warning" styles="mt-4">
				<Text
					variant="small"
					styleClass="text-red-500 my-2"
					text={MESSAGES.FORM.VALIDATION.ADDRESS_SAME}
				/>
			</InputCard>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			styleClass={'btn-block h-14 text-base font-semibold'}>SUBMIT</FilledButton
		>
	</svelte:fragment>
</Modal>
