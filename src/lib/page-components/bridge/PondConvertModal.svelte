<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import { bigNumberToCommaString, bigNumberToString } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';

	const modalFor = 'pond-to-mpond-conversion-modal';

	const styles = {
		text: 'text-grey-500',
		highlight: 'text-secondary font-bold'
	};

	export let pond: BigNumber;
	$: mpond = pond.div(10 ** 6);

	const handleApproveClick = async () => {
		console.log('approve');
		// TODO: implement approve
		approved = true;
	};
	const handleConfirmClick = async () => {
		console.log('confirm');
		// TODO: implement confirm
	};
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
