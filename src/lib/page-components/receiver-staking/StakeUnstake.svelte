<script lang="ts">
	import ContainerCard from '$lib/components/cards/ContainerCard.svelte';
	import { buttonClasses } from '$lib/components/componentClasses';
	import StakedData from './StakedData.svelte';
	import StakeModal from './StakeModal.svelte';
	import UnstakeModal from './UnstakeModal.svelte';
</script>

<div>
	<div class="flex gap-2 items-center justify-center mt-4">
		<label for="stake-modal" class={`${buttonClasses.primary} px-8`}>Stake</label>
		<label for="unstake-modal" class={`${buttonClasses.secondary} px-8`}>Un Stake</label>
		<StakeModal />
		<UnstakeModal />
	</div>
	<ContainerCard>
		<StakedData />
	</ContainerCard>
</div>
