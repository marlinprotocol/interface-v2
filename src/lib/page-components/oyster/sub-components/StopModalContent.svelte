<script lang="ts">
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { bigNumberToString, epochToDurationString } from '$lib/utils/helpers/conversionHelper';

	export let jobData: OysterInventoryDataModel;

	const styles = {
		textPrimary: 'text-primary'
	};

	$: oysterToken = $chainConfigStore.oyster_token;
	$: oysterTokenMetadata =
		$chainConfigStore.tokens[oysterToken as keyof typeof $chainConfigStore.tokens];
	$: ({ balance, durationLeft } = jobData);
</script>

<div class="flex flex-col gap-4">
	<div class="flex gap-4">
		<div class="w-full">
			<TextInputCard
				title={'Current Balance'}
				value={`${bigNumberToString(balance, oysterTokenMetadata.decimal)} ${
					oysterTokenMetadata.currency
				}`}
				centered
				textStyle={styles.textPrimary}
			/>
		</div>
		<div class="w-full">
			<TextInputCard
				title={'Duration Left'}
				value={durationLeft === 0 ? 'Ended' : epochToDurationString(durationLeft, false, false)}
				centered
				textStyle={styles.textPrimary}
			/>
		</div>
	</div>
</div>
