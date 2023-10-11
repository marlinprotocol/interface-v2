<script lang="ts">
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ChainSwitcher from '$lib/components/header/sub-components/ChainSwitcher.svelte';

	const styles = {
		subtitle: 'text-[15px] font-medium text-left mt-1 text-black/50 mt-4 px-2 mb-8 text-center'
	};
</script>

<ContainerCard>
	<Text variant="h3" text="Unsupported Network" styleClass="text-center" />
	<span class={styles.subtitle}
		>Please switch to one of the chains in the dropdown to continue.</span
	>
	<div class="flex items-center justify-center">
		<ChainSwitcher isDark />
	</div>
</ContainerCard>
