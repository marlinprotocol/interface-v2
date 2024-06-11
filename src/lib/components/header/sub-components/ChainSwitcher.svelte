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

	export let id = 'chain-dropdown';

	let activeChainImage = staticImages.chainLogo;
	$: dropdownOpen = false;

	function handleChainSwitch(chainId: number) {
		if ($connected && chainId !== $chainStore.chainId) {
			switchChain(chainId, $web3WalletStore[0].provider);
		} else {
			updateChainStore(chainId);
		}
		dropdownOpen = false; // Close dropdown after switching
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}

	function closeSwitcherWhenClickedOutside(event: MouseEvent) {
		const dropdown = document.getElementById(id);
		if (!dropdown?.contains(event.target as Node)) {
			closeDropdown();
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

<div class="dropdown dropdown-end" {id}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		tabindex={$allowedChainsStore.length === 0 ? -1 : 0}
		role="button"
		class="{buttonClasses.whiteFilled} chain-btn m-1 flex h-12"
		on:click={toggleDropdown}
	>
		<div class="flex items-center justify-center">
			<div class="flex h-8 w-8 items-center justify-center">
				{#if activeChainImage}
					<img src={activeChainImage} alt="current chain" />
				{:else}
					<span class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
						{$chainStore.chainDisplayName.charAt(0).toLocaleUpperCase()}
					</span>
				{/if}
			</div>
			<div class="ml-2">
				<Icon data={chevronDown} size={10} iconColorClass="icon-primary" />
			</div>
		</div>
	</div>
	{#if dropdownOpen}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex={$allowedChainsStore.length === 0 ? -1 : 0}
			class="menu dropdown-content rounded-box z-[10] mt-4 w-52 bg-base-100 p-2 shadow"
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
	{/if}
</div>
