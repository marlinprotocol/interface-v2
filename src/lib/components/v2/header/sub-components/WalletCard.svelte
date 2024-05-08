<script lang="ts">
	import Text from '$lib/atoms/v2/texts/Text.svelte';

	export let imageSrc: string;
	export let title: string;
</script>

<div class="flex w-1/2 flex-col items-center overflow-hidden rounded-lg bg-base-200 p-4">
	{#if imageSrc}
		<img src={imageSrc} alt={title} width="64px" />
	{/if}
	<Text text={title} variant="h4" styleClass="mt-4 mb-6 font-semibold font-sans" />
	<slot name="button" />
</div>
