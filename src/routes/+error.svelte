<script>
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import PageWrapper from '$lib/components/wrapper/PageWrapper.svelte';
</script>

<PageWrapper>
	<ContainerCard>
		<Text variant="h3" text="UH OH!" styleClass="text-center" />
		<span class="mt-4 px-2 text-left text-[15px] font-medium text-black/50">
			Seems like you wandered too far into the ocean you silly fish.
		</span>
		<a class="mt-8 w-full" href="/"
			><Button styleClass="w-full" variant="filled" size="large">GO BACK HOME</Button></a
		>
	</ContainerCard>
</PageWrapper>
