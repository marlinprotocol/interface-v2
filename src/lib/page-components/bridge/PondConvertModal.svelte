<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approvePondTokenForConversion,
		convertPondToMpond
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { bigNumberToCommaString } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';

	export let pond: BigNumber;
	export let showDialog: boolean = false;

	const styles = {
		highlight: 'font-semibold'
	};

	const handleApproveClick = async () => {
		console.log('approve convertPondToMpond');
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
		console.log('confirm convertPondToMpond');
		try {
			await convertPondToMpond(mpond);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	// TODO: use a util function to compute this
	$: mpond = pond.div(10 ** 6);
	$: approved = $bridgeStore.allowances.pond.gte(pond) || false;
</script>

<ApproveAndConfirmModal
	bind:showDialog
	{handleApproveClick}
	{handleConfirmClick}
	{approved}
	conversionFrom={'pond'}
	amountConverted={pond}
	confirmButtonText={'CONVERT'}
>
	<div slot="approveText">
		<span>{'Approve'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(pond)} POND`}</span>
		<span>{'for conversion'}</span>
	</div>
	<div slot="confirmText">
		<span>{'Convert'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(pond)} POND`}</span>
		<span>{'to'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(mpond, 6)} MPond`}</span>
	</div>
</ApproveAndConfirmModal>
