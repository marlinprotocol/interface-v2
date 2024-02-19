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
	<div class="{modalWidth} modal-box rounded-lg bg-base-100 px-0 py-0 shadow-none">
		<div class="modal-header sticky top-0 z-10 flex items-center bg-white px-6 pb-4 pt-8">
			<div class="flex w-full flex-col">
				{#if $$slots.icon}
					<div class="mb-6">
						<slot name="icon" />
					</div>
				{/if}
				<div class="text-left text-[15px] font-medium text-[#0a0e3099]">
					<slot name="header" />
				</div>
				<div class="text-left text-2xl font-bold">
					<slot name="title" />
				</div>
				<div class="mt-1 text-left text-[15px] font-medium text-[#767676]">
					<slot name="subtitle" />
				</div>
			</div>
			<button
				data-testId="modal-close-button"
				class="flex h-12 min-w-[3rem] cursor-pointer items-center justify-center self-start text-sm font-bold text-gray-300"
				on:click={() => {
					closeModal(modalFor);
					onClose();
				}}
			>
				<img src={staticImages.CloseCircle} alt="Close" />
			</button>
		</div>
		<div
			class="modal-body {isScrollable ? 'overflow-y-auto overflow-x-hidden' : ''} {padding
				? 'px-6 pb-4 pt-2'
				: ''}"
		>
			<slot name="content" />
		</div>
		{#if $$slots.actionButtons}
			<div class="modal-footer sticky bottom-0 bg-white {padding ? 'mb-6 mt-4 px-6' : ''}">
				<slot name="actionButtons" />
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
