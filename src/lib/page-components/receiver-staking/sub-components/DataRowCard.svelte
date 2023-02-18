<script lang="ts">
	import Text from '$lib/atoms/texts/Text.svelte';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
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
		<Text
			variant="body"
			styleClass="font-semibold text-right"
			text={`${bigNumberToCommaString(data.value)} POND`}
		/>
	</div>
</div>
