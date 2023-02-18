<script lang="ts">
	import FilledButton from '$lib/atoms/buttons/FilledButton.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { withdrawStakingToken } from '$lib/controllers/contractController';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import ModalPondInput from '$lib/page-components/receiver-staking/sub-components/ModalPondInput.svelte';
	import { DEFAULT_RECEIVER_STAKING_DATA } from '$lib/utils/constants/storeDefaults';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		stringToBigNumber
	} from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	const modalFor = 'unstake-modal';

	//initial amount states
	let inputAmount: BigNumber;
	let inputAmountString: string;

	$: inputAmount = stringToBigNumber(inputAmountString);

	//loading states
	let submitLoading: boolean = false;

	// staked pond amount
	let maxAmount = BigNumber.from(DEFAULT_RECEIVER_STAKING_DATA.stakedBalance);

	let balanceText = 'Staked POND: 0.00';
	const unsubscribeReceiverStakedStore = receiverStakingStore.subscribe((value) => {
		const { stakedBalance, queuedBalance } = value;
		maxAmount = stakedBalance.add(queuedBalance);

		balanceText = `Staked: ${bigNumberToCommaString(stakedBalance)}${
			!queuedBalance.isZero() ? ', queued: ' + bigNumberToCommaString(queuedBalance) : ''
		}`;
	});

	onDestroy(unsubscribeReceiverStakedStore);

	$: pondDisabledText = !!inputAmount && inputAmount.gt(maxAmount) ? 'Insufficient POND' : '';
	$: submitEnable = !!inputAmount && inputAmount.gt(0) && maxAmount?.gte(inputAmount);

	const handleMaxClick = () => {
		if (!!maxAmount) {
			inputAmountString = bigNumberToString(maxAmount);
		}
	};
	const handleSubmitClick = async () => {
		submitLoading = true;
		try {
			await withdrawStakingToken(inputAmount);

			//substract input amount first from queued amount and then from staked amount
			receiverStakingStore.update((value) => {
				if (inputAmount.gt(value.queuedBalance)) {
					value.stakedBalance = value.stakedBalance.sub(inputAmount.sub(value.queuedBalance));
					value.queuedBalance = BigNumber.from(0);
				} else {
					value.queuedBalance = value.queuedBalance.sub(inputAmount);
				}
				return value;
			});

			//reset input
			resetInputs();
		} catch (e) {
			console.log('error submitting', e);
		} finally {
			submitLoading = false;
		}
	};

	//reset input
	const resetInputs = () => {
		inputAmountString = '';
	};

	const styles = {
		inputMaxButton: `${buttonClasses.text} text-sm font-bold text-primary`
	};
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{'UNSTAKE POND'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<ModalPondInput
			title={'POND'}
			tooltipText={'Some text here'}
			bind:inputAmountString
			maxAmountText={balanceText}
		>
			<button slot="input-max-button" on:click={handleMaxClick} class={styles.inputMaxButton}
				>MAX</button
			>
		</ModalPondInput>

		{#if !!pondDisabledText}
			<Text variant="small" styleClass="text-red-500 my-2" text={pondDisabledText} />
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		<FilledButton
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			styleClass={'btn-block h-14 text-base font-semibold'}>WITHDRAW STAKE</FilledButton
		>
	</svelte:fragment>
</Modal>
