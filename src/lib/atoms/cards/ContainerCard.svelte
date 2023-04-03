<script lang="ts">
	export let styleClass = '';
	const styles = {
		wrapper: 'w-full sm:w-130 mt-4 mx-auto',
		header: 'mb-2',
		card: 'card bg-base-100 rounded-lg px-4 py-4 sm:px-6 sm:py-6 mx-auto text-center'
	};
</script>

<div class={styles.wrapper}>
	<div class={styles.header}>
		<slot name="header" />
	</div>
	<div class={`${styles.card} ${styleClass}`}>
		<slot />
	</div>
</div>
