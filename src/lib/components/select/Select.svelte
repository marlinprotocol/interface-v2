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
		await setValue?.(value);
	};
</script>

<svelte:window on:click={handleClickOutside} bind:innerWidth={windowWidth} />

<div bind:this={searchContainer} class="w-fit search-container relative">
	<CollapseButton
		isOpen={showSuggestions}
		onclick={handleToggleShowAllSuggestions}
		disabled={dataList.length === 0}
		styleClass={buttonClasses.dropdownIcon}
	/>
	{#if showSuggestions && suggestions.length > 0}
		<ul
			class={`absolute right-[-17px] z-10 min-w-[150px] w-fit mt-3.5 text-base bg-white rounded-md border border-gray-300 shadow-lg max-h-72 overflow-y-auto focus:outline-none sm:text-sm`}
		>
			<div class="flex justify-between px-8 py-4 items-center">
				<Text variant="small" styleClass="" fontWeight="font-semibold" text={title ?? 'Select'} />
			</div>
			{#each suggestions as suggestion}
				<li
					class={`px-8 py-3 cursor-pointer hover:bg-gray-100 text-left  ${
						Array.isArray(suggestion)
							? suggestion[1] === value
								? 'bg-blue-50'
								: 'bg-white'
							: suggestion === value
							? 'bg-blue-50'
							: 'bg-white'
					}`}
				>
					<button on:click={() => handleSuggestionClick(suggestion)}>
						<!-- if the suggestion list has an array/object for displaying suggestions. Eg. region select-->
						{#if Array.isArray(suggestion)}
							<label
								for="checkbox-item-12"
								class={`w-full flex justify-between items-baseline text-sm font-medium min-w-[320px]`}
							>
								<span>{suggestion[0]}</span>
								<span class="text-xs font-normal">{suggestion[1]}</span>
							</label>
						{:else}
							<label for="checkbox-item-12" class={`w-full text-sm font-medium`}>
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
