<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { closeModal, doNothing } from '$lib/utils/helpers/commonHelper';

	export let modalFor = '';
	export let modalWidth = 'w-11/12 sm:w-3/4 sm:max-w-[607px]';
	export let onClose: () => void = () => {
		doNothing();
	};
	export let padding = true;

	const styles = {
		icon: 'mb-6',
		header: 'text-[15px] text-[#0a0e3099] text-left font-medium',
		title: 'text-2xl font-bold text-left',
		subtitle: 'text-[15px] font-medium text-left mt-1 text-black/50',
		closeButton:
			'self-start text-sm font-bold text-gray-300 cursor-pointer min-w-[3rem] h-12 flex items-center justify-center'
	};
</script>

<input type="checkbox" id={modalFor} class="modal-toggle" />
<div class="modal modal-backdrop">
	<div class={`${modalWidth} rounded-lg bg-base-100 shadow-none py-0 px-0`}>
		<div class="modal-header flex items-center pt-8 pb-4 px-6">
			<div class="flex flex-col w-full">
				{#if $$slots.icon}
					<div class={styles.icon}>
						<slot name="icon" />
					</div>
				{/if}
				<div class={styles.header}>
					<slot name="header" />
				</div>
				<div class={styles.title}>
					<slot name="title" />
				</div>
				<div class={styles.subtitle}>
					<slot name="subtitle" />
				</div>
			</div>
			<button
				class={styles.closeButton}
				on:click={() => {
					closeModal(modalFor);
					onClose();
				}}
			>
				<img src={staticImages.CloseCircle} alt="Close" />
			</button>
		</div>
		<div
			class={`modal-body ${padding ? 'pt-2 pb-4 px-6' : ''}`}
			style={`max-height: ${
				$$slots.actionButtons ? 'calc(100vh - 280px)' : 'calc(100vh - 200px)'
			};`}
		>
			<slot name="content" />
		</div>
		{#if $$slots.actionButtons}
			<div class={`modal-footer ${padding ? 'mt-4 px-6 mb-6' : ''}`}>
				<slot name="actionButtons" />
			</div>
		{/if}
	</div>
</div>

<style>
	.modal-body {
		overflow-y: auto;
		overflow-x: hidden;
	}
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
