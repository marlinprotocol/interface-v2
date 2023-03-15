<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approveMPondTokenForConversion,
		confirmMpondConversion
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';

	export let modalFor: string;
	export let requestEpoch: string;
	export let mpondToConvert: BigNumber;
	export let handleOnSuccess: (convertedMpond: BigNumber, txnHash: string) => void;

	const styles = {
		text: 'text-grey-500',
		highlight: 'text-secondary font-bold'
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
			const txn = await confirmMpondConversion(BigNumber.from(requestEpoch), mpondToConvert);
			handleOnSuccess(mpondToConvert, txn?.hash ?? '');
		} catch (error) {
			console.log(error);
		}
	};

	$: approved = $bridgeStore.allowances.mpond.gte(mpondToConvert) || false;
</script>

<ApproveAndConfirmModal
	{modalFor}
	{handleApproveClick}
	{handleConfirmClick}
	{approved}
	confirmButtonText={'CONVERT'}
>
	<div slot="approveText" class={styles.text}>
		<span>{'Approve'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(mpondToConvert, 8)} MPond`}</span>
		<span>{'for conversion'}</span>
	</div>
	<div slot="confirmText" class={styles.text}>
		<span>{'Convert'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(mpondToConvert, 8)} MPond`}</span>
		<span>{'to'}</span>
		<!-- TODO: check decimals and precision -->
		<span class={styles.highlight}>{`${bigNumberToCommaString(mpondToConvert, 8)} MPond`}</span>
	</div>
</ApproveAndConfirmModal>
