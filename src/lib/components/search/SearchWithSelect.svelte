<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { onDestroy, onMount } from 'svelte';
	import CollapseButton from '../buttons/CollapseButton.svelte';

	export let dataList: string[] = [];
	export let title: string;
	export let placeholder: string = 'Search';
	export let styleClass: string = '';
	export let setSearchValue = (value: string) => {};

	// const dispatch = createEventDispatcher();

	let searchTerm: string = '';
	let suggestions: string[] = [];
	let showSuggestions: boolean = false;

	const handleSearch = (event: any) => {
		const input = event.target as HTMLInputElement;
		searchTerm = input.value;
		suggestions = dataList.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
		showSuggestions = suggestions.length > 0;
		setSearchValue(searchTerm);
	};

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (!target.closest('.search-container')) {
			showSuggestions = false;
		}
	};

	const handleToggleShowAllSuggestions = () => {
		suggestions = dataList;
		showSuggestions = !showSuggestions;
	};

	const handleSearchSuggestionClick = (suggestion: string) => {
		searchTerm = suggestion;
		showSuggestions = false;
		setSearchValue(searchTerm);
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});

	const styles = {
		rowWrapper: 'flex items-center justify-between',
		titleIcon: 'flex items-center gap-1',
		inputSearch: inputClasses.inputText
	};
</script>

<InputCard {styleClass}>
	<div class={styles.rowWrapper}>
		<div class={styles.titleIcon}>
			<Text variant="small" text={title} />
		</div>
		<slot name="titleEndButton" />
	</div>
	<div class="relative search-container">
		<div class="input-group items-center">
			<input class={styles.inputSearch} {placeholder} value={searchTerm} on:input={handleSearch} />
			<CollapseButton isOpen={showSuggestions} onclick={handleToggleShowAllSuggestions} />
		</div>

		{#if showSuggestions && suggestions.length > 0}
			<ul
				class="absolute z-10 w-fit right-0 text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-y-auto focus:outline-none sm:text-sm"
			>
				<div class="flex justify-between px-8 py-4 items-center">
					<Text variant="small" styleClass="" fontWeight="font-semibold" text={`Select ${title}`} />
				</div>
				{#each suggestions as suggestion}
					<li
						class={`px-8 py-3 cursor-pointer hover:bg-gray-100 text-left  ${
							suggestion === searchTerm ? 'bg-blue-50' : 'bg-white'
						}`}
						on:click={() => handleSearchSuggestionClick(suggestion)}
						on:keydown={(event) => {
							if (event.key === 'Enter') {
								handleSearchSuggestionClick(suggestion);
							}
						}}
					>
						<label for="checkbox-item-12" class={`w-full text-sm font-medium`}>
							{suggestion}
						</label>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</InputCard>
