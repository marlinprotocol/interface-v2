<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import { copyTextToClipboard } from '$lib/utils/helpers/commonHelper';

	export let name = '';
	export let address = '';
	export let long: boolean = false;
	export let table:
		| 'inventory'
		| 'inventory-history'
		| 'marketplace'
		| 'operator'
		| 'operator-hitory' = 'marketplace';

	const isOneOfInventoryTables = table === 'inventory' || table === 'inventory-history';

	const onCopyAddress = () => {
		copyTextToClipboard(address);
		addToast({
			message: {
				title: 'Copied',
				description: `${isOneOfInventoryTables ? 'Id' : 'Address'} copied to clipboard`
			},
			variant: 'success'
		});
	};

	let addressText = shortenText(address, long ? 10 : 6, long ? 10 : 6);
</script>

<div
	class="ml-4 flex w-fit items-center justify-start"
	data-testid="name-with-address"
	id="name-with-address"
>
	<div class="flex flex-col items-start">
		{#if name}
			<Tooltip placement="right">
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
					bind:text={addressText}
				/>
				<button on:keypress={onCopyAddress} on:click={onCopyAddress}>
					<slot name="copyIcon" />
				</button>
			</div>
		{:else}
			<div class="flex w-fit min-w-[150px] items-center gap-1">
				<Text variant="nav" fontWeight="font-normal" text={addressText} />
				<button on:keypress={onCopyAddress} on:click={onCopyAddress}>
					<slot name="copyIcon" />
				</button>
			</div>
		{/if}
	</div>
</div>
