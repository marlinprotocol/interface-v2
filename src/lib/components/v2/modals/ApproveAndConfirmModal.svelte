<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import SuccessfulConversionModal from '$lib/page-components/v2/bridge/modals/SuccessfulConversionModal.svelte';
	import { DEFAULT_CURRENCY_DECIMALS } from '$lib/utils/constants/constants';
	import { bigNumberToString, mPondToPond, pondToMPond } from '$lib/utils/helpers/conversionHelper';
	import { closeModal, cn, openModal } from '$lib/utils/helpers/commonHelper';
	import { staticImages } from '$lib/components/images/staticImages';
	import { removeTrailingZeros } from '$lib/utils/v2/helpers/commonHelper';

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

	$: amountConvertedFrom = removeTrailingZeros(
		bigNumberToString(amountConverted, DEFAULT_CURRENCY_DECIMALS, 18)
	);
	$: amountConvertedTo = removeTrailingZeros(
		bigNumberToString(
			conversionFrom === 'pond' ? pondToMPond(amountConverted) : mPondToPond(amountConverted),
			DEFAULT_CURRENCY_DECIMALS,
			18
		)
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
		<div class="mb-2 flex h-20 items-center gap-3 rounded-xl bg-[#F7F7F7] p-3 font-poppins">
			<div class="flex flex-col items-center">
				<div
					class={cn(
						'flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold text-white',
						{
							'bg-[#68A843]': approved,
							'bg-[#EDBE59]': !approved
						}
					)}
				>
					{#if approved}
						<img src={staticImages.checkmark} alt="checkmark" width="25px" height="25px" />
					{:else}
						1
					{/if}
				</div>
			</div>
			<div class="grow text-left text-xl font-normal text-[#030115]">
				Approve
				<span class="font-semibold">
					{amountConvertedFrom}
					{conversionFromText}
				</span>
				for conversion
			</div>
		</div>
		<div
			class={cn('flex h-20 items-center gap-3 rounded-xl p-3 font-poppins', {
				'bg-[#F7F7F7]': approved,
				'border border-[#D9DADE]': !approved
			})}
		>
			<div
				class={cn(
					'flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold text-white',
					{
						'bg-[#EDBE59]': approved,
						'bg-[#F7F7F7] text-[#939393]': !approved
					}
				)}
			>
				2
			</div>
			<div class="grow text-left text-xl font-normal text-[#030115]">
				Convert
				<span class="font-semibold">
					{amountConvertedFrom}
					{conversionFromText}
				</span>
				to
				<span class="font-semibold">
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
<SuccessfulConversionModal
	modalFor={modalForSuccessConversion}
	{amountConverted}
	{conversionFrom}
/>
