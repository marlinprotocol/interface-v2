<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import AmountInput from './AmountInput.svelte';

	export let title: string;
	export let disabled: boolean = false;
	export let inputAmountString: string = '';
	export let handleUpdatedAmount: any = undefined;
	export let prefix: string = '';
	export let suffix: string = '';

	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber: 'input input-ghost input-primary text-sm p-0 ml-0.5 placeholder:text-primary/[.2]',
		prefix: 'text-sm text-primary',
		suffix: 'text-sm text-primary ml-1'
	};
</script>

<InputCard variant={'primary-mini'}>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
	</div>
	<div class="flex items-center">
		<Text text={prefix} styleClass={styles.prefix} />
		<AmountInput
			styleClass={styles.inputNumber}
			{disabled}
			bind:value={inputAmountString}
			onChange={handleUpdatedAmount}
		/>
		<Text text={suffix} styleClass={styles.suffix} />
	</div>
</InputCard>
