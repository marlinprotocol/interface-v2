<script lang="ts">
	import Text from '$lib/atoms/v2/texts/Text.svelte';
	import BackButton from '$lib/components/v2/buttons/BackButton.svelte';

	export let title: string;
	export let backHref = '';
</script>

<div class="mb-8 flex items-center gap-4" data-testid="page-title">
	{#if !!backHref}
		<BackButton href={backHref} text="" />
	{/if}
	<Text
		styleClass="font-poppins leading-[-2px] text-[#030115]"
		variant="h2"
		fontWeight="font-medium"
		text={title}
	/>
	<slot name="button" />
</div>
