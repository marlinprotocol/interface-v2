<script lang="ts">
	export let loading: boolean = false;
	export let hasPadding: boolean = false;

	const width = hasPadding ? '24' : '20';

	const styles = {
		baseStyle: `mt-0.5 w-[${width}px] h-[${width}px] rounded-3xl flex justify-center text-white`,
		loadingBackground:
			'animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75',
		loadingText: `relative inline-flex rounded-full ${
			hasPadding ? 'p-[3px]' : ''
		} w-[${width}px] h-[${width}px] bg-orange-400 text-center flex justify-center text-sm`
	};
</script>

{#if loading}
	<span class={`relative ${styles.baseStyle}`}>
		<span class={styles.loadingBackground} />
		<span class={styles.loadingText}>
			<slot />
		</span>
	</span>
{:else}
	<div class={`${styles.baseStyle} bg-grey-400`}>
		<slot />
	</div>
{/if}
