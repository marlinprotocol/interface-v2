<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';

	export let showSmallScreenPrompt = false;
	let innerWidth: number;

	$: if (innerWidth < 950) {
		showSmallScreenPrompt = true;
	} else {
		showSmallScreenPrompt = false;
	}
</script>

<svelte:window bind:innerWidth />

{#if showSmallScreenPrompt}
	<div class="absolute top-0 left-0 w-full h-full bg-white">
		<div class="flex flex-col items-center justify-center h-full px-10">
			<h1 class="text-4xl font-bold text-center">
				Please note that this site is not optimized for mobile devices.
			</h1>
			<h2 class="text-2xl font-bold text-center mt-4">
				For the best user experience, it is recommended to access the site via a desktop or laptop.
			</h2>
			<Button onclick={() => (showSmallScreenPrompt = false)} size="large" styleClass="mt-8 w-80"
				>Enter Site</Button
			>
		</div>
	</div>
{/if}
