<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import { approvePondTokenForConversion } from '$lib/controllers/contractController';
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
			approved = true;
		} catch (error) {
			console.log(error);
		}
	};
	const handleConfirmClick = async () => {
		console.log('confirm');
		// TODO: implement confirm
	};

	$: mpond = pond.div(10 ** 6);
	$: approved = false;
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
