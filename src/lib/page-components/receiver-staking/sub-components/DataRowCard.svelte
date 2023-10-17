<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS } from '$lib/utils/constants/constants';
	import { bigNumberToString } from '$lib/utils/helpers/conversionHelper';

	export let data: { title: string; value: bigint };
</script>

<div class="w-full">
	<div class="flex items-center justify-between">
		<div class="flex items-center">
			<Text variant="body" styleClass="text-black" text={data.title} />
			<slot name="icon" />
		</div>
		<Tooltip
			tooltipText={bigNumberToString(data.value, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS, false)}
		>
			<Text
				variant="body"
				styleClass="font-semibold text-right"
				text="{bigNumberToString(
					data.value,
					DEFAULT_CURRENCY_DECIMALS,
					POND_PRECISIONS,
					false
				)} POND"
			/>
		</Tooltip>
	</div>
</div>
