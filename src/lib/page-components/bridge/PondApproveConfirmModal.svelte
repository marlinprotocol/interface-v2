<script lang="ts">
	import { goto } from '$app/navigation';
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approvePondTokenForConversion,
		convertPondToMPond
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { mPondPrecisions, pondPrecisions } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString, mPondToPond } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';

	export let pond: BigNumber;
	export let showPondApproveConfirmDialog: boolean = false;

	const styles = {
		highlight: 'font-semibold'
	};

	const handleApproveClick = async () => {
		console.log('approve convertPondToMPond');
		try {
			await approvePondTokenForConversion(pond);
			// update bridge store locally in case when user approves amount greater than previous allowance
			bridgeStore.update((value) => {
				value.allowances.pond = pond;
				return value;
			});
			approved = true;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
	const handleConfirmClick = async () => {
		console.log('confirm convertPondToMPond');
		try {
			await convertPondToMPond(mPond);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	$: mPond = mPondToPond(pond);
	$: approved = $bridgeStore.allowances.pond.gte(pond) || false;
</script>

<ApproveAndConfirmModal
	bind:showApproveConfirmDialog={showPondApproveConfirmDialog}
	{handleApproveClick}
	{handleConfirmClick}
	handleSuccessFinishClick={() => goto('/bridge/pondToMPondHistory')}
	{approved}
	conversionFrom={'pond'}
	amountConverted={pond}
	confirmButtonText={'CONVERT'}
>
	<div slot="approveText">
		<span>{'Approve'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(pond, pondPrecisions)} POND`}</span>
		<span>{'for conversion'}</span>
	</div>
	<div slot="confirmText">
		<span>{'Convert'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(pond, pondPrecisions)} POND`}</span>
		<span>{'to'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(mPond, mPondPrecisions)} MPond`}</span
		>
	</div>
</ApproveAndConfirmModal>
