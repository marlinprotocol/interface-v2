<script lang="ts">
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import times from 'svelte-awesome/icons/times';

	export let modalFor: string = '';

	const styles = {
		title: 'text-2xl font-bold text-left',
		subtitle: 'text-sm font-medium text-left mt-1 text-gray-400',
		closeButton: 'absolute right-4 top-4'
	};
</script>

<input type="checkbox" id={modalFor} class="modal-toggle" />
<div class="modal">
	<!-- TODO: check for relay modal size and match -->
	<div class="modal-box w-11/12 sm:w-3/4 md:w-1/2 sm:max-w-[500px] rounded p-4 bg-base-100">
		<div class={styles.title}>
			<slot name="title" />
		</div>
		<label for={modalFor} class={styles.closeButton}>
			<Icon data={times} size={24} border={true} padding={4} />
		</label>
		<!-- <label for={modalFor} class={styles.closeButton}>✕</label> -->
		<div class={styles.subtitle}>
			<slot name="subtitle" />
		</div>
		<div class="mt-4" />
		<slot name="content" />
		<div class="mt-4" />
		<slot name="action-buttons" />
	</div>
</div>
