<script lang="ts">
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import Text from '$lib/atoms/texts/Text.svelte';
	import RewardsData from '$lib/page-components/receiver-rewards/RewardsData.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import InitiateRewards from '$lib/page-components/receiver-rewards/buttons/InitiateRewards.svelte';
	import UpdateTicketRewards from './buttons/UpdateTicketRewards.svelte';
	import AddRewardsBalance from './buttons/AddRewardsBalance.svelte';
</script>

<ContainerCard>
	<Text variant="h3" text="Receiver Rewards" styleClass="text-center" />
	<RewardsData />
	{#if $connected}
		<div class="flex w-full items-center justify-center gap-4">
			{#if $receiverRewardsStore.rewardBalance > 0n}
				<div class="flex w-1/2 items-center justify-center gap-4">
					<UpdateTicketRewards />
					<AddRewardsBalance />
				</div>
			{:else}
				<InitiateRewards />
			{/if}
		</div>
	{:else}
		<ConnectWalletButton isLarge={true} />
	{/if}
</ContainerCard>
