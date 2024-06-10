<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import KalypsoRegisterModal from './modals/KalypsoRegisterModal.svelte';
	import DashboardHeader from './DashboardHeader.svelte';
	import RegisteredOverview from './RegisteredOverview.svelte';
	import { kalypsoStore } from '$lib/data-stores/kalypsoStore';

	$: titleText = $connected
		? "You aren't providing infra on oyster. Join the network"
		: 'Connect your wallet';
</script>

<div>
	<DashboardHeader />

	<div class="mt-16">
		<ContainerCard>
			{#if !$connected || !$kalypsoStore.registered}
				<p class="text-xl font-semibold">{titleText}</p>
				<img src={staticImages.fishingMan} alt="A man fishing" />
			{/if}
			<div class="flex items-center justify-center gap-4">
				{#if $connected && !$kalypsoStore.registered}
					<ModalButton size="large" styleClass="w-full" modalFor="kalypso-register-modal"
						>Register</ModalButton
					>
				{:else if !$connected}
					<div class="flex flex-row items-center justify-center gap-4">
						<a
							href="https://docs.marlin.org/learn/what-is-kalypso"
							class={cn(
								buttonClasses.outlined,
								'flex h-14 w-fit gap-[10.3px] px-8 text-base font-semibold'
							)}>Learn More</a
						>
						<ConnectWalletButton isLarge styleClass="w-fit px-8" />
					</div>
				{:else}
					<RegisteredOverview />
				{/if}
			</div>
		</ContainerCard>
	</div>
</div>
<KalypsoRegisterModal />
