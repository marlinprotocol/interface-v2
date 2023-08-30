<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/modals/ApproveAndConfirmModal.svelte';
	import {
		bridgeStore,
		decreaseMpondAllowanceInBridgeStore,
		updateMpondAllowanceInBridgeStore
	} from '$lib/data-stores/bridgeStore';
	import {
		addPondToWalletBalanceStore,
		withdrawMpondFromWalletBalanceStore
	} from '$lib/data-stores/walletProviderStore';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import { mPondToPond } from '$lib/utils/helpers/conversionHelper';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import type { BigNumber } from 'ethers';
	import { onDestroy } from 'svelte';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { approveToken } from '$lib/controllers/contract-controllers/tokenContractController';
	import { confirmMPondConversion } from '$lib/controllers/contract-controllers/bridgeContractController';

	export let modalFor: string;
	export let rowIndex: number;
	export let requestEpoch: BigNumber;
	export let mpondToConvert: BigNumber;
	export let modalToClose: string;
	export let handleOnSuccess: (txnHash: string) => void;

	let amount = BIG_NUMBER_ZERO;
	let approved = false;
	const unsubscribeBridgeStore = bridgeStore.subscribe((value) => {
		amount = value.allowances.mPond;
	});
	onDestroy(unsubscribeBridgeStore);

	const handleApproveClick = async () => {
		try {
			await approveToken(
				$chainConfigStore.tokens.MPOND,
				mpondToConvert,
				$contractAddressStore.BRIDGE
			);
			// update bridge store locally in case when user approves amount greater than previous allowance
			updateMpondAllowanceInBridgeStore(mpondToConvert);
			approved = true;
		} catch (error) {
			console.log(error);
		}
	};

	let txnHash = '';
	const handleConfirmClick = async () => {
		try {
			const txn = await confirmMPondConversion(requestEpoch, mpondToConvert);
			if (txn) {
				withdrawMpondFromWalletBalanceStore(mpondToConvert);
				addPondToWalletBalanceStore(mPondToPond(mpondToConvert));
				decreaseMpondAllowanceInBridgeStore(mpondToConvert);
			}
			txnHash = txn.hash;
			closeModal(modalToClose);
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
	$: approved = amount.gte(mpondToConvert) || false;
</script>

<ApproveAndConfirmModal
	modalForApproveConfirm={modalFor}
	{handleApproveClick}
	{handleConfirmClick}
	handleSuccessFinishClick={() => {
		handleOnSuccess(txnHash);
	}}
	{approved}
	conversionFrom={'mPond'}
	amountConverted={mpondToConvert}
	confirmButtonText={'CONVERT'}
	{rowIndex}
/>
