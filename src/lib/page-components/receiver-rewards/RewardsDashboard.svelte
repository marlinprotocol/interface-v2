<script lang="ts">
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import Text from '$lib/atoms/texts/Text.svelte';
	import RewardsData from '$lib/page-components/receiver-rewards/RewardsData.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import InitiateRewards from '$lib/page-components/receiver-rewards/buttons/InitiateRewards.svelte';
	import UpdateTicketRewards from './buttons/UpdateTicketRewards.svelte';
	import AddRewardsBalance from './buttons/AddRewardsBalance.svelte';

	const styles = {
		buttonsGroup: 'flex gap-4 items-center justify-center w-full',
		buttonsSubgroup: 'flex gap-4 items-center justify-center w-1/2',
		buttonLarge: 'h-14 text-base font-semibold'
	};
</script>

<ContainerCard>
	<Text variant="h3" text="Receiver Rewards" styleClass="text-center" />
	<RewardsData />
	{#if $connected}
		<div class={styles.buttonsGroup}>
			{#if $receiverRewardsStore.rewardBalance.gt(BIG_NUMBER_ZERO)}
				<div class={styles.buttonsSubgroup}>
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
