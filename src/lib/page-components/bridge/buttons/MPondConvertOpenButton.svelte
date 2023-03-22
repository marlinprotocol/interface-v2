<script lang="ts">
	import TableConvertButton from '$lib/components/buttons/TableConvertButton.svelte';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { mPondToPond, pondToMPond } from '$lib/utils/conversion';
	import MPondEligibleConvertModal from '../modals/MPondEligibleConvertModal.svelte';

	export let rowData: MPondToPondHistoryDataModel;
	export let handleUpdateData: (data: MPondToPondHistoryDataModel) => void;

	const { pondEligible, conversionHistory, mpondConverted, requestEpoch } = rowData;

	let showEligibleConvertDialog = false;
</script>

<MPondEligibleConvertModal
	maxAmount={pondToMPond(pondEligible)}
	{requestEpoch}
	bind:showEligibleConvertDialog
	handleOnSuccess={(convertedMPond, txnHash) => {
		console.log('handleOnSuccess 3 :>> ', convertedMPond, txnHash);
		const convertedPond = mPondToPond(convertedMPond);
		const updatedData = {
			...rowData,
			pondEligible: pondEligible.sub(convertedPond),
			mpondConverted: mpondConverted.add(convertedMPond),
			conversionHistory: [
				...conversionHistory,
				{
					id: txnHash,
					transactionHash: txnHash,
					mpondToConvert: convertedMPond,
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
