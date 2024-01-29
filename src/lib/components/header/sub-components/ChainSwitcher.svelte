<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import {
		getImageForChain,
		getChainDisplayName,
		switchChain,
		getChainInfo
	} from '$lib/utils/helpers/networkHelper';
	import { environment } from '$lib/data-stores/environment';
	import { connected, web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import {
		allowedChainsStore,
		chainStore,
		updateChainStore
	} from '$lib/data-stores/chainProviderStore';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import chevronDown from 'svelte-awesome/icons/chevronDown';

	export let isDark: boolean = false;

	function handleChainSwitch(chainId: number) {
		if ($connected) {
			switchChain(chainId, $web3WalletStore[0].provider);
		} else {
			updateChainStore(
				chainId,
				environment.valid_chains[chainId].chain_name,
				// getChainDisplayName(chainId)
				getChainInfo(chainId).displayName
			);
		}
	}

	function closeSwitcherWhenClickedOutside(event: MouseEvent) {
		const dropdown = document.getElementById('chain-dropdown');
		if (!dropdown?.contains(event.target as Node)) {
			dropdown?.removeAttribute('open');
		}
	}
</script>

<svelte:window on:click={(e) => closeSwitcherWhenClickedOutside(e)} />

<details
	class={$allowedChainsStore.length === 0 ? 'focus pointer-events-none opacity-60' : 'dropdown'}
	id="chain-dropdown"
>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<summary
		tabindex={$allowedChainsStore.length === 0 ? -1 : 0}
		class="{isDark
			? buttonClasses.greyFilled
			: buttonClasses.whiteFilled} h-[50px] border border-sky-500 shadow-sm"
	>
		<div class="flex h-8 w-fit items-center">
			<div class="h-8 w-8">
				<!-- <img src={getImageForChain($chainStore.chainId)} alt="current chain" /> -->
				<img src={getChainInfo($chainStore.chainId).image} alt="current chain" />
			</div>
			<div class="ml-2">
				<Icon data={chevronDown} size={12} iconColorClass="icon-primary" />
			</div>
		</div>
	</summary>

	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="menu dropdown-content rounded-box z-[1] mt-4 w-52 bg-base-100 p-2 shadow">
		{#each $allowedChainsStore as chain (chain)}
			<li class="flex {$chainStore.chainId === chain ? 'rounded-lg bg-primary text-white' : ''}">
				<button on:click={() => handleChainSwitch(chain)}>
					<div class="h-6 w-6 rounded-full ring-1 ring-white">
						<!-- <img src={getImageForChain(chain)} alt="" /> -->
						<img src={getChainInfo($chainStore.chainId).image} alt="" />
					</div>
					<!-- {getChainDisplayName(chain)} -->
					{getChainInfo(chain).displayName}
				</button>
			</li>
		{/each}
	</ul>
</details>
