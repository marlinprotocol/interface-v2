<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';

	export let title: string = '';
	export let imageSrc: string;
	export let imageAlt: string;
	export let buttonText: string = '';
	export let href: string = '';
	export let description: string;
</script>

<ContainerCard>
	{#if title}
		<Text variant="h3" text={title} styleClass="text-center" />
	{/if}
	<span class="my-4 px-2 text-center text-[15px] font-medium text-black/50">
		{description}
	</span>
	<img src={imageSrc} alt={imageAlt} class="mx-auto h-[324px]" />
	{#if $$slots.cta}
		<slot name="cta" />
	{:else if href && buttonText}
		<a class="mt-4 w-full" target="_blank" {href}>
			<Button styleClass="w-full" variant="filled" size="large">{buttonText}</Button>
		</a>
	{/if}
</ContainerCard>
