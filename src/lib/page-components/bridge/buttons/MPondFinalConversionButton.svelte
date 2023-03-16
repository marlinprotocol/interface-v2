<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import type { BigNumber } from 'ethers';
	import MPondConvertModal from '../modals/MPondConvertModal.svelte';

	export let inputAmount: BigNumber;
	export let submitEnable: boolean;
	export let handleOnSuccess: (txnHash: string) => void;
	export let requestEpoch: BigNumber;

	let showDialog: boolean = false;
</script>

<MPondConvertModal bind:showDialog {requestEpoch} mpondToConvert={inputAmount} {handleOnSuccess} />
<Button
	variant="filled"
	disabled={!submitEnable}
	onclick={() => {
		showDialog = true;
	}}
	size="large"
	styleClass={'btn-block'}
>
	PROCEED TO CONVERSION
</Button>
