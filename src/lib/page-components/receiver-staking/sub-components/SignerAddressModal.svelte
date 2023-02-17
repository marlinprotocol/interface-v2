<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { signerAddressStore } from '$lib/data-stores/signerStore';
	import type { Address } from '$lib/types/storeTypes';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { DEFAULT_SIGNER_ADDRESS_STORE } from '$lib/utils/constants/storeDefaults';
	import { closeModal, isAddressValid } from '$lib/utils/helpers/commonHelper';

	let updatedSignerAddress: Address = '';
	let submitLoading = false;
	let updatedSignerAddressInputDirty = false;
	let signerAddressIsValid: boolean;
	const modalFor = 'signer-address-modal';
	const tooltipText = 'The address of the signer account.';
	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary text-primary focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};

	async function handleSubmitClick() {
		submitLoading = true;
		await signerAddressStore.set(updatedSignerAddress.toLowerCase());
		updatedSignerAddress = '';
		submitLoading = false;
		closeModal(modalFor);
	}

	const handleUpdatedSignerAddressInput = (event: Event) => {
		updatedSignerAddressInputDirty = true;
		const target = event.target as HTMLInputElement;
		if (target.value === '') {
			// TODO: this is a workaround for resetting input field when user enters '' for signer address
			updatedSignerAddressInputDirty = false;
		}
		signerAddressIsValid = target.value ? isAddressValid(target.value) : false;
	};

	$: submitEnable =
		!!updatedSignerAddress &&
		updatedSignerAddress !== $signerAddressStore &&
		signerAddressIsValid &&
		updatedSignerAddressInputDirty;
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{#if $signerAddressStore !== DEFAULT_SIGNER_ADDRESS_STORE}
			{'UPDATE SIGNER ADDRESS'}
		{:else}
			{'SIGNER ADDRESS'}
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'Some random stuff about the signer address and how it is being used.'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		{#if $signerAddressStore !== DEFAULT_SIGNER_ADDRESS_STORE}
			<InputCard styles="mb-4">
				<div class={styles.titleIcon}>
					<Text variant="small" text={'Current Signer Address'} />
					<TooltipIcon {tooltipText} />
				</div>
				<form>
					<div class="flex gap-2 items-center">
						<!-- TODO: address validation -->
						<input
							bind:value={$signerAddressStore}
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
				<Text variant="small" text={'Input Signer Address'} />
				<TooltipIcon {tooltipText} />
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
		{#if updatedSignerAddress === $signerAddressStore && signerAddressIsValid}
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
