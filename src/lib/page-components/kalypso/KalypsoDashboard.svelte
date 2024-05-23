<script>
	import EmptyCard from '$lib/components/empty-state/EmptyCard.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
</script>

<EmptyCard
	title="Curious fishies can visit the link below to learn more about Marlin's ZK proof marketplace."
	imageSrc={staticImages.fishingMan}
	imageAlt="Fishing Man"
	href="https://docs.marlin.org/learn/what-is-kalypso"
	buttonText="Learn about Kalypso"
/>
