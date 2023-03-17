<script lang="ts">
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { mpondToPond, pondToMpond } from '$lib/utils/conversion';
	import MpondEligibleConvertModal from '../modals/MpondEligibleConvertModal.svelte';

	export let rowData: MPondToPondHistoryDataModel;
	export let handleUpdateData: (data: MPondToPondHistoryDataModel) => void;

	const { pondEligible, conversionHistory, mpondConverted, requestEpoch } = rowData;

	let showEligibleConvertDialog: boolean = false;
</script>

<MpondEligibleConvertModal
	maxAmount={pondToMpond(pondEligible)}
	{requestEpoch}
	bind:showEligibleConvertDialog
	handleOnSuccess={(convertedMpond, txnHash) => {
		const convertedPond = mpondToPond(convertedMpond);
		const updatedData = {
			...rowData,
			pondEligible: pondEligible.sub(convertedPond),
			mpondConverted: mpondConverted.add(convertedMpond),
			conversionHistory: [
				...conversionHistory,
				{
					id: txnHash,
					transactionHash: txnHash,
					mpondToConvert: convertedMpond,
					timestamp: Math.floor(Date.now() / 1000)
				}
			]
		};
		handleUpdateData(updatedData);
	}}
/>
<TableConvertButton
	disabled={!pondEligible.gt(0)}
	onclick={() => (showEligibleConvertDialog = true)}
/>
