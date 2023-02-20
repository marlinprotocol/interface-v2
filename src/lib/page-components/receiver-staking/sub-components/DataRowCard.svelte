<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import Tooltip from '$lib/atoms/tooltips/Tooltip.svelte';
	import { bigNumberToCommaString, bigNumberToString } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';

	export let data: { title: string; value: BigNumber };
	const styles = {
		itemCard: 'w-full',
		dataRow: 'flex items-center justify-between',
		titleIcon: 'flex items-center'
	};
</script>

<div class={styles.itemCard}>
	<div class={styles.dataRow}>
		<div class={styles.titleIcon}>
			<Text variant="body" styleClass="text-black" text={data.title} />
			<slot name="icon" />
		</div>
		<Tooltip tooltipText={bigNumberToString(data.value)}>
			<Text
				variant="body"
				styleClass="font-semibold text-right"
				text={`${bigNumberToCommaString(data.value)} POND`}
			/>
		</Tooltip>
	</div>
</div>
