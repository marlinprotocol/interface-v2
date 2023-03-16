<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import StakeModal from '$lib/page-components/receiver-staking/StakeModal.svelte';

	let showDialog = false;
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold'
	};
</script>

<Button
	onclick={() => {
		showDialog = true;
	}}
	variant="filled"
	styleClass={`${styles.buttonLarge} w-full`}>STAKE</Button
>
<StakeModal bind:showDialog />
