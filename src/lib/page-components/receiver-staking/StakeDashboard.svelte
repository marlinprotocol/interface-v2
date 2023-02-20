<script lang="ts">
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { receiverStakingStore } from '$lib/data-stores/receiverStakingStore';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import StakedData from '$lib/page-components/receiver-staking/StakedData.svelte';
	import StakeModal from '$lib/page-components/receiver-staking/StakeModal.svelte';
	import UnstakeModal from '$lib/page-components/receiver-staking/UnstakeModal.svelte';
	import lock from 'svelte-awesome/icons/lock';

	const styles = {
		buttonsGroup: 'flex gap-4 items-center justify-center w-full',
		buttonWrapper: 'w-1/2',
		buttonLarge: 'h-14 text-base font-semibold',
		documentButton: `${buttonClasses.lightblueFilled} h-10 text-small font-medium gap-3 mx-auto mt-8`
	};

	//TODO (Souvik): shouldn't this be queuedBalance instead of approvedBalance? - shivani changed
	$: validBalance = $receiverStakingStore.queuedBalance
		.add($receiverStakingStore.stakedBalance)
		.gt(0);
</script>

<ContainerCard>
	<Text variant="h3" text="Receiver Staking" styleClass="text-center" />
	<StakedData />
	{#if $connected}
		<div class={styles.buttonsGroup}>
			<div class={styles.buttonWrapper}>
				<label for="stake-modal" class={`${buttonClasses.filled} ${styles.buttonLarge} w-full`}
					>STAKE</label
				>
			</div>

			<div class={styles.buttonWrapper}>
				{#if validBalance}
					<label
						for="unstake-modal"
						class={`${buttonClasses.outlined} ${styles.buttonLarge} w-full`}>UNSTAKE</label
					>
				{:else}
					<div
						class={`${buttonClasses.outlined} ${styles.buttonLarge} w-full btn-disabled opacity-60`}
					>
						UNSTAKE
					</div>
				{/if}
			</div>
		</div>
		<StakeModal />
		<UnstakeModal />
	{:else}
		<label
			for="connect-wallet-modal"
			class={`${buttonClasses.filled} ${styles.buttonLarge} flex gap-1`}
		>
			<Icon data={lock} size={20} iconColorClass="text-white" />
			Connect Wallet
		</label>
	{/if}
</ContainerCard>

<a
	href="https://docs.marlin.org/docs/User%20Guides/Oyster/"
	target="_blank"
	rel="noopener noreferrer"
>
	<button class={styles.documentButton}>
		<img src="./images/openinnew.svg" alt="Copy" />
		Documentation
	</button>
</a>
