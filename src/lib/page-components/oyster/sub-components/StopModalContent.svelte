<script lang="ts">
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import { oysterTokenMetadataStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';

	export let jobData: OysterInventoryDataModel;

	$: ({ balance, durationLeft } = jobData);
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<div class="w-full">
			<TextInputCard
				title="Current Balance"
				value="{bigNumberToString(
					balance,
					$oysterTokenMetadataStore.decimal
				)} {$oysterTokenMetadataStore.currency}"
				centered
				textStyle="text-primary"
			/>
		</div>
		<div class="w-full">
			<TextInputCard
				title="Duration Left"
				value={durationLeft === 0 ? 'Ended' : epochToDurationString(durationLeft, false)}
				centered
				textStyle="text-primary"
			/>
		</div>
	</div>
</div>
