<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import StakeModal from '$lib/page-components/receiver-staking/StakeModal.svelte';

	let showStakeDialog = false;
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold'
	};
</script>

<Button
	onclick={() => {
		showStakeDialog = true;
	}}
	variant="filled"
	styleClass={`${styles.buttonLarge} w-full`}>STAKE</Button
>
<StakeModal bind:showStakeDialog />
