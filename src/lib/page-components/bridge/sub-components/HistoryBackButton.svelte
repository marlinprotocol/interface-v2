<script lang="ts">
	import { buttonClasses, dividerClasses } from '$lib/atoms/componentClasses';
	import BackButton from '$lib/components/buttons/BackButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';

	export let firstText: string;
	export let secondText: string;
	export let href: string;
</script>

<div class="flex w-fit flex-wrap items-center justify-start gap-3">
	<BackButton text="Back to the Bridge" href="/bridge" />
	<div class="hidden sm:block ${dividerClasses.verticalPrimary}" />
	<a {href} class={buttonClasses.largeButton}>
		Go to {firstText}
		<img src={staticImages.ArrowLong} alt="arrow" />
		{secondText} History
	</a>
</div>
