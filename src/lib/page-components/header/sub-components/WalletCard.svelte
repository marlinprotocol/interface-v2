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
		<img src={imageSrc} alt={title} width="64px" />
	{/if}
	<Text text={title} variant="h4" styleClass="mt-4 mb-6 font-semibold font-sans" />
	<slot name="button" />
</div>
