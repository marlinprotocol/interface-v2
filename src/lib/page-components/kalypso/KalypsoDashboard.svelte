<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';

	$: titleText = $connected
		? "You aren't providing infra on oyster. Join the network"
		: 'Connect your wallet';
</script>

<div>
	<div class="flex items-center justify-between">
		<Text
			styleClass="font-poppins leading-[-2px] text-[#030115]"
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
	<p class="mt-4 text-lg font-light leading-6 text-[#3E3F47]">
		Oyster is a sub-network of Marlin that specializes in offering TEE-based coprocessors. Servers
		provisioned using smart contract calls host AI/ML models, gateways, frontends, MEV or automation
		bots, or backends for arbitrary computations using external APIs with baked-in auto-scaling and
		fault tolerance.
	</p>

	<div class="mt-16">
		<ContainerCard>
			<p class="text-xl font-semibold">{titleText}</p>
			<img src={staticImages.fishingMan} alt="A man fishing" />
			<div class="flex items-center justify-center gap-4">
				{#if $connected}
					<ModalButton size="large" styleClass="w-full" modalFor="kalyps-register-modal"
						>Register</ModalButton
					>
				{:else}
					<a
						href="https://docs.marlin.org/learn/what-is-kalypso"
						class={cn(
							buttonClasses.outlined,
							'flex h-14 w-fit gap-[10.3px] px-8 text-base font-semibold'
						)}>Learn More</a
					>
					<ConnectWalletButton isLarge styleClass="w-fit px-8" />
				{/if}
			</div>
		</ContainerCard>
	</div>
</div>
