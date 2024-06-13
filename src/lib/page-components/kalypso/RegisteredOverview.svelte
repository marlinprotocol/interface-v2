<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { walletStore } from '$lib/data-stores/walletProviderStore';
	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';
	import UpdateRewardAddModal from './modals/UpdateRewardAddModal.svelte';
</script>

<div class="flex w-full flex-col gap-4">
	<div class="mb-8 flex flex-col items-start justify-center">
		<div class="font-poppins text-lg font-medium leading-[-2px] text-[#030115]">Overview</div>
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
		<div class="flex w-full flex-row items-center gap-4">
			<AmountInputWithTitle
				title="Stake"
				inputAmountString={bigNumberToString($kalypsoStore.stakingDetails.stakedAmount)}
				suffix={$chainConfigStore.tokens.MOCK?.currency}
				disabled
			/>
			<AmountInputWithTitle
				title="Compute"
				inputAmountString={bigNumberToString($kalypsoStore.stakingDetails.declaredCompute, 0)}
				suffix={'%'}
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
			<Button variant="filled" styleClass="font-normal w-32" size="large">Unregister</Button>
		</div>
	</div>
</div>
<UpdateRewardAddModal />
