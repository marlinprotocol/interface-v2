<script lang="ts">
	import ContainerCard from '$lib/components/cards/ContainerCard.svelte';
	import { buttonClasses } from '$lib/components/componentClasses';
	import Text from '$lib/components/texts/Text.svelte';
	import StakedData from './StakedData.svelte';
	import StakeModal from './StakeModal.svelte';
	import UnstakeModal from './UnstakeModal.svelte';

	const styles = {
		buttonsGroup: 'flex gap-2 items-center justify-center w-full',
		buttonWrapper: 'w-1/2'
	};
</script>

<div>
	<ContainerCard>
		<Text variant="h3" text="Receiver Staking Portal" styleClass="text-center" />
		<StakedData />
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
	</ContainerCard>
</div>
