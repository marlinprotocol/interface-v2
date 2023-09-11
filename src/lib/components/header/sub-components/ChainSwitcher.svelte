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

	export let isDark: boolean;

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
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="dropdown">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label
		tabindex="0"
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
	</label>
	<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#each $allowedChainsStore as chain (chain)}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class="flex {$chainStore.chainId === chain ? 'bg-grey-300 rounded-lg' : ''}"
				on:click={() => handleChainSwitch(chain)}
			>
				<div>
					<div class="h-8 w-8">
						<img src={getImageForChain(chain)} alt="" />
					</div>
					{getChainDisplayName(chain)}
				</div>
			</li>
		{/each}
	</ul>
</div>
