<script lang="ts">
	export let modalWidth: string = 'w-11/12 sm:w-3/4 sm:max-w-[607px]';
	export let onClose: () => void = () => {};
	export let showDialog: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showDialog) dialog.showModal();

	const styles = {
		icon: 'mb-6',
		header: 'text-[15px] text-[#0a0e3099] text-left font-medium',
		title: 'text-2xl font-bold text-left',
		subtitle: 'text-[15px] font-medium text-left mt-1 text-black/50',
		closeButton:
			'self-start text-sm font-bold text-gray-300 cursor-pointer min-w-[3rem] h-12 flex items-center justify-center'
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showDialog = false)}
	on:click|self={() => dialog.close()}
	class={`${modalWidth} max-h-90vh rounded-lg bg-base-100 shadow-none overflow-none py-0 px-0`}
>
	<div on:click|stopPropagation>
		<div class="dialog-header flex items-center pt-8 pb-4 px-6">
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
					dialog.close();
					onClose();
				}}
			>
				<img src="/images/close-circle-icon.svg" alt="Close" />
			</button>
		</div>
		<div class="dialog-body pt-2 pb-4 px-6">
			<slot name="content" />
		</div>
		{#if $$slots.actionButtons}
			<div class="dialog-footer mt-4 px-6 mb-6">
				<slot name="actionButtons" />
			</div>
		{/if}
	</div>
</dialog>

<style>
	.dialog-body {
		overflow-y: auto;
		overflow-x: hidden;
		max-height: 73vh;
	}
	/* redesign scrollbar */
	.dialog-body::-webkit-scrollbar {
		width: 0.5rem;
	}
	.dialog-body::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	.dialog-body::-webkit-scrollbar-thumb {
		background: #c8c8c8;
		border-radius: 15px;
	}
	.dialog-body::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	.dialog {
		overflow: hidden;
	}
	/* background color */
	dialog::backdrop {
		background-color: rgba(1, 3, 36, 0.8);
	}
	/* animation */
	dialog[open] {
		animation: fade 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	dialog[open]::backdrop {
		animation: fade 0.3s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
