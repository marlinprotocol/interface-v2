<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { walletBalanceStore } from '$lib/data-stores/walletProviderStore';
	import {
		DEFAULT_CURRENCY_DECIMALS,
		MPOND_PRECISIONS,
		POND_PRECISIONS
	} from '$lib/utils/constants/constants';
	import { bigNumberToString, mPondToPond, pondToMPond } from '$lib/utils/helpers/conversionHelper';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import { ROUTES } from '$lib/utils/constants/urls';
	import { removeTrailingZeros } from '$lib/utils/helpers/commonHelper';

	export let modalFor: string;
	export let conversionFrom: 'pond' | 'mPond' = 'pond';
	export let amountConverted = 0n;

	$: conversionTo = conversionFrom === 'pond' ? 'mPond' : 'pond';
	$: amountConvertedFrom = removeTrailingZeros(
		bigNumberToString(amountConverted, DEFAULT_CURRENCY_DECIMALS, 18)
	);
	$: amountConvertedTo =
		conversionFrom === 'pond' ? pondToMPond(amountConverted) : mPondToPond(amountConverted);
</script>

<Modal {modalFor}>
	<svelte:fragment slot="successmsg">Conversion Successful</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-6 text-lg font-light text-[#26272C]">
			<div class="whitespace-normal rounded-xl border border-[#D9DADE] p-4">
				<div>You have converted</div>
				<div>
					<span class="font-bold text-black"
						>{amountConvertedFrom}
						{conversionFrom.toUpperCase()}</span
					>
					to
					<span class="font-bold text-black"
						>{removeTrailingZeros(
							bigNumberToString(amountConvertedTo, DEFAULT_CURRENCY_DECIMALS, 18)
						)}
						{conversionTo.toUpperCase()}</span
					>
				</div>
			</div>

			<div class="whitespace-normal rounded-xl border border-[#D9DADE] p-4">
				<div>Updated Wallet Balance</div>
				<span class="font-bold text-black"
					>{removeTrailingZeros(
						bigNumberToString($walletBalanceStore.pond, DEFAULT_CURRENCY_DECIMALS, 18)
					)}
					POND
				</span>|
				<span class="font-bold text-black">
					{removeTrailingZeros(
						bigNumberToString($walletBalanceStore.mpond, DEFAULT_CURRENCY_DECIMALS, 18)
					)} MPond</span
				>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			onclick={() => {
				if (conversionFrom === 'pond') goto(ROUTES.POND_HISTORY_PAGE_URL);
				closeModal(modalFor);
			}}
			variant="filled"
			size="large"
			styleClass="w-full"
		>
			Finish
		</Button>
	</svelte:fragment>
</Modal>
