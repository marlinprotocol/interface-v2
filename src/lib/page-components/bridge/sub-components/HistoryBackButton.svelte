<script lang="ts">
	import { buttonClasses, dividerClasses } from '$lib/atoms/componentClasses';
	import BackButton from '$lib/components/buttons/BackButton.svelte';

	export let firstText: string;
	export let secondText: string;
	export let href: string;
</script>

<div class="flex justify-start items-center gap-3 w-fit flex-wrap">
	<BackButton text={'Back to the Bridge'} href={'/bridge'} />
	<div class={`hidden sm:block ${dividerClasses.verticalPrimary}`} />
	<a {href} class={buttonClasses.largeButton}>
		{`Go to ${firstText}`}
		<img src="/images/arrow-long.svg" alt="arrow" />
		{`${secondText} History`}
	</a>
</div>
