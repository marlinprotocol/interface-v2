<script lang="ts">
	export let endEpochTime: number;
	export let onTimerEnd: () => void = () => {};
	export let timerId: string;

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
