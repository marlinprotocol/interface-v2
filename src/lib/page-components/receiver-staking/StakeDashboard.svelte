<script lang="ts">
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { connected } from '$lib/data-stores/walletProviderStore';
	import StakedData from '$lib/page-components/receiver-staking/StakedData.svelte';
	import StakeModal from '$lib/page-components/receiver-staking/StakeModal.svelte';
	import UnstakeModal from '$lib/page-components/receiver-staking/UnstakeModal.svelte';
	import lock from 'svelte-awesome/icons/lock';

	const styles = {
		buttonsGroup: 'flex gap-5 items-center justify-center w-full',
		buttonWrapper: 'w-1/2'
	};
</script>

<div>
	<ContainerCard>
		<Text variant="h3" text="Receiver Staking Portal" styleClass="text-center" />
		<StakedData />
		{#if $connected}
			<div class={styles.buttonsGroup}>
				<div class={styles.buttonWrapper}>
					<label for="stake-modal" class={`${buttonClasses.filled} w-full`}>Stake</label>
				</div>
				<div class={styles.buttonWrapper}>
					<label for="unstake-modal" class={`${buttonClasses.outlined} w-full`}>Unstake</label>
				</div>
			</div>
			<StakeModal />
			<UnstakeModal />
		{:else}
			<label for="connect-wallet-modal" class={`${buttonClasses.filled} flex gap-1`}>
				<Icon data={lock} size={20} iconColorClass="text-white" />
				Connect Wallet
			</label>
		{/if}
	</ContainerCard>
</div>
