<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';

	import { closeModal, isAddressValid } from '$lib/utils/helpers/commonHelper';

	let rewardsAddress = '';
	let updateButtonLoading = false;

	function getRewardAddressError(address: string) {
		if (!address.startsWith('0x')) {
			return 'The reward address needs to start with 0x';
		} else if (address.length !== 42) {
			return 'The rewards address needs to be 42 characters long';
		} else if (address === $kalypsoStore.stakingDetails.rewardsAddress) {
			return 'The rewards address cannot be the same as the current rewards address';
		}
		return '';
	}

	function handleUpdateClick() {
		updateButtonLoading = true;
		console.log('Updating reward address...');
		updateButtonLoading = false;
		closeModal('update-reward-address-modal');
	}

	$: rewardAddressError = getRewardAddressError(rewardsAddress);
	$: rewardAddressIsValid =
		rewardsAddress !== ''
			? isAddressValid(rewardsAddress) &&
				rewardsAddress !== $kalypsoStore.stakingDetails.rewardsAddress
			: true;
	$: enableUpdateButton = rewardsAddress !== '' && rewardAddressIsValid && !updateButtonLoading;
</script>

<Modal modalFor="update-reward-address-modal">
	<svelte:fragment slot="title">Update</svelte:fragment>
	<svelte:fragment slot="subtitle"
		>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="mt-4 flex flex-col gap-4">
			<TextInputWithEndButton
				styleClass="w-full rounded-[100px]"
				bind:input={$kalypsoStore.stakingDetails.rewardsAddress}
				disabled
				label="Current reward address"
			/>
		</div>
		<div class="mt-4 flex flex-col gap-4">
			<TextInputWithEndButton
				styleClass="w-full rounded-[100px]"
				bind:input={rewardsAddress}
				placeholder="Address which will receive rewards"
				label="New reward address"
			/>
		</div>
		<ErrorTextCard showError={!rewardAddressIsValid} errorMessage={rewardAddressError} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			onclick={handleUpdateClick}
			variant="filled"
			styleClass="w-full font-normal"
			loading={updateButtonLoading}
			disabled={!enableUpdateButton}
			size="large">Update Rewards Address</Button
		>
	</svelte:fragment>
</Modal>
