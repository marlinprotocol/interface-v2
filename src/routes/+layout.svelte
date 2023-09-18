<script lang="ts">
	// importing global level stores to initialise them
	import { environment } from '$lib/data-stores/environment';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	import { chainStore } from '$lib/data-stores/chainProviderStore';

	import Toast from '$lib/atoms/toast/Toast.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import SmallScreenPrompt from '$lib/components/prompts/SmallScreenPrompt.svelte';

	onMount(async () => {
		// removes console logs in production
		if (environment.production) {
			window.console.log = function () {
				// do nothing
			};
		}
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Orbitron&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="text-center font-poppins max-w-[1400px] my-0 mx-auto xl:w-[82%] w-[90%]">
	<Toast />
	<Header />
	<slot />
</main>

<!-- This shows a prompt if the screen size is smaller than 1090px -->
<SmallScreenPrompt />
