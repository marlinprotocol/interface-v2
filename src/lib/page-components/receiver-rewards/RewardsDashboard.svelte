<script lang="ts">
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import Text from '$lib/atoms/texts/Text.svelte';
	import AddRewards from '$lib/page-components/receiver-rewards/buttons/AddRewards.svelte';
	import UpdateRewards from '$lib/page-components/receiver-rewards/buttons/UpdateRewards.svelte';
	import RewardsData from '$lib/page-components/receiver-rewards/RewardsData.svelte';
	import { receiverRewardsStore } from '$lib/data-stores/receiverRewardsStore';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';

	const styles = {
		buttonsGroup: 'flex gap-4 items-center justify-center w-full',
		buttonLarge: 'h-14 text-base font-semibold'
	};
</script>

<ContainerCard>
	<Text variant="h3" text="Receiver Rewards" styleClass="text-center" />
	<RewardsData />
	{#if $connected}
		<div class={styles.buttonsGroup}>
			{#if $receiverRewardsStore.rewardBalance.gt(BIG_NUMBER_ZERO)}
				<UpdateRewards />
			{:else}
				<AddRewards />
			{/if}
		</div>
	{:else}
		<ConnectWalletButton isLarge={true} />
	{/if}
</ContainerCard>
