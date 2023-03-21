<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approveMPondTokenForConversion,
		confirmMpondConversion
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { bigNumberToCommaString, mpondToPond } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';

	export let showMpondApproveConfirmDialog: boolean = false;
	export let requestEpoch: BigNumber;
	export let mpondToConvert: BigNumber;
	export let handleOnSuccess: (txnHash: string) => void;

	const styles = {
		highlight: 'font-bold'
	};

	const handleApproveClick = async () => {
		console.log('approve convertPondToMpond');
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
		console.log('confirm convertMPondToPond');
		try {
			const txn = await confirmMpondConversion(requestEpoch, mpondToConvert);
			txnHash = txn.hash;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	$: approved = $bridgeStore.allowances.mPond.gte(mpondToConvert) || false;
</script>

<ApproveAndConfirmModal
	bind:showApproveConfirmDialog={showMpondApproveConfirmDialog}
	{handleApproveClick}
	{handleConfirmClick}
	handleSuccessFinishClick={() => {
		console.log('handleSuccessFinishClick 1 :>> ', txnHash);
		handleOnSuccess(txnHash);
	}}
	{approved}
	conversionFrom={'mPond'}
	amountConverted={mpondToConvert}
	confirmButtonText={'CONVERT'}
>
	<div slot="approveText">
		<span>{'Approve'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(mpondToConvert, 8)} MPond`}</span>
		<span>{'for conversion'}</span>
	</div>
	<div slot="confirmText">
		<span>{'Convert'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(mpondToConvert, 8)} MPond`}</span>
		<span>{'to'}</span>
		<span class={styles.highlight}>
			{`${bigNumberToCommaString(mpondToPond(mpondToConvert), 2)} Pond`}
		</span>
	</div>
</ApproveAndConfirmModal>
