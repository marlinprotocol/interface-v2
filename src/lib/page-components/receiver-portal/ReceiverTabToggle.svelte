<script lang="ts">
	import { page } from '$app/stores';
	import Chip from '$lib/atoms/chip/Chip.svelte';
	import {
		RELAY_RECEIVER_REWARDS_URL,
		RELAY_RECEIVER_STAKING_URL
	} from '$lib/utils/constants/urls';
</script>

<div class="mt-4 flex w-full justify-center gap-4">
	<a href={RELAY_RECEIVER_STAKING_URL}>
		<Chip variant={$page.route.id === RELAY_RECEIVER_STAKING_URL ? 'primary' : 'secondary'}
			>Receiver Staking</Chip
		>
	</a>
	<a href={RELAY_RECEIVER_REWARDS_URL}>
		<Chip variant={$page.route.id === RELAY_RECEIVER_REWARDS_URL ? 'primary' : 'secondary'}
			>Receiver Rewards</Chip
		>
	</a>
</div>
