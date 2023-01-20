<script lang="ts">
	export let modalFor: string = '';

	const styles = {
		title: 'font-lg font-bold text-left',
		subtitle: 'text-gray-500 text-xs text-left mt-1',
		closeButton:
			'btn btn-xs text-xs btn-circle absolute right-4 top-4 hover:bg-gray-200 hover:text-gray-800'
	};
</script>

<div>
	<input type="checkbox" id={modalFor} class="modal-toggle" />
	<label for={modalFor} class="modal cursor-pointer">
		<div class="modal-box w-80 rounded p-4">
			<div>
				<div class={styles.title}>
					<slot name="title" />
				</div>
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
	</label>
</div>
