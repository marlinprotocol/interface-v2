<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { getColorHexForTableRow } from '$lib/utils/constants/componentConstants';
	import { shortenText } from '$lib/utils/conversion';
	import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';

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

<div class="flex gap-4 items-center overflow-hidden">
	<div>
		{#if rowIndex > -1}
			<div
				class="ml-4 w-[32px] h-[32px] bg-primary rounded text-sm font-medium text-white flex flex-col justify-center"
				style="background-color:{bgColor};"
			>
				{startLetters}
			</div>
		{/if}
	</div>
	<div class="overflow-hidden">
		<Text variant="body" fontWeight="font-medium" text={name} styleClass="truncate" />
		<div class="flex gap-1 items-center">
			<Text
				variant={name ? 'tiny' : 'body'}
				styleClass={name ? 'text-grey' : ''}
				fontWeight={name ? 'font-normal' : 'font-medium'}
				text={shortenText(address, 6, 6)}
			/>
			<div on:keypress={onCopyAddress} on:click={onCopyAddress}>
				<slot name="copyIcon" />
			</div>
		</div>
	</div>
</div>
