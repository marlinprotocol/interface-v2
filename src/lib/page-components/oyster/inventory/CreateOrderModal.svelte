<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import AmountInputWithTitle from '$lib/components/inputs/AmountInputWithTitle.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { isInputAmountValid } from '$lib/utils/helpers/commonHelper';
	import { BigNumber } from 'ethers';

	export let modalFor: string;

	//initial states
	let merchant: string = '';
	let instance: string = '';
	let region: string = '';
	let rate: BigNumber = BigNumber.from('12300000000000000000');
	let durationString: string = '';
	let enclaveImageUrl: string = '';

	$: duration = isInputAmountValid(durationString) ? Number(durationString) : 0;

	$: cost = rate.mul(duration);

	//loading states
	let submitLoading = false;

	//merchant states
	let merchantIsValid = true;
	let inValidMessage = '';
	let merchantInputDirty = false;

	/**
	 * checks if address is valid as user types input
	 * @param event
	 */
	const handleUpdatedSignerAddressInput = async (event: Event) => {};

	const handleSubmitClick = async () => {};

	//reset amount and signer address
	const resetInputs = () => {
		merchantIsValid = true;
		merchantInputDirty = false;
		inValidMessage = '';
	};

	$: submitEnable =
		merchantIsValid &&
		!!merchant &&
		!!instance &&
		!!region &&
		!!rate &&
		!!duration &&
		!!cost &&
		!!enclaveImageUrl;

	$: subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';
	const styles = {
		inputText: 'px-4 py-2',
		inputNumber: ''
	};
</script>

<Modal {modalFor} onClose={resetInputs}>
	<svelte:fragment slot="title">
		{'Create Order'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4">
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Merchant'}
				placeholder={'Enter merchant name or address'}
				bind:input={merchant}
			>
				<svelte:fragment slot="endButton">
					{#if $connected}
						<CollapseButton />
					{/if}
				</svelte:fragment>
			</TextInputWithEndButton>
			<ErrorTextCard
				showError={!merchantIsValid && merchantInputDirty}
				errorMessage={inValidMessage}
			/>
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Instance'}
				placeholder={'Enter or select instance'}
				bind:input={instance}
			>
				<svelte:fragment slot="endButton">
					{#if $connected}
						<CollapseButton />
					{/if}
				</svelte:fragment>
			</TextInputWithEndButton>
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Region'}
				placeholder={'Enter or select region'}
				bind:input={region}
			>
				<svelte:fragment slot="endButton">
					{#if $connected}
						<CollapseButton />
					{/if}
				</svelte:fragment>
			</TextInputWithEndButton>
			<div class="flex gap-4">
				<AmountInputWithTitle
					title={'Rate'}
					inputAmountString={bigNumberToCommaString(rate)}
					disabled
					prefix={'$'}
					suffix={'/day'}
				/>
				<AmountInputWithTitle
					title={'Duration'}
					bind:inputAmountString={durationString}
					suffix={'Days'}
				/>
				<AmountInputWithTitle
					title={'Cost'}
					inputAmountString={bigNumberToCommaString(cost)}
					suffix={'USDC'}
				/>
			</div>
			<TextInputWithEndButton
				styleClass={styles.inputText}
				title={'Enclave Image URL'}
				placeholder={'Paste URL here'}
				bind:input={enclaveImageUrl}
			/>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!submitEnable}
			loading={submitLoading}
			onclick={handleSubmitClick}
			size="large"
			styleClass={'btn-block my-0'}>DEPLOY</Button
		>
	</svelte:fragment>
</Modal>
