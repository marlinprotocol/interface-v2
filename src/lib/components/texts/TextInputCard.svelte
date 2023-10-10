<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import ImageColored from '$lib/atoms/images/ImageColored.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import { handleCopyClick } from '$lib/utils/helpers/componentHelper';
	import { staticImages } from '../images/staticImages';

	export let title: string;
	export let tooltipText = '';
	export let value = '';
	export let textStyle = '';
	export let centered = false;
	export let cliboardContent: string | undefined = '';

	const styles = {
		titleIcon: `flex items-center gap-1 ${centered ? 'justify-center' : ''} mb-1`,
		value: `${textStyle} flex  ${centered ? 'text-center justify-center items-center' : ''}`
	};

	$: successMessage = `${title} copied to clipboard`;
</script>

<InputCard variant={'primary'}>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
		{#if tooltipText}
			<TooltipIcon
				{tooltipText}
				tooltipVariant="tooltip-secondary"
				tooltipDirection="tooltip-right"
			/>
		{/if}
	</div>
	<div class={styles.value}>
		<Text variant="small" text={value} fontWeight="font-medium" styleClass={styles.value} />
		{#if cliboardContent !== '' && cliboardContent !== undefined}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="cursor-pointer ml-2"
				on:keypress={() => handleCopyClick(cliboardContent, successMessage)}
				on:click={() => handleCopyClick(cliboardContent, successMessage)}
			>
				<ImageColored src={staticImages.CopyGrey} alt="Copy" variant={'grey'} />
			</div>
		{/if}
	</div>
</InputCard>
