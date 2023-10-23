<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import type { InputCardVariant } from '$lib/types/componentTypes';
	import Select from '$lib/components/select/Select.svelte';

	export let dataList: (string | number)[] = [];
	export let searchValue: string | number | undefined = '';
	export let setSearchValue: (value: string | number, exactMatch?: boolean) => any;
	export let onSearchClick: (() => void) | undefined = undefined;
	export let title: string;
	export let showTitle = true;
	export let onlyFilters = false;
	export let placeholder = 'Search';
	export let styleClass = '';
	export let cardVariant: InputCardVariant | undefined = 'primary';
	export let disabled = false;
	export let isTableFilter = false;
	export let textSuffix = '';

	const styles = {
		rowWrapper: 'flex items-center justify-between',
		titleIcon: 'flex items-center gap-1',
		inputSearchBold: inputClasses.inputText,
		inputSearch: inputClasses.searchInputText
	};

	let suggestions: (string | number)[] = [];
	let showSuggestions = false;

	const handleSearch = async (event: Event) => {
		const input = event.target as HTMLInputElement;
		searchValue = input.value;
		// close suggestions if search is empty
		if (searchValue === '') {
			showSuggestions = false;
			suggestions = [];
			await setSearchValue(searchValue, false);
			return;
		}
		suggestions = dataList.filter((item) =>
			item
				.toString()
				.toLowerCase()
				.includes((searchValue ?? '').toString().toLowerCase())
		);
		showSuggestions = suggestions.length > 0;
		await setSearchValue(searchValue, false);
	};
</script>

<InputCard {styleClass} variant={cardVariant}>
	<div class="search-container">
		{#if showTitle}
			<div class={styles.rowWrapper}>
				<div class={styles.titleIcon}>
					<Text variant="small" text={title} />
				</div>
			</div>
		{/if}
		<div class="flex items-center">
			<input
				class={isTableFilter ? styles.inputSearch : styles.inputSearchBold}
				{placeholder}
				value={searchValue ?? ''}
				on:input={handleSearch}
				disabled={onlyFilters || disabled}
				on:click={() => onSearchClick?.()}
			/>
			<Select
				{title}
				{dataList}
				bind:value={searchValue}
				setValue={(value) => setSearchValue(value, true)}
				bind:showSuggestions
				bind:suggestions
				{textSuffix}
			/>
		</div>
	</div>
</InputCard>
