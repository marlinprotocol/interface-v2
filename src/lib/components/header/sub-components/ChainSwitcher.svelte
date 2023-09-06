<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import {
		getImageForChain,
		getChainDisplayName,
		switchChain
	} from '$lib/utils/helpers/networkHelper';
	import { environment } from '$lib/data-stores/environment';
	import { web3WalletStore } from '$lib/data-stores/walletProviderStore';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import { page } from '$app/stores';

	// base route should be same as the key in environment.supported_chains object
	$: baseRoute = $page?.route?.id?.split('/')?.[1].replace(/-/g, '_');
	$: routeSupportedChains =
		environment.supported_chains[baseRoute === '' || baseRoute === undefined ? 'relay' : baseRoute];
	$: provider = $web3WalletStore[0].provider;
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class="dropdown">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class={`${buttonClasses.whiteFilled} h-[50px] shadow-sm`}>
		<div class="w-8 h-8">
			<img src={getImageForChain($chainStore.chainId)} alt="current chain" />
		</div>
	</label>
	<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		{#each routeSupportedChains as chain (chain)}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li class="flex" on:click={() => switchChain(chain, provider)}>
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
