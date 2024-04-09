<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import AmountInput from '$lib/components/v2/inputs/AmountInput.svelte';

	export let title: string;
	export let disabled = false;
	export let inputAmountString = '';
	export let handleUpdatedAmount = (e: Event) => {};
	export let onFocusOut = () => {};
	export let prefix = '';
	export let suffix = '';
	export let onlyInteger = false;
</script>

<InputCard>
	<div class="flex items-center gap-1">
		<Text variant="small" text={title} />
	</div>
	<div class="flex items-center">
		<Text text={prefix} styleClass="text-sm text-primary mt-1" />
		<AmountInput
			bind:value={inputAmountString}
			onChange={handleUpdatedAmount}
			styleClass="input input-ghost input-primary text-sm p-0 ml-0.5 placeholder:text-primary/[.2] h-[30px] mt-1"
			{onFocusOut}
			{onlyInteger}
			{disabled}
		/>
		<Text text={suffix} styleClass="text-sm text-primary ml-1 mt-1" />
		<slot name="endButton" />
	</div>
</InputCard>
