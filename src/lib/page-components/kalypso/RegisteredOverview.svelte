<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { closeModal, removeTrailingZeros } from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
	import { handleUnregisterInKalypso } from '$lib/utils/services/kalypsoServices';
	import UpdateRewardAddModal from './modals/UpdateRewardAddModal.svelte';

	let unregisterLoading = false;

	async function handleUnregisterClick() {
		unregisterLoading = true;
		try {
			await handleUnregisterInKalypso($walletStore.address);
			unregisterLoading = false;
			closeModal('kalypso-register-modal');
		} catch (error) {
			unregisterLoading = false;
		}
	}
</script>

<div class="flex w-full flex-col gap-4">
	<div class="mb-2 flex flex-col items-start justify-center">
		<div class="font-poppins text-2xl font-medium text-[#030115]">Overview</div>
	</div>
	<div class="flex flex-row items-center justify-center gap-4">
		<TextInputWithEndButton
			styleClass="w-full rounded-[100px]"
			bind:input={$walletStore.address}
			label="Admin Address"
			disabled
		/>
		<TextInputWithEndButton
			styleClass="w-full rounded-[100px]"
			bind:input={$kalypsoStore.stakingDetails.rewardsAddress}
			placeholder="Address which will receive rewards"
			label="Reward address"
			disabled
		/>
	</div>
	<div class="flex flex-row items-center justify-between gap-4">
		<div class="flex w-2/5 flex-row items-center gap-4">
			<AmountInputWithTitle
				title="Stake"
				inputAmountString={removeTrailingZeros(
					bigNumberToString($kalypsoStore.stakingDetails.stakedAmount)
				)}
				suffix={$chainConfigStore.tokens.MOCK?.currency}
				disabled
			/>
			<AmountInputWithTitle
				title="Compute"
				inputAmountString={bigNumberToString($kalypsoStore.stakingDetails.declaredCompute, 0, 0)}
				suffix={$kalypsoStore.stakingDetails.declaredCompute === 1n ? 'vCPU' : 'vCPUs'}
				disabled={false}
				onlyInteger
			/>
		</div>
		<div class="flex w-full flex-row items-center justify-end gap-4">
			<ModalButton
				size="large"
				variant="outlined"
				styleClass="font-normal w-32"
				modalFor="update-reward-address-modal"
			>
				Update
			</ModalButton>
			<Button
				onclick={handleUnregisterClick}
				loading={unregisterLoading}
				disabled={unregisterLoading}
				variant="filled"
				styleClass="font-normal flex-nowrap w-32"
				size="large">Unregister</Button
			>
		</div>
	</div>
</div>
<UpdateRewardAddModal />
