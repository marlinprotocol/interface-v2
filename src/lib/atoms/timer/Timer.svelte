<script lang="ts">
	import { doNothing } from '$lib/utils/helpers/commonHelper';

	export let endEpochTime: number;
	export let onTimerEnd: () => void = () => {
		doNothing();
	};
	export let timerId: string;
	//TODO: create a timer function that can be invoked from outside to stop the timer

	$: original = Math.floor(endEpochTime - Date.now() / 1000);

	setInterval(() => {
		if (original > 0) {
			if (original === 1) {
				onTimerEnd();
			}
			original--;
		}
	}, 1000);
</script>

<div id={timerId} class="flex items-center gap-1">
	{#if original > 0}
		<slot name="active" timer={original} />
	{:else}
		<slot name="inactive" />
	{/if}
</div>
