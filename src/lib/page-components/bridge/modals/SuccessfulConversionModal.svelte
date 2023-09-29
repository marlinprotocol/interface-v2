<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import {
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import { POND_HISTORY_PAGE_URL } from '$lib/utils/constants/urls';
	import { bigNumberToString, mPondToPond, pondToMPond } from '$lib/utils/helpers/conversionHelper';
	import { closeModal } from '$lib/utils/helpers/commonHelper';

	export let modalFor: string;
	export let conversionFrom: 'pond' | 'mPond' = 'pond';
	export let amountConverted = 0n;

	$: conversionTo = conversionFrom === 'pond' ? 'mPond' : 'pond';
	$: amountConvertedFrom = bigNumberToString(
		amountConverted,
		DEFAULT_CURRENCY_DECIMALS,
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
					>{bigNumberToString(
						amountConvertedTo,
						DEFAULT_CURRENCY_DECIMALS,
						conversionFrom === 'pond' ? MPOND_PRECISIONS : POND_PRECISIONS
					)}
					{conversionTo.toUpperCase()}</span
				>
			</div>
			<Divider margin="my-6" />
			<div>Updated Wallet Balance</div>
			<span class="font-bold text-black"
				>{bigNumberToString($walletBalanceStore.pond, DEFAULT_CURRENCY_DECIMALS, POND_PRECISIONS)} POND
			</span>|
			<span class="font-bold text-black">
				{bigNumberToString($walletBalanceStore.mpond, DEFAULT_CURRENCY_DECIMALS, MPOND_PRECISIONS)} MPOND</span
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
