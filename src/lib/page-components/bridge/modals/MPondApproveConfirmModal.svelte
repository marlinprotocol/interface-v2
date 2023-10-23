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
	import { mPondToPond } from '$lib/utils/helpers/conversionHelper';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { confirmMPondConversion } from '$lib/controllers/contract/bridge';
	import { approveToken } from '$lib/controllers/contract/token';

	export let modalFor: string;
	export let rowIndex: number;
	export let requestEpoch: bigint;
	export let mpondToConvert: bigint;
	export let modalToClose: string;
	export let handleOnSuccess: (txnHash: string) => void;

	let approved = false;
	let txnHash = '';

	const handleApproveClick = async () => {
		try {
			if (!$chainConfigStore.tokens.MPOND) {
				throw new Error('MPOND token not found in chain config');
			}
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

	$: approved = $bridgeStore.allowances.mPond >= mpondToConvert || false;
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
