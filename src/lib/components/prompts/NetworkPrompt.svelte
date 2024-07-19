<script lang="ts">
	import { staticImages } from '$lib/components/images/staticImages';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import ChainSwitcher from '../header/sub-components/ChainSwitcher.svelte';

	export let title: string = '';
	export let description: string = '';
	export let variant: 'white' | 'purple' = 'purple';
	export let showIcon: boolean = true;

	const isVariantWhite = variant === 'white';
	const imageSrc = isVariantWhite ? staticImages.infoIconWhite : staticImages.infoIconPurple;
</script>

<div class="flex h-full w-full items-center justify-center" id="network-prompt">
	<div
		class={cn(
			'flex h-[460px] w-130 flex-col items-center justify-center rounded-3xl border border-grey-100',
			isVariantWhite ? 'bg-white' : 'bg-[#3840C7]'
		)}
	>
		{#if showIcon}
			<div
				class={cn(
					'flex h-[84px] w-[84px] items-center justify-center rounded-full',
					isVariantWhite ? 'bg-[#3840C7]' : 'bg-white'
				)}
			>
				<img src={imageSrc} alt="Info Icon" />
			</div>
		{/if}

		{#if title}
			<span
				class={cn('mt-2 text-3xl font-medium', isVariantWhite ? 'text-grey-700' : 'text-[#FCFCFC]')}
				>{title}</span
			>
		{/if}

		{#if description}
			<p
				class={cn(
					'text-md mx-auto mt-2 max-w-[400px] text-center font-light leading-6',
					isVariantWhite ? 'text-[#A8A8A8]' : 'text-[#FCFCFC]'
				)}
			>
				{description}
			</p>
		{/if}

		{#if $$slots.cta}
			<slot name="cta" />
		{:else}
			<div class="mt-12 flex w-64 items-center justify-between rounded-full border border-white">
				<span class="pl-4 font-medium text-[#FCFCFC]">Switch</span>
				<ChainSwitcher id="network-prompt-chain-switcher-drop-down" />
			</div>
		{/if}
	</div>
</div>
