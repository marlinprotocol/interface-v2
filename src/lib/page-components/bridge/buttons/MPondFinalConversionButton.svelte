<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import type { BigNumber } from 'ethers';
	import MPondApproveConfirmModal from '../modals/MPondApproveConfirmModal.svelte';

	export let inputAmount: BigNumber;
	export let submitEnable: boolean;
	export let handleOnSuccess: (txnHash: string) => void;
	export let requestEpoch: BigNumber;

	let showMpondApproveConfirmDialog: boolean = false;
</script>

<MPondApproveConfirmModal
	bind:showMpondApproveConfirmDialog
	{requestEpoch}
	mpondToConvert={inputAmount}
	{handleOnSuccess}
/>
<Button
	variant="filled"
	disabled={!submitEnable}
	onclick={() => {
		showMpondApproveConfirmDialog = true;
	}}
	size="large"
	styleClass={'btn-block'}
>
	PROCEED TO CONVERSION
</Button>
