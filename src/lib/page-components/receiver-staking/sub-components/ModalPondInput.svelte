<script lang="ts">
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import { dividerClasses } from '$lib/atoms/componentClasses';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import TooltipIcon from '$lib/atoms/tooltips/TooltipIcon.svelte';
	import type { InputCardVariant, ModalInputModel } from '$lib/types/componentTypes';

	export let title: ModalInputModel['title'];
	export let tooltipText: ModalInputModel['tooltipText'] = '';
	export let inputAmountString: string = '';
	export let maxAmountText: ModalInputModel['maxAmountText'] = 'Balance';
	export let maxAmountTooltipText: ModalInputModel['maxAmountTooltipText'] = '';
	export let handleUpdatedAmount: any = undefined;
	export let inputCardVariant: InputCardVariant = 'primary';

	const styles = {
		titleIcon: 'flex items-center gap-1',
		inputNumber: 'input input-ghost input-primary p-0 ml-0.5 placeholder:text-primary/[.2]'
	};
</script>

<InputCard variant={inputCardVariant}>
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
		<div class="flex items-center gap-2">
			<input
				disabled={!!!handleUpdatedAmount}
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
		{#if inputCardVariant !== 'none'}
			<Divider />
		{/if}
		{#if $$slots.inputMaxButton}
			<div class="flex items-center gap-2">
				<slot name="inputMaxButton" />
				<div class={dividerClasses.vertical} />
				<div class="flex gap-1">
					<Text variant="small" styleClass="text-gray-500" text={maxAmountText} />
					{#if !!maxAmountTooltipText}
						<TooltipIcon
							iconSrc={'./images/alert.svg'}
							iconWidth={16}
							tooltipText={maxAmountTooltipText}
							tooltipVariant="tooltip-secondary"
							tooltipDirection="tooltip-bottom"
						/>
					{/if}
				</div>
			</div>
		{/if}
	</form>
</InputCard>
