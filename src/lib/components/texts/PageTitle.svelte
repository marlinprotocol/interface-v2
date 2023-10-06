<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import BackButton from '$lib/components/buttons/BackButton.svelte';

	export let title: string;
	export let backHref = '';
</script>

<div class="flex gap-4 mb-8 items-center">
	{#if !!backHref}
		<BackButton href={backHref} text="" />
	{/if}
	<Text variant="h2" text={title} />
	<slot name="button" />
</div>
