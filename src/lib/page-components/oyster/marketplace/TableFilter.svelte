<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import Select from '$lib/components/select/Select.svelte';

	export let dataList: (string | number)[] = [];
	export let value: string | number | undefined = '';
	export let setValue: (value: string | number) => any;
	export let title: string;

	let suggestions: (string | number)[] = [];
	let showSuggestions = false;
</script>

<InputCard styleClass={'w-full'} variant={'search'}>
	<div class="search-container">
		<div class="flex gap-2 items-center justify-between">
			<Text variant="small" text={(value && value !== 'All' ? value : title).toString()} />
			<Select {title} {dataList} bind:value {setValue} bind:showSuggestions bind:suggestions />
		</div>
	</div>
</InputCard>
