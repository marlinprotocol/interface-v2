<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { buttonClasses, inputClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { onDestroy, onMount } from 'svelte';
	import CollapseButton from '../buttons/CollapseButton.svelte';
	import type { InputCardVariant } from '$lib/types/componentTypes';

	export let dataList: (string | number)[] = [];
	export let searchValue: string | number | undefined = '';
	export let title: string;
	export let showTitle = true;
	export let onlyFilters = false;
	export let placeholder = 'Search';
	export let styleClass = '';
	export let cardVariant: InputCardVariant | undefined = 'primary';
	export let setSearchValue: (value: string | number) => any;

	let suggestions: (string | number)[] = [];
	let showSuggestions = false;

	const handleSearch = async (event: any) => {
		const input = event.target as HTMLInputElement;
		searchValue = input.value;
		suggestions = dataList.filter((item) =>
			item
				.toString()
				.toLowerCase()
				.includes((searchValue ?? '').toString().toLowerCase())
		);
		showSuggestions = suggestions.length > 0;
		await setSearchValue(searchValue);
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

	const handleSearchSuggestionClick = async (suggestion: string | number) => {
		searchValue = suggestion;
		showSuggestions = false;
		await setSearchValue(searchValue);
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

<InputCard {styleClass} variant={cardVariant}>
	<div class="relative search-container">
		{#if showTitle}
			<div class={styles.rowWrapper}>
				<div class={styles.titleIcon}>
					<Text variant="small" text={onlyFilters ? placeholder : title} />
				</div>
				{#if onlyFilters}
					<CollapseButton
						isOpen={showSuggestions}
						onclick={handleToggleShowAllSuggestions}
						disabled={dataList.length === 0}
						styleClass={buttonClasses.dropdownIcon}
					/>
				{/if}
			</div>
		{/if}
		{#if !onlyFilters}
			<div class="input-group items-center">
				<input
					class={styles.inputSearch}
					{placeholder}
					value={searchValue ?? ''}
					on:input={handleSearch}
				/>
				<CollapseButton
					isOpen={showSuggestions}
					onclick={handleToggleShowAllSuggestions}
					disabled={dataList.length === 0}
					styleClass={buttonClasses.dropdownIcon}
				/>
			</div>
		{/if}

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
							suggestion === searchValue ? 'bg-blue-50' : 'bg-white'
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
