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
		buttonsGroup: 'flex gap-4 items-center justify-center w-full',
		buttonWrapper: 'w-1/2'
	};
</script>

<div>
	<ContainerCard>
		<Text variant="h3" text="Receiver Staking" styleClass="text-center" />
		<StakedData />
		{#if $connected}
			<div class={styles.buttonsGroup}>
				<div class={styles.buttonWrapper}>
					<label
						for="stake-modal"
						class={`${buttonClasses.filled} h-14 w-full text-base font-semibold`}>Stake</label
					>
				</div>
				<div class={styles.buttonWrapper}>
					<label
						for="unstake-modal"
						class={`${buttonClasses.outlined} h-14 w-full text-base font-semibold`}>Unstake</label
					>
				</div>
			</div>
			<StakeModal />
			<UnstakeModal />
		{:else}
			<label
				for="connect-wallet-modal"
				class={`${buttonClasses.filled} h-14 font-semibold text-base flex gap-1`}
			>
				<Icon data={lock} size={20} iconColorClass="text-white" />
				Connect Wallet
			</label>
		{/if}
	</ContainerCard>
</div>
