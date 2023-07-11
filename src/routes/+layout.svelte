<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Toast from '$lib/atoms/toast/Toast.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import SmallScreenPrompt from '$lib/components/prompts/SmallScreenPrompt.svelte';
	import { getJobStatuses } from '$lib/controllers/httpController';
	import { getApprovedOysterAllowances } from '$lib/controllers/contractController';
	import {
		getOysterJobs,
		getProviderDetailsFromSubgraph
	} from '$lib/controllers/subgraphController';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { environmentStore } from '$lib/data-stores/environment';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { onMount } from 'svelte';
	import '../app.css';
	import { getOysterJobsModified } from '$lib/utils/data-modifiers/oysterModifiers';

	let prevChainId: null | number = null;

	onMount(async () => {
		// removes console logs in production
		if ($environmentStore.production) {
			window.console.log = function () {};
		}
	});

	async function loadConnectedData() {
		const [allowance, oysterJobsFromSubgraph, providerDetail, jobStatuses] = await Promise.all([
			getApprovedOysterAllowances($walletStore.address),
			getOysterJobs($walletStore.address),
			getProviderDetailsFromSubgraph($walletStore.address),
			getJobStatuses($walletStore.address)
		]);
		// Create a lookup object based on jobStatuses
		let jobStatusLookup: Record<string, string> = {};
		jobStatuses.forEach((status: any) => {
			jobStatusLookup[status.jobId] = status.ip;
		});

		// Assign IP addresses from jobStatus to jobData
		oysterJobsFromSubgraph.forEach((data: any) => {
			if (Object.prototype.hasOwnProperty.call(jobStatusLookup, data.id.toString())) {
				data.ip = jobStatusLookup[data.id.toString()];
			}
		});

		const oysterJobs = await getOysterJobsModified(oysterJobsFromSubgraph);
		// console.log('Existing Oyster Data - ', $oysterStore);
		// console.log('Oyster Data Fetch - allowance', allowance);
		// console.log('Oyster Data Fetch - oysterJobs', oysterJobs);
		// console.log('Oyster Data Fetch - providerDetail', providerDetail);
		// console.log('Oyster Data Fetch - jobStatuses', jobStatuses);

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

	$: if ($connected && $chainStore.chainId && $chainStore.isValidChain) {
		loadConnectedData();
	}

	$: if (
		prevChainId !== $chainStore.chainId ||
		(prevChainId === null && $chainStore.isValidChain)
	) {
		prevChainId = $chainStore.chainId;
		invalidateAll();
		console.log('invalidate is called with config of:', $environmentStore.environment_name);
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

<!-- This shows a prompt if the screen size is smaller than 1090px -->
<SmallScreenPrompt />

<style>
	main {
		width: 82%;
		max-width: 1400px;
		margin: 0 auto;
	}

	@media (max-width: 1200px) {
		main {
			width: 90%;
		}
	}
</style>
