<script lang="ts">
	export let loading = false;
	export let hasPadding = false;

	const styles = {
		baseStyle: `mt-0.5 ${
			hasPadding ? 'w-6 h-6' : 'w-5 h-5'
		}  rounded-3xl flex justify-center text-white`,
		loadingBackground:
			'animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75',
		loadingText: `relative inline-flex rounded-full ${
			hasPadding ? 'p-[2.5px] w-6 h-6' : 'w-5 h-5'
		} bg-orange-400 text-center flex justify-center text-sm`
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
