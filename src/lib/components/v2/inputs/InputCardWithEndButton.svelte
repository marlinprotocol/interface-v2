<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';

	export let styleClass = '';

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />
<InputCard {styleClass}>
	<div class="flex items-center justify-between">
		<slot name="titleEndButton" />
	</div>
	<div class="flex items-center justify-between">
		<slot />
		<slot name="endInfoBox" />
		<slot name="endButton" />
	</div>
</InputCard>
