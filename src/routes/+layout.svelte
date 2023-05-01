<script lang="ts">
	import Toast from '$lib/atoms/toast/Toast.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { getContractDetails } from '$lib/controllers/httpController';
	import {
		getAllProvidersDetailsFromSubgraph,
		getApprovedOysterAllowances,
		getOysterJobs,
		getProviderDetailsFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import {
		connected,
		restoreWalletConnection,
		walletStore
	} from '$lib/data-stores/walletProviderStore';
	import ENVIRONMENT from '$lib/environments/environment';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(async () => {
		// removes console logs in production
		if (ENVIRONMENT.production) {
			window.console.log = function () {};
		}
		await getContractDetails();
		restoreWalletConnection();
	});

	async function loadMarketplaceData() {
		const allMarketplaceData = await getAllProvidersDetailsFromSubgraph();
		console.log('Oyster Data Fetch - allMarketplaceData:>> ', allMarketplaceData);
		oysterStore.update((store) => {
			return {
				...store,
				allMarketplaceData,
				marketplaceLoaded: true
			};
		});
	}

	async function loadConnectedData() {
		const [allowance, oysterJobs, providerDetail] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address, $contractAddressStore.Bridge),
			getOysterJobs($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
			getAllProvidersDetailsFromSubgraph()
		]);

		console.log('Existing Oyster Data - ', $oysterStore);
		console.log('Oyster Data Fetch - allowance', allowance);
		console.log('Oyster Data Fetch - oysterJobs', oysterJobs);
		console.log('Oyster Data Fetch - providerDetail', providerDetail);
		oysterStore.update((value) => {
			return {
				...value,
				providerData: {
					data: providerDetail,
					registered: providerDetail != null
				},
				allowance: allowance,
				jobsData: oysterJobs,
				oysterStoreLoaded: true
			};
		});
	}

	loadMarketplaceData();
	$: if ($connected) {
		loadConnectedData();
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Orbitron&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="text-center w-full font-poppins">
	<Toast />
	<Header />
	<slot />
</main>

<style>
	main {
		width: 82%;
		margin: 0 auto;
	}

	@media (max-width: 1200px) {
		main {
			width: 90%;
		}
	}
</style>
