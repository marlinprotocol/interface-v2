<script lang="ts">
	// importing global level stores to initialise them
	import { chainStore, chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { environment } from '$lib/data-stores/environment';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	import Header from '$lib/components/header/Header.svelte';
	import Toast from '$lib/atoms/toast/Toast.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import SmallScreenPrompt from '$lib/components/prompts/SmallScreenPrompt.svelte';

	onMount(async () => {
		// removes console logs in production
		if (environment.production) {
			window.console.log = function () {
				// do nothing
			};
		}

		const htmlElement = document.documentElement;
		htmlElement.setAttribute('data-theme', 'v2Theme');
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Orbitron&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,800&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
	<title>Marlin Hub</title>
</svelte:head>

<main class="flex h-dvh w-full font-poppins">
	<!-- toasts are removed from the normal document flow as it has position fixed   -->
	<Toast />

	<Sidebar />
	<div class="flex h-full w-full flex-col">
		<Header />
		<div class="flex h-full w-full">
			<slot />
		</div>
	</div>
</main>

<!-- This shows a prompt if the screen size is smaller than 1090px -->
<SmallScreenPrompt />
