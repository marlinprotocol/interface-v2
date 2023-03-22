<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';

	export let showError = false;
	export let errorMessage = 'Error Message';
</script>

{#if showError}
	<InputCard variant="warning" styles="mt-4 bg-red-100">
		<Text variant="small" styleClass="text-red-500 my-2" text={errorMessage} />
	</InputCard>
{/if}
