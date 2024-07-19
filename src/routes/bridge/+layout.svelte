<script lang="ts">
	import NetworkPrompt from '$lib/components/prompts/NetworkPrompt.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
	import { getAllowance } from '$lib/controllers/contract/usdc';
	import { initializeBridgeStore } from '$lib/data-stores/bridgeStore';
	import {
		chainStore,
		setAllowedChainsStore,
		allowedChainsStore,
		chainConfigStore,
		chainIdHasChanged
	} from '$lib/data-stores/chainProviderStore';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { environment } from '$lib/data-stores/environment';
	import {
		walletAddressHasChanged,
		walletStore,
		connected
	} from '$lib/data-stores/walletProviderStore';
	import type { BrowserProvider } from 'ethers';
	import { onDestroy, onMount } from 'svelte';
	import type { TokenMetadata } from '$lib/types/environmentTypes';
	import { getRequestedMPondForConversion } from '$lib/controllers/contract/bridge';

	let previousChainId: number | null = null;
	let previousWalletAddress = '';

	onMount(() => {
		setAllowedChainsStore(environment.supported_chains.bridge);
	});

	$: chainSupported = $chainStore.chainId
		? $allowedChainsStore.includes($chainStore.chainId)
		: true;

	async function init() {
		console.log('Loading bridge allowances data');
		const [MPondAllowances, pondAllowances, requestedMPond] = await Promise.all([
			getAllowance(
				$walletStore.address,
				$contractAddressStore.BRIDGE,
				$chainConfigStore.tokens.MPOND as TokenMetadata,
				$walletStore.provider as BrowserProvider
			),
			getAllowance(
				$walletStore.address,
				$contractAddressStore.BRIDGE,
				$chainConfigStore.tokens.POND as TokenMetadata,
				$walletStore.provider as BrowserProvider
			),
			getRequestedMPondForConversion($walletStore.address, $walletStore.provider as BrowserProvider)
		]);

		const allowances = { mPond: MPondAllowances || 0n, pond: pondAllowances || 0n };

		console.log('Bridge allowances data is loaded', allowances);
		initializeBridgeStore(allowances, requestedMPond);
	}

	$: if ($connected && chainSupported) {
		if (
			walletAddressHasChanged($walletStore.address, previousWalletAddress) ||
			chainIdHasChanged($chainStore.chainId, previousChainId)
		) {
			init();
			previousChainId = $chainStore.chainId;
			previousWalletAddress = $walletStore.address;
		}
	} else {
		previousChainId = null;
		previousWalletAddress = '';
	}

	onDestroy(() => {
		setAllowedChainsStore([]);
	});
</script>

{#if $chainStore.isValidChain && chainSupported}
	<PageWrapper>
		<slot />
	</PageWrapper>
{:else}
	<PageWrapper>
		<NetworkPrompt
			title="Unsupported Network"
			description="Please switch to one of the chains in the dropdown to continue"
		/>
	</PageWrapper>
{/if}
