<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';
	import { getColorHexForTableRow } from '$lib/utils/helpers/componentHelper';

	export let name = '';
	export let address = '';
	export let rowIndex = -1;

	const onCopyAddress = () => {
		copyTextToClipboard(address);
		addToast({
			message: `Address copied to clipboard`,
			variant: 'success'
		});
	};

	//get first 2 letters of name or address if name is empty
	const startLetters = name ? name.slice(0, 2) : address.slice(0, 2);
	const bgColor = getColorHexForTableRow(rowIndex);
</script>

<div class="ml-6 flex w-fit items-center justify-start">
	<div>
		{#if rowIndex > -1}
			<div
				class="mr-3 flex h-[32px] w-[32px] flex-col items-center justify-center rounded-md bg-primary text-sm font-medium text-white"
				style="background-color:{bgColor};"
			>
				{startLetters}
			</div>
		{/if}
	</div>
	<div>
		{#if name}
			<Tooltip tooltipText={name}>
				<Text
					variant="body"
					fontWeight="font-medium"
					text={name.length > 13 ? name.slice(0, 13).trim() + '...' : name}
					styleClass="truncate"
				/>
			</Tooltip>
		{/if}

		<div class="flex w-fit items-center gap-1">
			<Text
				variant={name ? 'tiny' : 'body'}
				styleClass={name ? 'text-grey' : ''}
				fontWeight={name ? 'font-normal' : 'font-medium'}
				text={shortenText(address, 6, 6)}
			/>
			<button on:keypress={onCopyAddress} on:click={onCopyAddress}>
				<slot name="copyIcon" />
			</button>
		</div>
	</div>
</div>
