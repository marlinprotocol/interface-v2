<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';

	export let showError = false;
	export let errorMessage = 'Error Message';
	export let styleClass = 'mt-4';
</script>

{#if showError}
	<InputCard variant="warning" {styleClass}>
		<Text variant="small" styleClass="text-red-500 my-2" text={errorMessage} />
	</InputCard>
{/if}
