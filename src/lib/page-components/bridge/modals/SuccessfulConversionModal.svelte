<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import {
		BIG_NUMBER_ZERO,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import { POND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';
	import {
		bigNumberToCommaString,
		mPondToPond,
		pondToMPond
	} from '$lib/utils/helpers/conversionHelper';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';

	export let modalFor: string;
	export let conversionFrom: 'pond' | 'mPond' = 'pond';
	export let amountConverted: BigNumber = BIG_NUMBER_ZERO;

	$: conversionTo = conversionFrom === 'pond' ? 'mPond' : 'pond';
	$: amountConvertedFrom = bigNumberToCommaString(
		amountConverted,
		conversionFrom === 'pond' ? POND_PRECISIONS : MPOND_PRECISIONS
	);
	$: amountConvertedTo =
		conversionFrom === 'pond' ? pondToMPond(amountConverted) : mPondToPond(amountConverted);
</script>

<Modal {modalFor}>
	<img slot="icon" src={staticImages.Sheild} alt="" width="38px" />
	<svelte:fragment slot="title">
		{'Conversion Successful'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="text-left text-base font-medium text-gray-600">
			<div>You have converted</div>
			<div>
				<span class="font-bold text-black"
					>{amountConvertedFrom}
					{conversionFrom.toUpperCase()}</span
				>
				to
				<span class="font-bold text-black"
					>{bigNumberToCommaString(
						amountConvertedTo,
						conversionFrom === 'pond' ? MPOND_PRECISIONS : POND_PRECISIONS
					)}
					{conversionTo.toUpperCase()}</span
				>
			</div>
			<Divider margin="my-6" />
			<div>Updated Wallet Balance</div>
			<span class="font-bold text-black"
				>{bigNumberToCommaString($walletBalance.pond, POND_PRECISIONS)} POND
			</span>|
			<span class="font-bold text-black">
				{bigNumberToCommaString($walletBalance.mPond, MPOND_PRECISIONS)} MPOND</span
			>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			onclick={() => {
				if (conversionFrom === 'pond') goto(POND_HISTORY_PAGE_URL);
				closeModal(modalFor);
			}}
			variant="filled"
			size="large"
			styleClass="w-full"
		>
			FINISH
		</Button>
	</svelte:fragment>
</Modal>
