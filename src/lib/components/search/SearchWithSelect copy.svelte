<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import { onMount } from 'svelte';
	import search from 'svelte-awesome/icons/search';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import CollapseButton from '../buttons/CollapseButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';

	export const dataList: string[] = [
		'data 1',
		'data 2',
		'data 3',
		'data 4',
		'data 5',
		'ADVV',
		'cdsjkv',
		'cdsbjkcnkdsj',
		'cdsjkcnkdsj',
		'fierdss',
		'Aaaa',
		'asdaaaa'
	];
	const dispatch = createEventDispatcher();

	let searchTerm: string = '';
	let suggestions: string[] = [];
	let showSuggestions: boolean = false;

	const handleSearch = (event: any) => {
		const input = event.target as HTMLInputElement;
		searchTerm = input.value;
		// TODO: implement the logic to fetch suggestions
		suggestions = dataList.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

		showSuggestions = suggestions.length > 0;
		dispatch('search', searchTerm);
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
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="relative search-container">
	<div class="input-group items-center">
		<input
			type="text"
			class="input-ghost w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
			placeholder="Search"
			value={searchTerm}
			on:input={handleSearch}
		/>
		<CollapseButton isOpen={showSuggestions} onclick={handleToggleShowAllSuggestions} />
	</div>

	<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
		<Icon data={search} size={18} iconColorClass={'icon-info'} />
	</div>

	{#if showSuggestions && suggestions.length > 0}
		<ul
			class="absolute z-10 w-56 right-0 text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto focus:outline-none sm:text-sm"
		>
			<div class="flex justify-between mx-6 my-2 items-center">
				<Text variant="small" styleClass="" fontWeight="font-semibold" text={`Filter`} />
				<div class="flex gap-2">
					<Button variant="text" size="small">Select All</Button>
					<Button variant="text" size="small">Clear</Button>
				</div>
			</div>
			{#each suggestions as suggestion}
				<li
					class={`px-6 py-3 cursor-pointer hover:bg-gray-100 text-left  ${
						suggestion === searchTerm ? 'bg-blue-50' : 'bg-white'
					}`}
					on:click={() => handleSearchSuggestionClick(suggestion)}
					on:keydown={(event) => {
						if (event.key === 'Enter') {
							handleSearchSuggestionClick(suggestion);
						}
					}}
				>
					<div class="flex items-center">
						<label for="checkbox-item-12" class={`w-full ml-2 text-sm font-medium`}>
							{suggestion}
						</label>
						<input
							checked={false}
							id="checkbox-item-12"
							type="checkbox"
							value=""
							class="w-5 h-5 text-blue-600 rounded"
						/>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
