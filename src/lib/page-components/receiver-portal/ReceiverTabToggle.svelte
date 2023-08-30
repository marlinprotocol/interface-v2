<script lang="ts">
	import { page } from '$app/stores';
	import Chip from '$lib/atoms/chip/Chip.svelte';
	import { RECEIVER_REWARDS_URL, RECEIVER_STAKING_URL } from '$lib/utils/constants/urls';
</script>

<div class="w-full flex gap-4 justify-center mt-4">
	<a href={RECEIVER_STAKING_URL}>
		<Chip variant={$page.route.id === RECEIVER_STAKING_URL ? 'primary' : 'secondary'}
			>Receiver Staking</Chip
		>
	</a>
	<a href={RECEIVER_REWARDS_URL}>
		<Chip variant={$page.route.id === RECEIVER_REWARDS_URL ? 'primary' : 'secondary'}
			>Receiver Rewards</Chip
		>
	</a>
</div>
