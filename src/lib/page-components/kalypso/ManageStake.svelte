<script lang="ts">
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import MaxButton from '$lib/components/buttons/MaxButton.svelte';
	import { walletBalanceStore, connected } from '$lib/data-stores/walletProviderStore';
	import { bigNumberToString, stringToBigNumber } from '$lib/utils/helpers/conversionHelper';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import {
		cn,
		inputAmountInValidMessage,
		isInputAmountValid
	} from '$lib/utils/helpers/commonHelper';
	import AmountInputWithMaxButton from '$lib/components/inputs/AmountInputWithMaxButton.svelte';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { kalypsoStore, switchStakeTabInKalypsoStore } from '$lib/data-stores/kalypsoStore';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';

	let stakeAmountString = '';
	let stakeAmountIsValid = true;
	let stakeAmountErrorMessage = '';

	const handleUpdatedAmount = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value) {
			const isAmount = isInputAmountValid(target.value);
			const isLessThanWalletBalance =
				stringToBigNumber(target.value, 18) < $walletBalanceStore.pond;
			stakeAmountErrorMessage = inputAmountInValidMessage(target.value);
			stakeAmountIsValid = isAmount && isLessThanWalletBalance && stakeAmountErrorMessage === '';
		} else {
			stakeAmountIsValid = true;
		}
	};

	function handleMaxClick() {
		if ($walletBalanceStore.pond) {
			stakeAmountString = bigNumberToString($walletBalanceStore.mock, 18, POND_PRECISIONS, false);
			stakeAmountIsValid = true;
		}
	}

	$: balanceText = `Balance: ${bigNumberToString(
		$walletBalanceStore.mock,
		DEFAULT_CURRENCY_DECIMALS,
		POND_PRECISIONS
	)}`;
</script>

<div class="flex w-full flex-col gap-4">
	<div class="mb-8 flex flex-col items-start justify-center">
		<div class="flex items-center justify-center gap-1">
			<span class="font-poppins text-lg font-medium leading-[-2px] text-[#030115]"> Stake </span>
			<Tooltip placement="top">
				<img slot="tooltipIcon" src={staticImages.alertV2Icon} alt="Info" width={16} />
				<span slot="tooltipContent">This tooltip is for Stake</span></Tooltip
			>
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<div class="join mb-5">
			<button
				class={cn(
					{
						'bg-primary text-white': $kalypsoStore.activeStakeTab === 'add',
						'bg-white': $kalypsoStore.activeStakeTab !== 'add'
					},
					'join-item w-full rounded-l-xl border border-primary px-4 py-3 font-poppins text-base'
				)}
				on:click={() => switchStakeTabInKalypsoStore('add')}
			>
				Add
			</button>
			<button
				class={cn(
					{
						'bg-primary text-white': $kalypsoStore.activeStakeTab === 'withdraw',
						'bg-white': $kalypsoStore.activeStakeTab !== 'withdraw'
					},
					'join-item w-full rounded-r-xl border border-primary px-4 py-3 font-poppins text-base'
				)}
				on:click={() => switchStakeTabInKalypsoStore('withdraw')}
			>
				Withdraw
			</button>
		</div>
		<AmountInputWithMaxButton
			currency={$chainConfigStore.tokens.MOCK?.currency}
			bind:inputAmountString={stakeAmountString}
			{handleUpdatedAmount}
			maxAmountText={balanceText}
			inputCardVariant="none"
		>
			<MaxButton disabled={!$connected} slot="inputMaxButton" onclick={handleMaxClick} />
		</AmountInputWithMaxButton>
		<Button variant="filled" styleClass="w-full font-normal" size="large">Approve</Button>
	</div>
</div>
