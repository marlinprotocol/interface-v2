<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { DEFAULT_CURRENCY_DECIMALS } from '$lib/utils/constants/constants';
	import { bigNumberToString, mPondToPond, pondToMPond } from '$lib/utils/helpers/conversionHelper';
	import { closeModal, openModal } from '$lib/utils/helpers/commonHelper';
	import { staticImages } from '$lib/components/images/staticImages';
	import LoadingAnimationModal from '$lib/components/loading/LoadingAnimationModal.svelte';
	import { getAmountPrecision } from '$lib/utils/helpers/bridgeHelpers';

	export let handleApproveClick: () => Promise<void>;
	export let handleConfirmClick: () => Promise<void>;
	export let handleSuccessFinishClick: () => void;
	export let approved: boolean;
	export let rowIndex: number;
	export let approveButtonText = 'APPROVE';
	export let confirmButtonText = 'CONFIRM';
	export let amountConverted = 0n;
	export let conversionFrom: 'pond' | 'mPond' = 'pond';
	export let modalForApproveConfirm: string;

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
			console.error(e);
			throw e;
		} finally {
			confirmLoading = false;
		}
	};
	// const modalWidth = 'max-w-[500px]';

	$: amountConvertedFrom = bigNumberToString(
		amountConverted,
		DEFAULT_CURRENCY_DECIMALS,
		getAmountPrecision(conversionFrom)
	);
	$: amountConvertedTo = bigNumberToString(
		conversionFrom === 'pond' ? pondToMPond(amountConverted) : mPondToPond(amountConverted),
		DEFAULT_CURRENCY_DECIMALS,
		getAmountPrecision(conversionFrom === 'pond' ? 'mPond' : 'pond')
	);
	$: conversionFromText = conversionFrom === 'pond' ? 'POND' : 'MPond';
	$: conversionToText = conversionFrom === 'pond' ? 'MPond' : 'POND';
	$: modalForSuccessConversion = `success-conversion-modal-${rowIndex}`;
</script>

<Modal modalFor={modalForApproveConfirm}>
	<svelte:fragment slot="title">
		{!approved ? 'Approve Transaction' : 'Confirm Transaction'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex h-[50px] gap-5">
			<div class="flex flex-col items-center">
				{#if approved}
					<img src={staticImages.Check} alt="Copy" width="20px" height="20px" />
				{:else}
					<LoadingAnimationModal loading={true}>
						<Text variant="small" styleClass="font-semibold" text="1" />
					</LoadingAnimationModal>
				{/if}
				{#if approved}
					<div class="h-full w-[0.1px] bg-grey-400" />
				{/if}
			</div>
			<div class="grow text-left font-normal text-grey-500">
				Approve
				<span class="font-semibold text-black">
					{amountConvertedFrom}
					{conversionFromText}
				</span>
				for conversion
			</div>
		</div>
		<div class="flex gap-5">
			<LoadingAnimationModal loading={confirmLoading}>
				<Text variant="small" styleClass="font-semibold" text="2" />
			</LoadingAnimationModal>
			<div class="grow text-left font-normal {approved ? 'text-grey-500' : 'text-grey-300'}">
				Convert
				<span class={approved ? 'font-semibold text-black' : 'font-semibold text-grey-300'}>
					{amountConvertedFrom}
					{conversionFromText}
				</span>
				to
				<span class={approved ? 'font-semibold text-black' : 'font-semibold text-grey-300'}>
					{amountConvertedTo}
					{conversionToText}
				</span>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		{#if !approved}
			<Button
				onclick={approveClick}
				loading={approveLoading}
				variant="filled"
				size="large"
				styleClass="w-full"
			>
				{approveButtonText}
			</Button>
		{:else}
			<Button
				onclick={confirmClick}
				loading={confirmLoading}
				variant="filled"
				size="large"
				styleClass="w-full"
			>
				{confirmButtonText}
			</Button>
		{/if}
	</svelte:fragment>
</Modal>
