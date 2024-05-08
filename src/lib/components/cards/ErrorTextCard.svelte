<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import Text from '$lib/atoms/v2/texts/Text.svelte';

	export let showError = false;
	export let errorMessage = 'Error Message';
	export let styleClass = 'mt-4';
</script>

{#if showError}
	<InputCard variant="warning" {styleClass}>
		<Text variant="small" styleClass="text-red-500 my-2 whitespace-normal" text={errorMessage} />
	</InputCard>
{/if}
