<script>
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { DISCORD_LINK } from '$lib/utils/constants/urls';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
</script>

<ContainerCard>
	<Text variant="h3" text="UH OH!" styleClass="text-center" />
	<p class="mt-4 px-2 text-left text-[15px] font-medium text-black/50">
		This page is under construction. To get more detials about this page and other exciting stuff
		that our team is building, check out our
		<a href={DISCORD_LINK} target="_blank" class="text-primary underline">discord</a>
		and say "<strong>FISHY</strong>" so we know that you're not a bot.
	</p>
	<a class="mt-8 w-full" href="/"
		><Button styleClass="w-full" variant="filled" size="large">GO BACK HOME</Button></a
	>
</ContainerCard>
