<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Dialog from '$lib/atoms/modals/Dialog.svelte';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import { BigNumberZero, mPondPrecisions, pondPrecisions } from '$lib/utils/constants/constants';
	import { bigNumberToCommaString, mPondToPond, pondToMPond } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';

	export let showSuccessConversionDialog: boolean = false;
	export let conversionFrom: 'pond' | 'mPond' = 'pond';
	export let amountConverted: BigNumber = BigNumberZero;
	export let handleSuccessFinishClick: (() => void) | undefined = undefined;

	$: conversionTo = conversionFrom === 'pond' ? 'mPond' : 'pond';
	$: amountConvertedTo =
		conversionFrom === 'pond' ? pondToMPond(amountConverted) : mPondToPond(amountConverted);
</script>

<Dialog bind:showDialog={showSuccessConversionDialog} closeOnOutsideClick={true}>
	<img slot="icon" src="/images/shield.svg" alt="" width="38px" />
	<svelte:fragment slot="title">
		{'Conversion Successful'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="text-left text-base font-medium text-gray-600">
			<div>You have converted</div>
			<div>
				<span class="font-bold text-black"
					>{bigNumberToCommaString(
						amountConverted,
						conversionFrom === 'pond' ? pondPrecisions : mPondPrecisions
					)}
					{conversionFrom.toUpperCase()}</span
				>
				to
				<span class="font-bold text-black"
					>{bigNumberToCommaString(
						amountConvertedTo,
						conversionFrom === 'pond' ? mPondPrecisions : pondPrecisions
					)}
					{conversionTo.toUpperCase()}</span
				>
			</div>
			<Divider margin="my-6" />
			<div>Updated Wallet Balance</div>
			<span class="font-bold text-black"
				>{bigNumberToCommaString($walletBalance.pond, pondPrecisions)} POND
			</span>|
			<span class="font-bold text-black">
				{bigNumberToCommaString($walletBalance.mPond, mPondPrecisions)} MPOND</span
			>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button onclick={handleSuccessFinishClick} variant="filled" size="large" styleClass="w-full"
			>FINISH
		</Button>
	</svelte:fragment>
</Dialog>
