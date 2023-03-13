<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import LoadingWithText from '../loading/LoadingWithText.svelte';

	export let modalFor: string;

	export let handleApproveClick: () => Promise<void>;
	export let handleConfirmClick: () => Promise<void>;
	export let approved: boolean;
	export let approveButtonText: string = 'APPROVE';
	export let confirmButtonText: string = 'CONFIRM';

	let approveLoading: boolean;
	let confirmLoading: boolean;

	const approveClick = async () => {
		try {
			approveLoading = true;
			setTimeout(() => {
				handleApproveClick();
				approveLoading = true;
			}, 3000);
		} catch (e) {
			approveLoading = false;
			throw e;
		}
	};

	const confirmClick = async () => {
		try {
			confirmLoading = true;
			setTimeout(() => {
				handleConfirmClick();
				closeModal(modalFor);
				confirmLoading = false;
			}, 3000);
		} catch (e) {
			confirmLoading = false;
			throw e;
		}
	};
	const modalWidth = 'max-w-[500px]';
</script>

<Modal {modalFor} {modalWidth}>
	<svelte:fragment slot="title">
		{!approved ? 'Approve Transaction' : 'Confirm Transaction'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		{#if $$slots.approveText}
			<div class="flex gap-5">
				{#if approved}
					<img src="/images/vectorcheck.svg" alt="Copy" width="20px" height="20px" />
				{:else}
					<LoadingWithText text={'1'} loading={approveLoading} />
				{/if}
				<slot name="approveText" />
			</div>
		{/if}
		{#if $$slots.confirmText && approved}
			<div class="flex gap-5 mt-5">
				<LoadingWithText text={'2'} loading={confirmLoading} />
				<slot name="confirmText" />
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
			<Button
				variant="filled"
				size="large"
				loading={confirmLoading}
				onclick={confirmClick}
				styleClass={'btn-block'}
			>
				{confirmButtonText}
			</Button>
		{/if}
	</svelte:fragment>
</Modal>
