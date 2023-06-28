<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		approvePondTokenForConversion,
		convertPondToMPond
	} from '$lib/controllers/contractController';
	import { bridgeStore } from '$lib/data-stores/bridgeStore';
	import { walletBalance } from '$lib/data-stores/walletProviderStore';
	import { pondToMPond } from '$lib/utils/helpers/conversionHelper';
	import { doNothing } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';

	export let pond: BigNumber;
	export let modalFor: string;

	let approved = false;
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
			const txn = await convertPondToMPond(mPond);
			// update wallet balance for pond
			if (txn) {
				walletBalance.update((value) => {
					value.pond = value.pond.sub(pond);
					value.mPond = value.mPond.add(mPond);
					return value;
				});
				bridgeStore.update((value) => {
					value.allowances.pond = value.allowances.pond.sub(pond);
					return value;
				});
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
</script>

<ApproveAndConfirmModal
	modalForApproveConfirm={modalFor}
	rowIndex={0}
	{handleApproveClick}
	{handleConfirmClick}
	handleSuccessFinishClick={() => {
		doNothing();
	}}
	{approved}
	conversionFrom={'pond'}
	amountConverted={pond}
	confirmButtonText={'CONVERT'}
/>
