<script>
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import Text from '$lib/atoms/texts/Text.svelte';
</script>

<ContainerCard>
	<Text variant="h3" text="Kalypso is under construction" styleClass="text-center" />
	<span class="my-4 px-2 text-center text-[15px] font-medium text-black/50"
		>You curious fishes can visit the link below to understand on how we are decentralizing ZK
		proofs.</span
	>
	<img src={staticImages.fishingMan} alt="Fishing Man" class="mx-auto" />
	<a
		class="mt-4 w-full"
		target="_blank"
		href="https://docs.marlin.org/learn/what-is-kalypso
		"><Button styleClass="w-full" variant="filled" size="large">Learn about Kalypso</Button></a
	>
</ContainerCard>
