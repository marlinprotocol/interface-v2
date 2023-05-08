<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import CollapseButton from '../buttons/CollapseButton.svelte';

	export let dataList: (string | number)[] = [];
	export let title = '';
	export let value: string | number | undefined = '';
	export let setValue: ((value: string | number) => any) | undefined = undefined;
	export let showSuggestions = false;
	export let suggestions: (string | number)[] = [];
	export let id: string;
	let windowWidth: number;
	let searchContainer: HTMLDivElement;

	const handleClickOutside = (event: MouseEvent) => {
		if (searchContainer.contains(event.target as Node) == false) {
			showSuggestions = false;
		}
	};

	const handleToggleShowAllSuggestions = () => {
		suggestions = dataList;
		showSuggestions = !showSuggestions;
	};

	const handleSuggestionClick = async (suggestion: string | number) => {
		showSuggestions = false;
		value = suggestion;
		await setValue?.(suggestion);
	};

	function positionDropdown() {
		const button = document.getElementById(id);
		const dropdown = document.getElementById(id + '-dropdown');
		if (button && dropdown) {
			const buttonRect = button.getBoundingClientRect();
			const dropdownRect = dropdown.getBoundingClientRect();
			dropdown.style.left = `${buttonRect.right - dropdownRect.width}px`;
		}
	}

	// checks if the component is updated and then positions the dropdown
	afterUpdate(() => {
		const dropdown = document.getElementById(id + '-dropdown');
		if (dropdown) {
			positionDropdown();
		}
	});
</script>

<svelte:window on:click={handleClickOutside} bind:innerWidth={windowWidth} />

<div bind:this={searchContainer} class="w-fit search-container">
	<CollapseButton
		isOpen={showSuggestions}
		onclick={handleToggleShowAllSuggestions}
		disabled={dataList.length === 0}
		styleClass={buttonClasses.dropdownIcon}
		{id}
	/>
	{#if showSuggestions && suggestions.length > 0}
		<ul
			id={id + '-dropdown'}
			class={`absolute z-10 min-w-[150px] w-fit right-0 text-base bg-white rounded-md border border-gray-300 shadow-lg max-h-72 overflow-y-auto focus:outline-none sm:text-sm `}
		>
			<div class="flex justify-between px-8 py-4 items-center">
				<Text variant="small" styleClass="" fontWeight="font-semibold" text={title ?? 'Select'} />
			</div>
			{#each suggestions as suggestion}
				<li
					class={`px-8 py-3 cursor-pointer hover:bg-gray-100 text-left  ${
						suggestion === value ? 'bg-blue-50' : 'bg-white'
					}`}
					on:click={() => handleSuggestionClick(suggestion)}
					on:keydown={(event) => {
						if (event.key === 'Enter') {
							handleSuggestionClick(suggestion);
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
