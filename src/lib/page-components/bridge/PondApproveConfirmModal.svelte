<script lang="ts">
	import { goto } from '$app/navigation';
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approvePondTokenForConversion,
		convertPondToMPond
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { kPondHistoryPage } from '$lib/utils/constants/bridgeConstants';
	import { pondToMPond } from '$lib/utils/conversion';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	export let pond: BigNumber;
	export let modalFor: string;

	let approved: boolean = false;
	const unsubscribeBridgeStore = bridgeStore.subscribe((value) => {
		const amount = value.allowances.pond;
		approved = amount.gte(pond) || false;
	});
	onDestroy(unsubscribeBridgeStore);

	$: mPond = pondToMPond(pond);
	$: approved = $bridgeStore.allowances.pond.gte(pond) || false;

	const handleApproveClick = async () => {
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
			throw error;
		}
	};
	const handleConfirmClick = async () => {
		try {
			await convertPondToMPond(mPond);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
</script>

<ApproveAndConfirmModal
	modalForApproveConfirm={modalFor}
	{handleApproveClick}
	{handleConfirmClick}
	handleSuccessFinishClick={() => {
		goto(kPondHistoryPage);
	}}
	{approved}
	conversionFrom={'pond'}
	amountConverted={pond}
	confirmButtonText={'CONVERT'}
/>
