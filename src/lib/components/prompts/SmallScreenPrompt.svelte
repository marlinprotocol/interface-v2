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
	<div class="fixed left-0 top-0 z-20 h-full w-full bg-white">
		<div class="flex h-full flex-col items-center justify-center px-10">
			<h1 class="text-center text-4xl font-bold">
				Please note that this site is not optimized for mobile devices.
			</h1>
			<h2 class="mt-4 text-center text-2xl font-bold">
				For the best user experience, it is recommended to access the site via a desktop or laptop.
			</h2>
			<Button onclick={() => (showSmallScreenPrompt = false)} size="large" styleClass="mt-8 w-80"
				>Enter Site</Button
			>
		</div>
	</div>
{/if}
