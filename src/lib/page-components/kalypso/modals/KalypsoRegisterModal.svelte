<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { walletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';

	import Text from '$lib/atoms/texts/Text.svelte';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import {
		closeModal,
		inputAmountInValidMessage,
		isAddressValid,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import {
		handleApproveFundForKalypso,
		handleRegisterInKalypso
	} from '$lib/utils/services/kalypsoServices';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import type { TokenMetadata } from '$lib/types/environmentTypes';
	import { DEFAULT_KALYPSO_STORE } from '$lib/utils/constants/storeDefaults';

	let registerLoading = false;
	let approveLoading = false;
	let rewardsAddress = '';
	let stakeAmountString = '';
	let stakeAmount = 0n;
	let generatorData = '';
	let declaredComputeString = '';
	let stakeAmountStringError = '';
	let stakeAmountIsValid = true;
	let stakeAmountStringIsValid = true;
	let stakeAmountInputIsDirty = false;

	async function handleOnRegister() {
		registerLoading = true;
		console.log('registering...');
		try {
			const finalGeneratorData =
				generatorData === '' ? DEFAULT_KALYPSO_STORE.stakingDetails.generatorData : generatorData;

			await handleRegisterInKalypso(
				rewardsAddress,
				declaredCompute,
				stakeAmount,
				finalGeneratorData
			);
			registerLoading = false;
			closeModal('kalypso-register-modal');
		} catch (error) {
			registerLoading = false;
		}
	}

	async function handleApprove() {
		approveLoading = true;
		console.log('approving...');
		try {
			await handleApproveFundForKalypso(
				stakeAmount,
				$chainConfigStore.tokens.MOCK as TokenMetadata,
				$chainConfigStore.contract_addresses.KALYPSO
			);
			approveLoading = false;
		} catch (error) {
			approveLoading = false;
		}
	}

	const handleUpdatedAmount = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const isAmount = isInputAmountValid(target.value);
			stakeAmountInputIsDirty = true;
			stakeAmountStringIsValid = isAmount;
		} else {
			stakeAmountInputIsDirty = false;
			stakeAmountStringIsValid = true;
		}
	};

	function handleMaxClick() {
		if ($walletBalanceStore.mock) {
			stakeAmountString = bigNumberToString($walletBalanceStore.mock, 18, POND_PRECISIONS, false);
			stakeAmountStringIsValid = true;
		}
	}

	function getRewardAddressError(address: string) {
		if (!address.startsWith('0x')) {
			return 'The reward address needs to start with 0x';
		} else if (address.length !== 42) {
			return 'The rewards address needs to be 42 characters long';
		}
		return '';
	}
	function getStakeAmountError(amount: bigint) {
		if (amount === 0n) {
			stakeAmountIsValid = false;
			return 'The stake amount cannot be 0';
		} else if (amount > $walletBalanceStore.mock) {
			stakeAmountIsValid = false;
			return 'The stake amount cannot be more than your wallet balance';
		} else {
			stakeAmountIsValid = true;
			return '';
		}
	}

	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalanceStore.mock,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}`;
	$: rewardAddressError = getRewardAddressError(rewardsAddress);
	$: declaredCompute = stringToBigNumber(declaredComputeString, 0);
	$: stakeAmount = stringToBigNumber(stakeAmountString, 18);
	$: stakeAmountStringError = inputAmountInValidMessage(stakeAmountString);
	$: stakeAmountError = getStakeAmountError(stakeAmount);
	$: rewardAddressIsValid = rewardsAddress !== '' ? isAddressValid(rewardsAddress) : true;
	$: enableApproveButton =
		stakeAmountIsValid &&
		rewardAddressIsValid &&
		stakeAmount !== 0n &&
		!approveLoading &&
		declaredCompute > 0n;
	$: enableRegisterButton =
		stakeAmountIsValid &&
		rewardAddressIsValid &&
		stakeAmount !== 0n &&
		declaredCompute > 0n &&
		!registerLoading;
</script>

<Modal modalFor="kalypso-register-modal">
	<svelte:fragment slot="title">{$kalypsoStore.registered ? 'Update' : 'Register'}</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<TextInputWithEndButton
				styleClass="w-full rounded-[100px]"
				disabled
				bind:input={$walletStore.address}
				label="Admin Address"
			/>
			<TextInputWithEndButton
				styleClass="w-full rounded-[100px]"
				bind:input={rewardsAddress}
				placeholder="Address which will receive rewards"
				label="Reward address"
			/><TextInputWithEndButton
				styleClass="w-full rounded-[100px]"
				bind:input={generatorData}
				placeholder="Data to be used by the generator? Lol idk what this is"
				label="Generator Data (Optional)"
			/><AmountInputWithTitle
				title="Declared Compute (vCPUs)"
				bind:inputAmountString={declaredComputeString}
				placeholder="Enter number of vCPUs you want to declare"
			/>
			<AmountInputWithTitle
				title="Stake"
				bind:inputAmountString={stakeAmountString}
				{handleUpdatedAmount}
				suffix={$chainConfigStore.tokens.MOCK?.currency}
				disabled={false}
			/>
		</div>
		<div class="flex items-center justify-end gap-2">
			<Text
				variant="small"
				styleClass="text-gray-400"
				fontWeight="font-normal"
				text={balanceText}
			/>
			<Divider direction="divider-vertical" />
			<MaxButton onclick={handleMaxClick} />
		</div>

		<ErrorTextCard showError={!rewardAddressIsValid} errorMessage={rewardAddressError} />
		<ErrorTextCard showError={!stakeAmountStringIsValid} errorMessage={stakeAmountStringError} />
		<ErrorTextCard
			showError={!stakeAmountIsValid && stakeAmountInputIsDirty && stakeAmountStringIsValid}
			errorMessage={stakeAmountError}
		/>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		{#if stakeAmount > $kalypsoStore.approvedAmount}
			<Button
				variant="filled"
				styleClass="w-full font-normal"
				size="large"
				disabled={!enableApproveButton}
				onclick={handleApprove}
				loading={approveLoading}
			>
				Approve
			</Button>
		{:else}
			<Button
				variant="filled"
				styleClass="w-full font-normal"
				size="large"
				disabled={!enableRegisterButton}
				onclick={handleOnRegister}
				loading={registerLoading}
			>
				Register
			</Button>
		{/if}
	</svelte:fragment>
</Modal>
