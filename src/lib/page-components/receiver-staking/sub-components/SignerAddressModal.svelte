<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { setSignerAddress } from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import type { Address } from '$lib/types/storeTypes';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import { isAddressValid } from '$lib/utils/helpers/commonHelper';

	let updatedSignerAddress: Address = '';
	let submitLoading = false;
	let updatedSignerAddressInputDirty = false;
	let signerAddressIsValid: boolean;
	let signerAddressIsUnique: boolean = false;

	export let showDialog: boolean = false;

	const subtitle =
		'This is the address used by the receiver to give tickets to clusters. The signer address can be found in the receiver client.';
	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'input input-ghost h-[30px] w-full mt-1 p-0 font-semibold text-xl disabled:text-primary text-primary focus-within:text-primary placeholder:text-primary/[.2] focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};

	async function handleSubmitClick() {
		submitLoading = true;
		try {
			await setSignerAddress(updatedSignerAddress);
			await receiverStakingStore.update((data) => {
				data.signer = updatedSignerAddress;
				return data;
			});
			updatedSignerAddress = '';
			submitLoading = false;
			showDialog = false;
			resetInputs();
		} catch (e) {
			console.log('error submitting', e);
		} finally {
			submitLoading = false;
		}
	}

	//reset amount and signer address
	const resetInputs = () => {
		signerAddressIsValid = false;
		updatedSignerAddress = '';
		updatedSignerAddressInputDirty = false;
	};

	const handleUpdatedSignerAddressInput = async (event: Event) => {
		updatedSignerAddressInputDirty = true;
		const target = event.target as HTMLInputElement;

		if (target.value && target.value !== $receiverStakingStore.signer) {
			submitLoading = true;

			[signerAddressIsValid, signerAddressIsUnique] = await isAddressValid(target.value);
			submitLoading = false;
		} else {
			signerAddressIsValid = false;
			signerAddressIsUnique = false;
		}
	};

	$: submitEnable =
		!!updatedSignerAddress &&
		updatedSignerAddress !== $receiverStakingStore.signer &&
		signerAddressIsValid &&
		signerAddressIsUnique &&
		updatedSignerAddressInputDirty;
</script>

<Dialog bind:showDialog onClose={resetInputs}>
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
							autocomplete="off"
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
						autocomplete="off"
						id="updatedSignerAddress"
						class={`hideInputNumberAppearance ${styles.inputNumber}`}
						placeholder="Enter Here"
					/>
				</div>
			</form>
		</InputCard>

		{#if signerAddressIsValid && updatedSignerAddressInputDirty && !signerAddressIsUnique}
			<InputCard variant="warning" styles="mt-4">
				<Text
					variant="small"
					styleClass="text-red-500 my-2"
					text={MESSAGES.FORM.VALIDATION.SIGNER_EXISTS}
				/>
			</InputCard>
		{/if}

		{#if !signerAddressIsValid && updatedSignerAddressInputDirty && updatedSignerAddress !== $receiverStakingStore.signer}
			<InputCard variant="warning" styles="mt-4">
				<Text
					variant="small"
					styleClass="text-red-500 my-2"
					text={MESSAGES.FORM.VALIDATION.ADDRESS}
				/>
			</InputCard>
		{/if}
		{#if updatedSignerAddress === $receiverStakingStore.signer && !signerAddressIsValid && $receiverStakingStore.signer !== DEFAULT_RECEIVER_STAKING_DATA.signer}
			<InputCard variant="warning" styles="mt-4">
				<Text
					variant="small"
					styleClass="text-red-500 my-2"
					text={MESSAGES.FORM.VALIDATION.ADDRESS_SAME}
				/>
			</InputCard>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			size="large"
			styleClass={'btn-block'}>UPDATE</Button
		>
	</svelte:fragment>
</Dialog>
