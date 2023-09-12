<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import {
		bigNumberToString,
		convertRateToPerHourString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/helpers/conversionHelper';
	import {
		getBandwidthFromRateAndRegion,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import PaymentHistoryTable from '$lib/page-components/oyster/sub-components/PaymentHistoryTable.svelte';
	import { chainConfigStore } from '$lib/data-stores/chainProviderStore';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	const nowTime = new Date().getTime() / 1000;
	const styles = {
		modalWidth: 'w-11/12 sm:max-w-[700px]',
		textPrimary: 'text-primary truncate'
	};

	$: ({
		provider: { name, address },
		instance,
		region,
		vcpu,
		memory,
		enclaveUrl,
		rate,
		ip,
		totalDeposit,
		amountUsed,
		createdAt,
		endEpochTime,
		depositHistory,
		downScaledRate
	} = jobData);
	$: oysterToken = $chainConfigStore.oyster_token;
	$: oysterTokenMetadata =
		$chainConfigStore.tokens[oysterToken as keyof typeof $chainConfigStore.tokens];
	$: instanceRate = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);
	$: bandwidthRate = instanceRate !== undefined ? rate - instanceRate : 0n;
	$: bandwidth = getBandwidthFromRateAndRegion(bandwidthRate, region).toString() + 'KB/s';
</script>

<Modal {modalFor} modalWidth={styles.modalWidth} padding={false}>
	<svelte:fragment slot="title">
		{'ORDER DETAILS'}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{'View the details of your order'}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-col gap-4 px-4">
			<div class="flex gap-4 flex-col sm:flex-row">
				<TextInputCard
					title={'Operator'}
					value={name !== '' ? name : address}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard title={'Region'} value={region} centered textStyle={styles.textPrimary} />
			</div>
			<div class="flex gap-4 flex-col sm:flex-row">
				<TextInputCard
					title={'Instance'}
					value={instance}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'vCPU'}
					value={vcpu?.toString() ?? ''}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Memory'}
					value={(memory?.toString() ?? '') + (memory ? MEMORY_SUFFIX : '')}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Hourly Rate'}
					value={`${oysterTokenMetadata.symbol}${convertRateToPerHourString(
						downScaledRate,
						oysterTokenMetadata.decimal
					)}`}
					centered
					textStyle={styles.textPrimary}
				/>
			</div>
			<div class="flex gap-4 flex-col sm:flex-row">
				<TextInputCard
					title={'Start Date'}
					value={epochSecToString(createdAt)}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Total Paid'}
					value={`${oysterTokenMetadata.symbol}${bigNumberToString(
						totalDeposit,
						oysterTokenMetadata.decimal
					)}`}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Amount Used'}
					value={`${oysterTokenMetadata.symbol}${bigNumberToString(
						amountUsed,
						oysterTokenMetadata.decimal
					)}`}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Duration Left'}
					value={nowTime > endEpochTime
						? 'Ended'
						: epochToDurationString(endEpochTime - nowTime, true)}
					centered
					textStyle={styles.textPrimary}
				/>
			</div>
			<div class="flex gap-4 flex-col sm:flex-row">
				<TextInputCard
					title={'Enclave Image URL'}
					value={enclaveUrl}
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Ip Address'}
					value={ip ?? 'N/A'}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Bandwidth'}
					value={bandwidth}
					centered
					textStyle={styles.textPrimary}
				/>
			</div>
			<PaymentHistoryTable tableData={depositHistory} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<div class="p-4">
			<ModalButton variant="filled" {modalFor} size="large" styleClass={'btn-block my-0'}>
				OK
			</ModalButton>
		</div>
	</svelte:fragment>
</Modal>
