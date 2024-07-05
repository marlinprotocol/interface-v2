<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import BackButton from '$lib/components/buttons/BackButton.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let title: string;
	export let backHref = '';
	export let wrapperClass = '';
</script>

<div class={cn('mb-8 flex items-center gap-4', wrapperClass)} data-testid="page-title">
	{#if !!backHref}
		<BackButton href={backHref} text="" />
	{/if}
	<Text
		styleClass="font-poppins leading-[-2px] text-grey-800"
		variant="h2"
		fontWeight="font-medium"
		text={title}
	/>
	<slot name="button" />
</div>
