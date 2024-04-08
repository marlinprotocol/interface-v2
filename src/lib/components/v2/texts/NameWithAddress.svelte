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
	export let isCreditJob = false;

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

<div
	class="ml-4 flex w-fit items-center justify-start"
	data-testid="name-with-address"
	id="name-with-address"
>
	<div class="flex flex-col items-start">
		{#if name}
			<Tooltip tooltipText={name}>
				<Text
					variant="body"
					fontWeight="font-medium"
					text={name.length > 13 ? name.slice(0, 13).trim() + '...' : name}
					styleClass="truncate min-w-[112px]"
				/>
			</Tooltip>
			<div class="flex w-fit items-center gap-1">
				<Text
					variant="nav"
					styleClass="text-grey"
					fontWeight="font-normal"
					text={shortenText(address, 6, 6)}
				/>
				<button on:keypress={onCopyAddress} on:click={onCopyAddress}>
					<slot name="copyIcon" />
				</button>
			</div>
		{:else}
			<div class="flex w-fit min-w-[150px] items-center gap-1">
				<Text variant="nav" fontWeight="font-normal" text={shortenText(address, 6, 6)} />
				<button on:keypress={onCopyAddress} on:click={onCopyAddress}>
					<slot name="copyIcon" />
				</button>
			</div>
		{/if}
	</div>
</div>
