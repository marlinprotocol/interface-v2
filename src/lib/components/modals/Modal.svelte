<script lang="ts">
	export let modalFor: string = '';

	const styles = {
		title: 'text-2xl font-bold text-left',
		subtitle: 'text-sm font-medium text-left mt-1 text-secondaryText',
		closeButton:
			'btn btn-sm text-sm btn-circle absolute right-4 top-4 hover:bg-gray-200 hover:text-gray-800'
	};
</script>

<div>
	<input type="checkbox" id={modalFor} class="modal-toggle" />
	<label for={modalFor} class="modal cursor-pointer">
		<!-- TODO: check for relay modal size and match -->
		<div class="modal-box w-11/12 sm:w-3/4 md:w-1/2 sm:max-w-[500px] rounded p-4 bg-white">
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
