<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import {
		getImageForChain,
		getChainDisplayName,
		switchChain
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
				getChainDisplayName(chainId)
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
	class={$allowedChainsStore.length === 0 ? 'pointer-events-none opacity-60 focus' : 'dropdown'}
	id="chain-dropdown"
>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<summary
		tabindex={$allowedChainsStore.length === 0 ? -1 : 0}
		class="{isDark
			? buttonClasses.greyFilled
			: buttonClasses.whiteFilled} border border-sky-500 h-[50px] shadow-sm"
	>
		<div class="h-8 w-fit flex items-center">
			<div class="h-8 w-8">
				<img src={getImageForChain($chainStore.chainId)} alt="current chain" />
			</div>
			<div class="ml-2">
				<Icon data={chevronDown} size={12} iconColorClass="icon-primary" />
			</div>
		</div>
	</summary>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul tabindex="0" class="dropdown-content mt-4 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#each $allowedChainsStore as chain (chain)}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class="flex {$chainStore.chainId === chain ? 'bg-primary text-white rounded-lg' : ''}"
				on:click={() => handleChainSwitch(chain)}
			>
				<div>
					<div class="h-6 w-6 rounded-full ring-1 ring-white">
						<img src={getImageForChain(chain)} alt="" />
					</div>
					{getChainDisplayName(chain)}
				</div>
			</li>
		{/each}
	</ul>
</details>
