<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';

	import { isAddressValid } from '$lib/utils/helpers/commonHelper';
	import { stringToBigNumber } from '$lib/utils/helpers/conversionHelper';

	let rewardsAddress = '';
	let stakeAmountString = '';
	let stakeAmount = 0n;

	function getRewardAddressError(address: string) {
		if (!address.startsWith('0x')) {
			return 'The reward address needs to start with 0x';
		} else if (address.length !== 42) {
			return 'The rewards address needs to be 42 characters long';
		}
		return '';
	}

	$: rewardAddressError = getRewardAddressError(rewardsAddress);
	$: stakeAmount = stringToBigNumber(stakeAmountString, 18);
	$: rewardAddressIsValid = rewardsAddress !== '' ? isAddressValid(rewardsAddress) : true;
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
				bind:input={rewardsAddress}
				placeholder="Address which will receive rewards"
				label="Reward address"
			/>
		</div>
		<ErrorTextCard showError={!rewardAddressIsValid} errorMessage={rewardAddressError} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button variant="filled" styleClass="w-full font-normal" size="large">Approve</Button>
	</svelte:fragment>
</Modal>
