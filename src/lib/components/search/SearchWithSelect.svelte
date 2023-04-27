<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { inputClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import type { InputCardVariant } from '$lib/types/componentTypes';
	import Select from '../select/Select.svelte';

	export let dataList: (string | number)[] = [];
	export let searchValue: string | number | undefined = '';
	export let setSearchValue: (value: string | number) => any;
	export let onSearchClick: (() => void) | undefined = undefined;

	export let title: string;
	export let showTitle = true;
	export let onlyFilters = false;
	export let placeholder = 'Search';
	export let styleClass = '';
	export let cardVariant: InputCardVariant | undefined = 'primary';

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
					<Text variant="small" text={title} />
				</div>
			</div>
		{/if}
		<div class="input-group items-center">
			<input
				class={styles.inputSearch}
				{placeholder}
				value={searchValue ?? ''}
				on:input={handleSearch}
				disabled={onlyFilters}
				on:click={(e) => onSearchClick?.()}
			/>
			<Select
				{dataList}
				bind:value={searchValue}
				setValue={setSearchValue}
				bind:showSuggestions
				bind:suggestions
			/>
		</div>
	</div>
</InputCard>
