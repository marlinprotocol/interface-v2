<script lang="ts">
	import ContainerCard from '$lib/components/cards/ContainerCard.svelte';
	import { buttonClasses } from '$lib/components/componentClasses';
	import StakedData from './StakedData.svelte';
	import StakeModal from './StakeModal.svelte';
	import UnstakeModal from './UnstakeModal.svelte';
</script>

<ContainerCard>
	<div class="flex gap-2 items-center justify-center">
		<label for="stake-modal" class={buttonClasses.primary}>Stake</label>
		<label for="unstake-modal" class={buttonClasses.secondary}>Un Stake</label>
		<StakeModal />
		<UnstakeModal />
	</div>
	<StakedData />
</ContainerCard>
