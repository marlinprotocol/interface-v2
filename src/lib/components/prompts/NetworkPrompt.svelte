<script lang="ts">
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ChainSwitcher from '$lib/components/v2/header/sub-components/ChainSwitcher.svelte';
</script>

<ContainerCard>
	<Text variant="h3" text="Unsupported Network" styleClass="text-center" />
	<span class="mb-8 mt-4 px-2 text-center text-[15px] font-medium text-black/50"
		>Please switch to one of the chains in the dropdown to continue.</span
	>
	<div class="flex items-center justify-center">
		<ChainSwitcher />
	</div>
</ContainerCard>
