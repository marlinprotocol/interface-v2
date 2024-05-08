<script lang="ts">
	import Text from '$lib/atoms/v2/texts/Text.svelte';
	import Tooltip from '$lib/atoms/v2/tooltips/Tooltip.svelte';
	import { addToast } from '$lib/data-stores/v2/toastStore';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';
	import { getColorHexForTableRow } from '$lib/utils/v2/helpers/componentHelper';

	export let name = '';
	export let address = '';
	export let rowIndex = -1;

	const onCopyAddress = () => {
		copyTextToClipboard(address);
		addToast({
			message: {
				title: 'Copied',
				description: `Address copied to clipboard`
			},
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
			<Tooltip>
				<span slot="tooltipContent">{name}</span>
				<Text
					slot="tooltipIcon"
					variant="mini"
					fontWeight="font-normal"
					text={name.length > 13 ? name.slice(0, 13).trim() + '...' : name}
					styleClass="truncate w-min"
				/>
			</Tooltip>
			<div class="mt-1 flex w-fit items-center gap-1">
				<Text
					variant="tiny"
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
