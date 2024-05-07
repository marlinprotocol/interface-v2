<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { closeModal, cn, doNothing } from '$lib/utils/helpers/commonHelper';

	export let modalFor = '';
	export let modalWidth = 'w-11/12 sm:w-3/4 sm:max-w-[607px]';
	export let showOverFlow = true;
	export let onClose: () => void = () => {
		doNothing();
	};
	export let padding = false;
	export let isScrollable = false;
	export let individualBorderRadius = false;
</script>

<!-- removing input from tabbing order since its open and close behaviour is being controlled by label and close button respectively  -->
<input type="checkbox" id={modalFor} class="modal-toggle" tabindex="-1" />
<div data-testId="modal" class="modal">
	<div
		class={cn('modal-box flex flex-col rounded-3xl bg-[#FCFCFC]  p-0 drop-shadow-sm', modalWidth, {
			'overflow-y-auto': showOverFlow,
			'overflow-x-hidden overflow-y-visible': !individualBorderRadius,
			'overflow-visible': individualBorderRadius
		})}
	>
		<div
			class={cn(
				'modal-header sticky top-0 z-10  flex items-center justify-between bg-[#FCFCFC] px-6 pt-6',
				{
					'items-start': $$slots.successmsg,
					'rounded-tl-3xl rounded-tr-3xl': individualBorderRadius
				}
			)}
		>
			<div class="flex w-full flex-col">
				{#if $$slots.icon}
					<div class="mb-6">
						<slot name="icon" />
					</div>
				{/if}
				{#if $$slots.successmsg}
					<div class="flex w-full flex-col items-center justify-between">
						<div
							class="ml-[70px] grid h-[84px] w-[84px] place-items-center rounded-full bg-[#68A843]"
						>
							<img src={staticImages.tick} alt="tick" width="60px" height="60px" />
						</div>

						<div class="ml-[70px] mt-4 text-[26px] font-semibold">
							<slot name="successmsg" />
						</div>
					</div>
				{/if}
				{#if $$slots.header}
					<div class="text-left text-[15px] font-medium text-[#0a0e3099]">
						<slot name="header" />
					</div>
				{/if}

				{#if $$slots.title}
					<div class="text-left text-[22px] font-medium tracking-[-1px]">
						<slot name="title" />
					</div>
				{/if}

				{#if $$slots.subtitle}
					<div class="mt-1 text-left text-[15px] font-medium text-[#767676]">
						<slot name="subtitle" />
					</div>
				{/if}
			</div>
			<button
				data-testId="modal-close-button"
				class="flex h-[54px] w-[54px] shrink-0 cursor-pointer items-center justify-center self-baseline rounded-full border border-[#D9DADE] bg-white text-sm font-bold text-gray-300"
				on:click={() => {
					closeModal(modalFor);
					onClose();
				}}
			>
				<img src={staticImages.closeIcon} alt="Close" />
			</button>
		</div>
		<div
			class={cn('modal-body px-6 pt-4', {
				'flex flex-col overflow-y-auto overflow-x-hidden': isScrollable,
				'pb-6': !$$slots.actionButtons
			})}
		>
			<slot name="content" />
		</div>
		{#if $$slots.actionButtons}
			<div
				class={cn('modal-footer sticky bottom-0 bg-[#FCFCFC] px-6 pb-6 pt-4', {
					'pt-8': padding,
					'rounded-bl-3xl rounded-br-3xl': individualBorderRadius
				})}
			>
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
