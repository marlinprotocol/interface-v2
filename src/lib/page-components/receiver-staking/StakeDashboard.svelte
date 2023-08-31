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

	const styles = {
		buttonsGroup: 'flex gap-4 items-center justify-center w-full',
		buttonWrapper: 'w-1/2',
		buttonLarge: 'h-14 text-base font-semibold'
	};

	$: validBalance = $receiverStakingStore.queuedBalance
		.add($receiverStakingStore.stakedBalance)
		.gt(0);
</script>

<ContainerCard>
	<Text variant="h3" text="Receiver Staking" styleClass="text-center" />
	<ReceiverTabToggle />
	<StakedData />
	{#if $connected}
		<div class={styles.buttonsGroup}>
			<div class={styles.buttonWrapper}>
				<StakeButton />
			</div>

			<div class={styles.buttonWrapper}>
				<UnstakeButton disabled={!validBalance} />
			</div>
		</div>
	{:else}
		<ConnectWalletButton isLarge={true} />
	{/if}
</ContainerCard>
<InfoButtonLink href="https://docs.marlin.org" text="Documentation" />
