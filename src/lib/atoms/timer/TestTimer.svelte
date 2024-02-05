<script lang="ts">
	import { doNothing } from '$lib/utils/helpers/commonHelper';
	import Timer from './Timer.svelte';

	export let endEpochTime: number;
	export let timerId: string;

	export let onTimerEnd: () => void = () => {
		doNothing();
	};
</script>

<Timer {endEpochTime} {timerId} {onTimerEnd}>
	<div slot="active" id="active_slot_timer" let:timer>{timer}</div>
	<div slot="inactive" id="inactive_slot_timer">Timer End</div>
</Timer>
