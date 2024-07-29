<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
</script>

<div class="flex items-center justify-between">
	<Text
		styleClass="font-poppins leading-[-2px] text-grey-800"
		variant="h2"
		fontWeight="font-medium"
		text="Hello, {$connected ? shortenText($walletStore.address, 6, 6) : 'Fishy'}"
	/>
	{#if $connected}
		<div class="flex gap-4">
			<a
				href="https://docs.marlin.org/learn/what-is-kalypso"
				class={cn(buttonClasses.outlined, 'h-14 w-28 text-base font-normal')}
				target="_blank"
			>
				Learn
			</a>
			<a
				href="https://docs.marlin.org/learn/kalypso/"
				class={cn(buttonClasses.outlined, 'h-14 text-base font-normal')}
				target="_blank"
			>
				Documentation
			</a>
		</div>
	{/if}
</div>
<p class="mt-4 text-lg font-light leading-6 text-grey-500">
	Oyster is a sub-network of Marlin that specializes in offering TEE-based coprocessors. Servers
	provisioned using smart contract calls host AI/ML models, gateways, frontends, MEV or automation
	bots, or backends for arbitrary computations using external APIs with baked-in auto-scaling and
	fault tolerance.
</p>
