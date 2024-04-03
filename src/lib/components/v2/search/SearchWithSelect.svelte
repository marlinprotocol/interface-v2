<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/v2/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import type { InputCardVariant } from '$lib/types/componentTypes';
	import Select from '$lib/components/v2/select/Select.svelte';
	import Button from '$lib/atoms/v2/buttons/Button.svelte';

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
	export let handleClearFilters: () => void = () => {};
	export let clearButton = false;

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

<div class="flex flex-1 flex-col">
	<p class="mb-4 font-poppins text-base font-light text-[#030115]">{placeholder}</p>
	<InputCard {styleClass} variant={cardVariant}>
		<div class="flex flex-1">
			<div class="search-container flex flex-1">
				{#if showTitle}
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-1">
							<Text variant="small" text={title} />
						</div>
					</div>
				{/if}
				<div class="flex flex-1 items-center">
					<input
						class="{isTableFilter
							? inputClasses.searchInputText
							: inputClasses.inputText} placeholder-[#A8A8A8]"
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
			{#if clearButton && handleClearFilters}
				<Button
					variant="filled"
					size="medium"
					styleClass="w-[140px] ml-4"
					onclick={handleClearFilters}>CLEAR</Button
				>
			{/if}
		</div>
	</InputCard>
</div>
