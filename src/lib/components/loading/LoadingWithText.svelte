<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	export let text: string = '1';
	export let loading: boolean = false;

	const styles = {
		baseStyle: 'mt-0.5 w-[20px] h-[20px] rounded-3xl flex justify-center text-white',
		loadingBackground:
			'animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75',
		loadingText:
			'relative inline-flex rounded-full h-5 w-5 bg-orange-400 text-center flex justify-center text-sm'
	};
</script>

{#if loading}
	<span class={`relative ${styles.baseStyle}`}>
		<span class={styles.loadingBackground} />
		<span class={styles.loadingText}>{text}</span>
	</span>
{:else}
	<div class={`${styles.baseStyle} bg-grey-400`}>
		<Text variant="small" styleClass="font-semibold" {text} />
	</div>
{/if}
