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
			<Text variant="body" styleClass="text-gray-500" text={data.title} />
			<slot name="icon" />
		</div>
		<Text
			variant="h5"
			styleClass="text-primary font-medium text-right"
			text={`${bigNumberToCommaString(data.value)} POND`}
		/>
	</div>
</div>
