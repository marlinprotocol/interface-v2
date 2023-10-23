<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import CollapseButton from '$lib/components/buttons/CollapseButton.svelte';

	export let dataList: (string | number)[] = [];
	export let title = '';
	export let value: string | number | undefined = '';
	export let setValue: ((value: string | number) => any) | undefined = undefined;
	export let showSuggestions = false;
	export let suggestions: (string | number)[] | string[][] = [];
	export let textSuffix = '';

	let windowWidth: number;
	let searchContainer: HTMLDivElement;

	const handleClickOutside = (event: MouseEvent) => {
		if (searchContainer.contains(event.target as Node) === false) {
			showSuggestions = false;
		}
	};

	const handleToggleShowAllSuggestions = () => {
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

<div bind:this={searchContainer} class="search-container relative w-fit">
	<CollapseButton
		isOpen={showSuggestions}
		onclick={handleToggleShowAllSuggestions}
		disabled={dataList.length === 0}
		styleClass={buttonClasses.dropdownIcon}
	/>
	{#if showSuggestions && suggestions.length > 0}
		<ul
			class="absolute right-[-17px] z-10 mt-3.5 max-h-72 w-fit min-w-[150px] overflow-y-auto rounded-md border border-gray-300 bg-white text-base shadow-lg focus:outline-none sm:text-sm"
		>
			<div class="flex items-center justify-between px-8 py-4">
				<Text variant="small" fontWeight="font-semibold" text={title ?? 'Select'} />
			</div>
			{#each suggestions as suggestion}
				<li
					class="cursor-pointer text-left hover:bg-gray-100 {Array.isArray(suggestion)
						? suggestion[1] === value
							? 'bg-blue-50'
							: 'bg-white'
						: suggestion === value
						? 'bg-blue-50'
						: 'bg-white'}"
				>
					<button
						class="w-full px-8 py-3 text-left"
						on:click={() => handleSuggestionClick(suggestion)}
					>
						<!-- if the suggestion list has an array/object for displaying suggestions. Eg. region select-->
						{#if Array.isArray(suggestion)}
							<label
								for="checkbox-item-12"
								class="flex w-full min-w-[320px] items-baseline justify-between text-sm font-medium"
							>
								<span>{suggestion[0]}</span>
								<span class="text-xs font-normal">{suggestion[1]}</span>
							</label>
						{:else}
							<label for="checkbox-item-12" class="w-full text-sm font-medium">
								{suggestion + (suggestion !== 'All' ? textSuffix : '')}
							</label>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	/* always show y scrollbar in chrome */
	::-webkit-scrollbar {
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
	}
</style>
