<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';

	export let imageSrc: string;
	export let title: string;

	const styles = {
		card: 'bg-base-200 rounded-lg overflow-hidden p-4 w-1/2 flex flex-col items-center'
	};
</script>

<div class={styles.card}>
	{#if !!imageSrc}
		<img src={imageSrc} alt={title} width="60px" />
	{/if}
	<Text variant="h4" text={title} styleClass="my-4" />
	<slot name="button" />
</div>
