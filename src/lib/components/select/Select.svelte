<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { onDestroy, onMount } from 'svelte';
	import CollapseButton from '../buttons/CollapseButton.svelte';

	export let dataList: (string | number)[] = [];
	export let title = '';
	export let value: string | number | undefined = '';
	export let setValue: ((value: string | number) => any) | undefined = undefined;
	export let showSuggestions = false;
	export let suggestions: (string | number)[] = [];

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

	const handleSuggestionClick = async (suggestion: string | number) => {
		showSuggestions = false;
		value = suggestion;
		await setValue?.(suggestion);
	};

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="relative search-container">
	{#if showSuggestions && suggestions.length > 0}
		<ul
			class="absolute z-10 min-w-[150px] w-fit right-0 text-base bg-white rounded-md border border-gray-300 shadow-lg max-h-72 overflow-y-auto focus:outline-none sm:text-sm"
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
	<CollapseButton
		isOpen={showSuggestions}
		onclick={handleToggleShowAllSuggestions}
		disabled={dataList.length === 0}
		styleClass={buttonClasses.dropdownIcon}
	/>
</div>
