<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approveMPondTokenForConversion,
		confirmMPondConversion
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	export let modalFor: string;
	export let requestEpoch: BigNumber;
	export let mpondToConvert: BigNumber;
	export let modalToClose: string;
	export let handleOnSuccess: (txnHash: string) => void;

	let approved: boolean = false;
	const unsubscribeBridgeStore = bridgeStore.subscribe((value) => {
		const amount = value.allowances.mPond;
		approved = amount.gte(mpondToConvert) || false;
	});
	onDestroy(unsubscribeBridgeStore);

	const handleApproveClick = async () => {
		try {
			await approveMPondTokenForConversion(mpondToConvert);
			// update bridge store locally in case when user approves amount greater than previous allowance
			bridgeStore.update((value) => {
				value.allowances.mPond = mpondToConvert;
				return value;
			});
			approved = true;
		} catch (error) {
			console.log(error);
		}
	};

	let txnHash = '';
	const handleConfirmClick = async () => {
		try {
			const txn = await confirmMPondConversion(requestEpoch, mpondToConvert);
			txnHash = txn.hash;
			closeModal(modalToClose);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
</script>

<ApproveAndConfirmModal
	modalForApproveConfirm={modalFor}
	{handleApproveClick}
	{handleConfirmClick}
	handleSuccessFinishClick={() => {
		handleOnSuccess(txnHash);
	}}
	{approved}
	conversionFrom={'mPond'}
	amountConverted={mpondToConvert}
	confirmButtonText={'CONVERT'}
/>
