<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { dividerClasses } from '$lib/atoms/componentClasses';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { ModalInputModel } from '$lib/types/componentTypes';

	export let title: ModalInputModel['title'];
	export let tooltipText: ModalInputModel['tooltipText'] = '';
	export let inputAmountString: string = '';
	export let maxAmountText: ModalInputModel['maxAmountText'] = 'Balance';
	export let handleUpdatedAmount: (event: Event) => void;

	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber:
			'font-orbitron input input-ghost w-full p-0 ml-0.5 font-semibold text-xl text-primary placeholder:text-primary/[.2] focus-within:text-primary focus:outline-none focus-within:border-b-2 focus:bg-transparent'
	};
</script>

<InputCard>
	<div class={styles.titleIcon}>
		<Text variant="small" text={title} />
		{#if !!tooltipText}
			<TooltipIcon
				{tooltipText}
				tooltipVariant="tooltip-secondary"
				tooltipDirection="tooltip-right"
			/>
		{/if}
	</div>
	<form>
		<div class="flex items-center">
			<input
				bind:value={inputAmountString}
				on:input={handleUpdatedAmount}
				id="pond-input-amount"
				class={`hideInputNumberAppearance ${styles.inputNumber}`}
				placeholder="0.00"
				autocomplete="off"
				on:keydown={(e) => {
					// user can only enter numbers and one decimal point
					if (
						(e.key >= '0' && e.key <= '9') ||
						(e.key == '.' && !inputAmountString.includes('.')) ||
						e.key == 'Backspace' ||
						e.key == 'Delete'
					) {
						return true;
					} else {
						e.preventDefault();
					}
				}}
			/>
			<slot name="input-end-button" />
		</div>
		<Divider />
		<div class="flex items-center gap-2">
			<slot name="input-max-button" />
			<div class={dividerClasses.vertical} />
			<Text variant="small" styleClass="text-gray-500" text={maxAmountText} />
		</div>
	</form>
</InputCard>
