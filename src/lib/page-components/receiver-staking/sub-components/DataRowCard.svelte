<script lang="ts">
	import Text from '$lib/components/texts/Text.svelte';
	import type { ReceiverStakedDataModel } from '$lib/types/receiverStakingTypes';
	import { bigNumbertoString } from '$lib/utils/conversion';

	export let data: ReceiverStakedDataModel;
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
			styleClass="text-primary font-medium"
			text={`${bigNumbertoString(data.value)} POND`}
		/>
	</div>
</div>
