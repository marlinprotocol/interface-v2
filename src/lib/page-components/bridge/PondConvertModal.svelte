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

	const modalFor = 'pond-to-mpond-conversion-modal';
	const styles = {
		text: 'text-grey-500',
		highlight: 'text-secondary font-bold'
	};

	const handleApproveClick = async () => {
		console.log('approve');
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
		}
	};
	const handleConfirmClick = async () => {
		console.log('confirm');
		try {
			await convertPondToMpond(pond);
		} catch (error) {
			console.log(error);
		}
	};

	// TODO: use a util function to compute this
	$: mpond = pond.div(10 ** 6);
	$: approved = $bridgeStore.allowances.pond.gte(pond) || false;
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
		<span class={styles.highlight}>{`${bigNumberToCommaString(pond)} POND`}</span>
		<span>{'for conversion'}</span>
	</div>
	<div slot="confirmText" class={styles.text}>
		<span>{'Convert'}</span>
		<span class={styles.highlight}>{`${bigNumberToCommaString(pond)} POND`}</span>
		<span>{'to'}</span>
		<!-- TODO: check decimals and precision -->
		<span class={styles.highlight}>{`${bigNumberToCommaString(mpond, 6)} MPond`}</span>
	</div>
</ApproveAndConfirmModal>
