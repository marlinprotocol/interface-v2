<script lang="ts">
	export let modalWidth: string = 'w-11/12 sm:w-3/4 sm:max-w-[607px]';
	export let onClose: () => void = () => {};
	export let showDialog: boolean; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showDialog) dialog.showModal();

	const styles = {
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
	class={`${modalWidth} modal-box rounded-lg p-6 bg-base-100 shadow-none`}
>
	<div on:click|stopPropagation>
		<div class="flex items-center">
			<div class="flex flex-col w-full">
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
		<div class="mt-8" />
		<slot name="content" />
		<div class="mt-10" />
		<slot name="action-buttons" />
	</div>
</dialog>

<style>
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
