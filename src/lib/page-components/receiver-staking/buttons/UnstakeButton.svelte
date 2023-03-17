<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import UnstakeModal from '../UnstakeModal.svelte';

	let showUnstakeDialog = false;
	export let disabled = false;
	const styles = {
		buttonLarge: 'h-14 text-base font-semibold'
	};
</script>

<Button
	{disabled}
	onclick={() => {
		showUnstakeDialog = true;
	}}
	variant="outlined"
	styleClass={`${styles.buttonLarge} w-full`}>UNSTAKE</Button
>
<UnstakeModal bind:showUnstakeDialog />
