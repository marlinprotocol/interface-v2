<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';

	export let dataList: (string | number)[] = [];
	export let title = '';
	export let value: string | number | undefined = '';
	export let setValue: ((value: string | number) => any) | undefined = undefined;
	export let showSuggestions = false;
	export let suggestions: (string | number)[] | string[][] = [];
	export let textSuffix = '';
	export let showLabel = false;
	export let disabled = false;

	let windowWidth: number;
	let searchContainer: HTMLDivElement;

	const handleClickOutside = (event: MouseEvent) => {
		if (searchContainer.contains(event.target as Node) === false) {
			showSuggestions = false;
		}
	};

	const handleToggleShowAllSuggestions = () => {
		if (disabled) return;
		suggestions = dataList;
		showSuggestions = !showSuggestions;
	};

	const handleSuggestionClick = async (suggestion: string | number | Array<string>) => {
		showSuggestions = false;
		value =
			typeof suggestion === 'string' || typeof suggestion === 'number' ? suggestion : suggestion[1];
		setValue?.(value);
	};
</script>

<svelte:window on:click={handleClickOutside} bind:innerWidth={windowWidth} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	data-testid="select"
	id={'select-' + title.toLowerCase()}
	bind:this={searchContainer}
	on:click={handleToggleShowAllSuggestions}
	class={cn('search-container relative flex w-fit items-baseline', {
		'cursor-not-allowed': disabled
	})}
>
	<div class="flex h-auto items-center">
		{#if showLabel}
			<span class="mr-2 text-sm text-primary">{value}</span>
		{/if}
		{#if !disabled}
			<CollapseButton isOpen={showSuggestions} disabled={dataList.length === 0} />
		{/if}
	</div>

	{#if showSuggestions && suggestions.length > 0}
		<ul
			class="shadow-select-dropdown absolute right-[-17px] top-10 z-20 max-h-72 w-fit min-w-[150px] overflow-y-auto rounded-md bg-secondary-content text-base focus:outline-none sm:text-sm"
		>
			<div class="flex items-center justify-between px-8 py-4">
				<Text variant="small" fontWeight="font-semibold" text={title ?? 'Select'} />
			</div>
			{#each suggestions as suggestion}
				<li
					class="cursor-pointer text-left hover:bg-base-200 {Array.isArray(suggestion)
						? suggestion[1] === value
							? 'bg-base-200'
							: 'bg-secondary-content'
						: suggestion === value
							? 'bg-base-200'
							: 'bg-secondary-content'}"
				>
					<button
						class="w-full px-8 py-3 text-left"
						on:click={() => handleSuggestionClick(suggestion)}
					>
						<!-- if the suggestion list has an array/object for displaying suggestions. Eg. region select-->
						{#if Array.isArray(suggestion)}
							<div
								class="flex w-full min-w-[320px] items-baseline justify-between whitespace-nowrap text-sm font-medium"
							>
								<span>{suggestion[0]}</span>
								<span class="text-xs font-normal">{suggestion[1]}</span>
							</div>
						{:else}
							<div class="w-full whitespace-nowrap text-sm font-medium">
								{suggestion + (suggestion !== 'All' ? textSuffix : '')}
							</div>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	/* always show y scrollbar in chrome */
	/* ::-webkit-scrollbar {
		-webkit-appearance: none;
		width: 7px;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.4);
		-webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
	}

	::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0.08);
		border-radius: 5px;
	} */

	::-webkit-scrollbar-track {
		border-radius: 5px;
	}

	::-webkit-scrollbar {
		width: 14px;
	}

	::-webkit-scrollbar-thumb {
		border: 4px solid rgba(0, 0, 0, 0);
		background-clip: padding-box;
		border-radius: 9999px;
		background-color: #aaaaaa;
	}
</style>
