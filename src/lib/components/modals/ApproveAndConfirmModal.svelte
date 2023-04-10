<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import SuccessfulConversionModal from '$lib/page-components/bridge/modals/SuccessfulConversionModal.svelte';
	import { amountPrecision, BigNumberZero } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString, mPondToPond, pondToMPond } from '$lib/utils/conversion';
	import { closeModal, openModal } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import LoadingAnimatedPing from '../loading/LoadingAnimatedPing.svelte';

	export let handleApproveClick: () => Promise<void>;
	export let handleConfirmClick: () => Promise<void>;
	export let handleSuccessFinishClick: () => void;
	export let approved: boolean;
	export let rowIndex: number;
	export let approveButtonText = 'APPROVE';
	export let confirmButtonText = 'CONFIRM';
	export let amountConverted: BigNumber = BigNumberZero;
	export let conversionFrom: 'pond' | 'mPond' = 'pond';

	export let modalForApproveConfirm: string;

	$: amountConvertedFrom = bigNumberToCommaString(amountConverted, amountPrecision(conversionFrom));
	$: amountConvertedTo = bigNumberToCommaString(
		conversionFrom === 'pond' ? pondToMPond(amountConverted) : mPondToPond(amountConverted),
		amountPrecision(conversionFrom === 'pond' ? 'mPond' : 'pond')
	);
	$: conversionFromText = conversionFrom === 'pond' ? 'POND' : 'MPond';
	$: conversionToText = conversionFrom === 'pond' ? 'MPond' : 'POND';
	$: modalForSuccessConversion = `success-conversion-modal-${rowIndex}`;
	$: console.log(modalForSuccessConversion);
	let approveLoading: boolean;
	let confirmLoading: boolean;

	const approveClick = async () => {
		try {
			approveLoading = true;
			await handleApproveClick();
			approveLoading = false;
		} catch (e) {
			approveLoading = false;
			throw e;
		}
	};

	const confirmClick = async () => {
		try {
			confirmLoading = true;
			await handleConfirmClick();
			handleSuccessFinishClick();
			closeModal(modalForApproveConfirm);
			openModal(modalForSuccessConversion);
		} catch (e) {
			throw e;
		} finally {
			confirmLoading = false;
		}
	};
	// const modalWidth = 'max-w-[500px]';

	const styles = {
		baseText: 'grow text-left  font-normal',
		text: 'text-grey-500 font-[15px]',
		textBold: 'font-semibold text-black',
		textDisabled: 'font-semibold text-grey-300'
	};
</script>

<Modal modalFor={modalForApproveConfirm}>
	<svelte:fragment slot="title">
		{!approved ? 'Approve Transaction' : 'Confirm Transaction'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex gap-5 h-[50px]">
			<div class="flex flex-col items-center">
				{#if approved}
					<img src="/images/vectorcheck.svg" alt="Copy" width="20px" height="20px" />
				{:else}
					<LoadingAnimatedPing loading={approveLoading}>
						<Text variant="small" styleClass="font-semibold" text={'1'} />
					</LoadingAnimatedPing>
				{/if}
				{#if approved}
					<div class="h-full w-[0.1px] bg-grey-400" />
				{/if}
			</div>
			<div class={`${styles.text} ${styles.baseText}`}>
				<span>{'Approve'}</span>
				<span class={styles.textBold}>
					{`${amountConvertedFrom} ${conversionFromText}`}
				</span>
				<span>{'for conversion'}</span>
			</div>
		</div>
		<div class={`flex gap-5`}>
			<LoadingAnimatedPing loading={confirmLoading}>
				<Text variant="small" styleClass="font-semibold" text={'2'} />
			</LoadingAnimatedPing>
			<div class={`${approved ? styles.text : 'text-grey-300'} ${styles.baseText}`}>
				<span>{'Convert'}</span>
				<span class={approved ? styles.textBold : styles.textDisabled}>
					{`${amountConvertedFrom} ${conversionFromText}`}
				</span>
				<span>{'to'}</span>
				<span class={approved ? styles.textBold : styles.textDisabled}>
					{`${amountConvertedTo} ${conversionToText}`}
				</span>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		{#if !approved}
			<Button variant="filled" size="large" loading={approveLoading} onclick={approveClick}>
				{approveButtonText}
			</Button>
		{:else}
			<Button
				size="large"
				variant="filled"
				styleClass="w-full"
				onclick={confirmClick}
				loading={confirmLoading}
			>
				{confirmButtonText}
			</Button>
		{/if}
	</svelte:fragment>
</Modal>
<SuccessfulConversionModal
	modalFor={modalForSuccessConversion}
	{amountConverted}
	{conversionFrom}
/>
