<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approveMPondTokenForConversion,
		confirmMpondConversion
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { bigNumberToCommaString, bigNumberToString, mpondToPond } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';

	export let showDialog: boolean = false;
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
				value.allowances.mpond = mpondToConvert;
				return value;
			});
			approved = true;
		} catch (error) {
			console.log(error);
		}
	};
	const handleConfirmClick = async () => {
		console.log('confirm convertMPondToPond');
		try {
			const txn = await confirmMpondConversion(requestEpoch, mpondToConvert);
			handleOnSuccess(txn?.hash ?? '');
		} catch (error) {
			console.log(error);
		}
	};

	$: approved = $bridgeStore.allowances.mpond.gte(mpondToConvert) || false;
</script>

<ApproveAndConfirmModal
	bind:showDialog
	{handleApproveClick}
	{handleConfirmClick}
	{approved}
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
