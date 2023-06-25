<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BIG_NUMBER_ZERO, MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import {
		OYSTER_RATE_SCALING_FACTOR,
		OYSTER_RATE_METADATA
	} from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		convertRateToPerHourString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/conversion';
	import {
		getBandwidthFromRateAndRegion,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import PaymentHistoryTable from '$lib/page-components/oyster/sub-components/PaymentHistoryTable.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;
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

	const { symbol, decimal } = OYSTER_RATE_METADATA;
	const nowTime = new Date().getTime() / 1000;
	const styles = {
		modalWidth: 'w-11/12 sm:max-w-[700px]',
		textPrimary: 'text-primary truncate'
	};

	$: instanceRate = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);
	$: bandwidthRate =
		instanceRate !== undefined
			? rate.sub(instanceRate.mul(OYSTER_RATE_SCALING_FACTOR))
			: BIG_NUMBER_ZERO;
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
					value={`${symbol}${convertRateToPerHourString(downScaledRate, decimal)}`}
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
					value={`${symbol}${bigNumberToString(totalDeposit, decimal)}`}
					centered
					textStyle={styles.textPrimary}
				/>
				<TextInputCard
					title={'Amount Used'}
					value={`${symbol}${bigNumberToString(amountUsed, decimal)}`}
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
