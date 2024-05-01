<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { switchChain } from '$lib/utils/helpers/networkHelper';
	import { environment } from '$lib/data-stores/environment';
	import { staticImages } from '$lib/components/images/staticImages';
	import { connected, web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import {
		allowedChainsStore,
		chainStore,
		updateChainStore
	} from '$lib/data-stores/chainProviderStore';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import chevronDown from 'svelte-awesome/icons/chevronDown';

	let activeChainImage = staticImages.chainLogo;

	function handleChainSwitch(chainId: number) {
		if ($connected && chainId !== $chainStore.chainId) {
			switchChain(chainId, $web3WalletStore[0].provider);
		} else {
			updateChainStore(chainId);
		}
	}

	function closeSwitcherWhenClickedOutside(event: MouseEvent) {
		const dropdown = document.getElementById('chain-dropdown');
		if (!dropdown?.contains(event.target as Node)) {
			dropdown?.removeAttribute('open');
		}
	}

	$: {
		const activeChainId = $chainStore.chainId;
		if (activeChainId !== null) {
			activeChainImage = environment.valid_chains[activeChainId]?.chain_image;
		}
	}
</script>

<svelte:window on:click={(e) => closeSwitcherWhenClickedOutside(e)} />

<div class="dropdown dropdown-end" id="chain-dropdown">
	<div
		tabindex={$allowedChainsStore.length === 0 ? -1 : 0}
		role="button"
		class="{buttonClasses.whiteFilled} chain-btn m-1 flex h-12"
	>
		<div class="flex items-center justify-center">
			<div class="h-8 w-8">
				<img src={activeChainImage} alt="current chain" />
			</div>
			<div class="ml-2">
				<Icon data={chevronDown} size={10} iconColorClass="icon-primary" />
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		tabindex={$allowedChainsStore.length === 0 ? -1 : 0}
		class="menu dropdown-content rounded-box z-[1] mt-4 w-52 bg-base-100 p-2 shadow"
	>
		{#each $allowedChainsStore as chain (chain)}
			<li class="flex {$chainStore.chainId === chain ? 'rounded-lg bg-primary text-white' : ''}">
				<button on:click={() => handleChainSwitch(chain)}>
					<div class="h-6 w-6 rounded-full ring-1 ring-white">
						<img src={environment.valid_chains[chain].chain_image} alt="Chain Logo" />
					</div>
					{environment.valid_chains[chain].chain_name}
				</button>
			</li>
		{/each}
	</ul>
</div>
