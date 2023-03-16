<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { MPondToPondHistoryDataModel } from '$lib/types/bridgeComponentType';
	import { mpondToPond, pondToMpond } from '$lib/utils/conversion';
	import MpondEligibleConvertModal from '../modals/MpondEligibleConvertModal.svelte';

	export let rowData: MPondToPondHistoryDataModel;
	export let handleUpdateData: (data: MPondToPondHistoryDataModel) => void;

	const { pondEligible, conversionHistory, mpondConverted, requestEpoch } = rowData;

	let showModal: boolean = false;
</script>

<MpondEligibleConvertModal
	maxAmount={pondToMpond(pondEligible)}
	{requestEpoch}
	bind:showModal
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
<Button
	disabled={!pondEligible.gt(0)}
	variant="filled"
	styleClass={buttonClasses.convertButton}
	onclick={() => {
		showModal = true;
	}}
>
	CONVERT
</Button>
