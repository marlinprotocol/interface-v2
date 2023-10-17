<script lang="ts">
	import InfoButtonLink from '$lib/atoms/buttons/InfoButtonLink.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import StakedData from '$lib/page-components/receiver-staking/StakedData.svelte';
	import StakeButton from '$lib/page-components/receiver-staking/buttons/StakeButton.svelte';
	import UnstakeButton from '$lib/page-components/receiver-staking/buttons/UnstakeButton.svelte';
	import ReceiverTabToggle from '$lib/page-components/receiver-portal/ReceiverTabToggle.svelte';

	$: validBalance = $receiverStakingStore.queuedBalance + $receiverStakingStore.stakedBalance > 0;
</script>

<ContainerCard>
	<Text variant="h3" text="Receiver Staking" styleClass="text-center" />
	<ReceiverTabToggle />
	<StakedData />
	{#if $connected}
		<div class="flex w-full items-center justify-center gap-4">
			<div class="w-1/2">
				<StakeButton />
			</div>

			<div class="w-1/2">
				<UnstakeButton disabled={!validBalance} />
			</div>
		</div>
	{:else}
		<ConnectWalletButton isLarge={true} />
	{/if}
</ContainerCard>
<InfoButtonLink href="https://docs.marlin.org" text="Documentation" />
