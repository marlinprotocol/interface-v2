<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ConfirmConversionButton from '$lib/page-components/bridge/buttons/ConfirmConversionButton.svelte';
	import { BigNumber } from 'ethers';
	import LoadingAnimatedPing from '../loading/LoadingAnimatedPing.svelte';

	export let showDialog: boolean = false;

	export let handleApproveClick: () => Promise<void>;
	export let handleConfirmClick: () => Promise<void>;
	export let approved: boolean;
	export let approveButtonText: string = 'APPROVE';
	export let confirmButtonText: string = 'CONFIRM';
	export let amountConverted: BigNumber = BigNumber.from(0);
	export let conversionFrom: string = 'pond';

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
			showDialog = false;
			confirmLoading = false;
		} catch (e) {
			confirmLoading = false;
			throw e;
		}
	};
	const modalWidth = 'max-w-[500px]';
</script>

<Dialog bind:showDialog {modalWidth}>
	<svelte:fragment slot="title">
		{!approved ? 'Approve Transaction' : 'Confirm Transaction'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		{#if $$slots.approveText}
			<div class="flex gap-5">
				{#if approved}
					<img src="/images/vectorcheck.svg" alt="Copy" width="20px" height="20px" />
				{:else}
					<LoadingAnimatedPing loading={approveLoading}>
						<Text variant="small" styleClass="font-semibold" text={'1'} />
					</LoadingAnimatedPing>
				{/if}
				<div class={`text-grey-800`}>
					<slot name="approveText" />
				</div>
			</div>
		{/if}
		{#if $$slots.confirmText}
			<div class={`flex gap-5 mt-5`}>
				<LoadingAnimatedPing loading={confirmLoading}>
					<Text variant="small" styleClass="font-semibold" text={'2'} />
				</LoadingAnimatedPing>
				<div class={`${approved ? 'text-grey-800' : 'text-grey-300'}`}>
					<slot name="confirmText" />
				</div>
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="action-buttons">
		{#if !approved}
			<Button
				variant="filled"
				size="large"
				loading={approveLoading}
				onclick={approveClick}
				styleClass={'btn-block'}
			>
				{approveButtonText}
			</Button>
		{:else}
			<ConfirmConversionButton
				onClickHandler={confirmClick}
				{conversionFrom}
				{amountConverted}
				loading={confirmLoading}
			>
				{confirmButtonText}
			</ConfirmConversionButton>
		{/if}
	</svelte:fragment>
</Dialog>
