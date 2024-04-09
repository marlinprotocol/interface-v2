<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { closeModal, doNothing } from '$lib/utils/helpers/commonHelper';

	export let modalFor = '';
	export let modalWidth = 'w-11/12 sm:w-3/4 sm:max-w-[607px]';
	export let onClose: () => void = () => {
		doNothing();
	};
	export let padding = true;
	export let isScrollable = false;
</script>

<!-- removing input from tabbing order since its open and close behaviour is being controlled by label and close button respectively  -->
<input type="checkbox" id={modalFor} class="modal-toggle" tabindex="-1" />
<div data-testId="modal" class="modal">
	<div class="{modalWidth} modal-box rounded-3xl bg-base-100 p-[24px] drop-shadow-sm">
		<div
			class="modal-header sticky top-0 z-10 flex {$$slots.successmsg
				? 'items-start'
				: 'items-center'}  justify-between bg-white pb-4"
		>
			<div class="flex w-full flex-col">
				{#if $$slots.icon}
					<div class="mb-6">
						<slot name="icon" />
					</div>
				{/if}
				{#if $$slots.successmsg}
					<div class="flex w-full flex-col items-center justify-between">
						<div class="ml-[70px] h-[84px] w-[84px]">
							<img src={staticImages.successIcon} alt="success-icon" class="object-cover" />
						</div>

						<div class="ml-[70px] mt-[-30px] text-[22px] font-semibold">
							<slot name="successmsg" />
						</div>
					</div>
				{/if}
				<div class="text-left text-[15px] font-medium text-[#0a0e3099]">
					<slot name="header" />
				</div>
				<div class="text-left text-[22px] font-medium tracking-[-1px]">
					<slot name="title" />
				</div>
				<div class="mt-1 text-left text-[15px] font-medium text-[#767676]">
					<slot name="subtitle" />
				</div>
			</div>
			<button
				data-testId="modal-close-button"
				class="mr-[-22px] flex h-[54px] min-w-[54px] cursor-pointer items-center justify-center text-sm font-bold text-gray-300"
				on:click={() => {
					closeModal(modalFor);
					onClose();
				}}
			>
				<img src={staticImages.closeIcon} alt="Close" />
			</button>
		</div>
		<div class="modal-body {isScrollable ? 'overflow-y-auto overflow-x-hidden' : ''} ">
			<slot name="content" />
		</div>
		{#if $$slots.actionButtons}
			<div class="modal-footer sticky bottom-0 bg-white {padding ? 'pt-8' : ''} ">
				<slot name="actionButtons" />
			</div>
		{/if}
		{#if $$slots.errorMessage}
			<div
				class="modal-footer sticky bottom-0 mt-[8px] flex h-[73px] w-full items-center justify-center gap-[7px] !rounded-[18px] bg-red-100 font-normal text-red-500"
			>
				<img src={staticImages.alertRed} alt="alert-red" />
				<slot name="errorMessage" />
			</div>
		{/if}
	</div>
</div>

<style>
	/* redesign scrollbar */
	.modal-body::-webkit-scrollbar {
		width: 0.5rem;
	}
	.modal-body::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	.modal-body::-webkit-scrollbar-thumb {
		background: #c8c8c8;
		border-radius: 15px;
	}
	.modal-body::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
