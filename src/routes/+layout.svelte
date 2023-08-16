<script lang="ts">
	import { environment } from '$lib/data-stores/environment';
	import Toast from '$lib/atoms/toast/Toast.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import SmallScreenPrompt from '$lib/components/prompts/SmallScreenPrompt.svelte';
	import { getContractDetails } from '$lib/controllers/httpController';
	import { updateContractStoresWithoutBridge } from '$lib/data-stores/contractStore';
	import { addToast } from '$lib/data-stores/toastStore';

	onMount(async () => {
		// removes console logs in production
		if (environment.production) {
			window.console.log = function () {
				// do nothing
			};
		}

		// get contract details and set abi stores
		try {
			const contractDetails = await getContractDetails();
			const ABIS = contractDetails.ABI;

			updateContractStoresWithoutBridge(ABIS);
		} catch (error: any) {
			addToast({
				variant: 'error',
				message: `${error.message}. Please try refreshing the page.`,
				timeout: 6000
			});
			console.error('Error while fetching contract details', error);
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
