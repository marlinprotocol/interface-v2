<script lang="ts">
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToCommaString,
		bigNumberToString,
		epochToDurationString
	} from '$lib/utils/conversion';

	export let jobData: OysterInventoryDataModel;

	const { currency, decimal } = kOysterRateMetaData;
	$: ({ balance, durationLeft } = jobData);

	const styles = {
		textPrimary: 'text-primary '
	};
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<div class="w-full">
			<TextInputCard
				title={'Current Balance'}
				value={`${bigNumberToString(balance, decimal)} ${currency}`}
				centered
				textStyle={styles.textPrimary}
			/>
		</div>
		<div class="w-full">
			<TextInputCard
				title={'Duration Left'}
				value={durationLeft === 0 ? 'Ended' : epochToDurationString(durationLeft, false, true)}
				centered
				textStyle={styles.textPrimary}
			/>
		</div>
	</div>
</div>
