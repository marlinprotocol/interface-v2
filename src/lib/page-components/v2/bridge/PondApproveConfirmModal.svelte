<script lang="ts">
	import ApproveAndConfirmModal from '$lib/components/v2/modals/ApproveAndConfirmModal.svelte';
	import {
		bridgeStore,
		decreasePondAllowanceInBridgeStore,
		updatePondAllowanceInBridgeStore
	} from '$lib/data-stores/bridgeStore';
	import {
		addMpondToWalletBalanceStore,
		withdrawPondFromWalletBalanceStore
	} from '$lib/data-stores/walletProviderStore';
	import { pondToMPond } from '$lib/utils/helpers/conversionHelper';
	import { doNothing } from '$lib/utils/helpers/commonHelper';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';
	import { convertPondToMPond } from '$lib/controllers/contract/bridge';
	import { approveToken } from '$lib/controllers/contract/token';

	export let pond: bigint;
	export let modalFor: string;

	let approved = false;

	const handleApproveClick = async () => {
		try {
			if (!$chainConfigStore.tokens.POND) {
				throw new Error('POND token not found in chain config');
			}
			await approveToken($chainConfigStore.tokens.POND, pond, $contractAddressStore.BRIDGE);
			updatePondAllowanceInBridgeStore(pond);
			approved = true;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
	const handleConfirmClick = async () => {
		try {
			const txn = await convertPondToMPond(mpond);
			if (txn) {
				addMpondToWalletBalanceStore(mpond);
				withdrawPondFromWalletBalanceStore(pond);
				decreasePondAllowanceInBridgeStore(pond);
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	$: mpond = pondToMPond(pond);
	$: approved = $bridgeStore.allowances.pond >= pond || false;
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
	conversionFrom="pond"
	amountConverted={pond}
	confirmButtonText="CONVERT"
/>
