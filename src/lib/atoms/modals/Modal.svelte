<script lang="ts">
	export let modalFor: string = '';
	export let modalWidth: string = 'w-11/12 sm:w-3/4 sm:max-w-[607px]';

	const styles = {
		header: 'text-[15px] text-[#0a0e3099] text-left font-medium',
		title: 'text-2xl font-bold text-left',
		subtitle: 'text-[15px] font-medium text-left mt-1 text-black/50',
		closeButton:
			'self-start text-sm font-bold text-gray-300 cursor-pointer min-w-[3rem] h-12 flex items-center justify-center'
	};
</script>

<input type="checkbox" id={modalFor} class="modal-toggle" />
<div class="modal modal-backdrop">
	<div class={`${modalWidth} modal-box rounded-lg p-6 bg-base-100 shadow-none`}>
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
			<label for={modalFor} class={styles.closeButton}>
				<img src="./images/close-circle-icon.svg" alt="Close" />
			</label>
		</div>
		<div class="mt-8" />
		<slot name="content" />
		<div class="mt-10" />
		<slot name="action-buttons" />
	</div>
</div>
