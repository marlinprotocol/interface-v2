<script lang="ts">
	export let modalFor: string = '';

	const styles = {
		header: 'text-body text-gray-500 text-left',
		title: 'text-2xl font-bold text-left',
		subtitle: 'text-sm font-medium text-left mt-1 text-gray-400',
		closeButton:
			'absolute right-4 top-4 text-sm font-bold text-gray-300 cursor-pointer w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100'
	};
</script>

<input type="checkbox" id={modalFor} class="modal-toggle" />
<div class="modal">
	<!-- TODO: check for relay modal size and match -->
	<div class="modal-box w-11/12 sm:w-3/4 md:w-1/2 sm:max-w-[500px] rounded p-4 bg-base-100">
		<div class={styles.header}>
			<slot name="header" />
		</div>
		<div class={styles.title}>
			<slot name="title" />
		</div>
		<label for={modalFor} class={styles.closeButton}>✕</label>
		<div class={styles.subtitle}>
			<slot name="subtitle" />
		</div>
		<div class="mt-4" />
		<slot name="content" />
		<div class="mt-4" />
		<slot name="action-buttons" />
	</div>
</div>
