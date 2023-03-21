<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import { bigNumberToCommaString, mpondToPond, pondToMpond } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';

	export let showSuccessConversionDialog: boolean = false;
	export let conversionFrom: 'pond' | 'mPond' = 'pond';
	export let amountConverted: BigNumber = BigNumber.from(0);
	export let handleSuccessFinishClick: (() => void) | undefined = undefined;

	$: conversionTo = conversionFrom === 'pond' ? 'mPond' : 'pond';
	$: amountConvertedTo =
		conversionFrom === 'pond' ? pondToMpond(amountConverted) : mpondToPond(amountConverted);
</script>

<Dialog bind:showDialog={showSuccessConversionDialog}>
	<img slot="icon" src="/images/shield.svg" alt="" width="38px" />
	<svelte:fragment slot="title">
		{'Conversion Successful'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="text-left text-base font-medium text-gray-600">
			<div>You have converted</div>
			<div>
				<span class="font-bold text-black"
					>{bigNumberToCommaString(amountConverted, 8)}
					{conversionFrom.toUpperCase()}</span
				>
				to
				<span class="font-bold text-black"
					>{bigNumberToCommaString(amountConvertedTo, 8)}
					{conversionTo.toUpperCase()}</span
				>
			</div>
			<Divider margin="my-6" />
			<div>Updated Wallet Balance</div>
			<span class="font-bold text-black"
				>{bigNumberToCommaString($walletBalance.pond, 8)} POND
			</span>|
			<span class="font-bold text-black">
				{bigNumberToCommaString($walletBalance.mPond, 8)} MPOND</span
			>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button onclick={handleSuccessFinishClick} variant="filled" size="large" styleClass="w-full"
			>FINISH
		</Button>
	</svelte:fragment>
</Dialog>
