<script lang="ts">
	import InputCard from '$lib/atoms/v2/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/v2/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import type { InputCardVariant } from '$lib/types/v2/componentTypes';
	import Select from '$lib/components/v2/select/Select.svelte';

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
	export let label = '';

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

<div class="relative flex flex-1 flex-col">
	{#if label}
		<p
			class="absolute left-[12px] top-[-10px] z-[1] mb-4 bg-white px-1 font-poppins text-sm font-normal text-[#030115]"
		>
			{label}
		</p>
	{/if}

	<InputCard styleClass="{styleClass} border border-[#D9DADE]" variant={cardVariant}>
		<div class="search-container">
			{#if showTitle}
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-1">
						<Text variant="small" text={title} />
					</div>
				</div>
			{/if}
			<div class="flex items-center">
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
	</InputCard>
</div>
