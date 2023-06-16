<script lang="ts">
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import TextInputCard from '$lib/components/texts/TextInputCard.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { BigNumberZero, MEMORY_SUFFIX } from '$lib/utils/constants/constants';
	import { kOysterRateMetaData } from '$lib/utils/constants/oysterConstants';
	import {
		bigNumberToString,
		epochSecToString,
		epochToDurationString
	} from '$lib/utils/conversion';
	import {
		convertRateToPerHourString,
		getRateForProviderAndFilters
	} from '$lib/utils/helpers/oysterHelpers';
	import { BigNumber } from 'ethers';
	import PaymentHistoryTable from '../../sub-components/PaymentHistoryTable.svelte';
	import { getBandwidthRateForRegion } from '$lib/utils/data-modifiers/oysterModifiers';

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
		depositHistory
	} = jobData);

	const { symbol, decimal } = kOysterRateMetaData;
	const nowTime = new Date().getTime() / 1000;
	const styles = {
		modalWidth: 'w-11/12 sm:max-w-[700px]',
		textPrimary: 'text-primary truncate'
	};

	function getBandwidthFromRateAndRegion(bandwidthRate: BigNumber, region: string) {
		const rateForRegion = getBandwidthRateForRegion(region);
		if (rateForRegion === undefined) return BigNumberZero;

		return Math.ceil(
			bandwidthRate
				.mul(BigNumber.from(1024 * 1024))
				.div(rateForRegion)
				.toNumber()
		);
	}
	// TODO: ask prateek if this should be moved somewhere else, seems kinda weird to put it here XD
	$: instanceRate = getRateForProviderAndFilters(
		address,
		instance,
		region,
		$oysterStore.allMarketplaceData
	);
	$: bandwidthRate = instanceRate !== undefined ? rate.sub(instanceRate) : BigNumberZero;
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
					value={`${symbol}${convertRateToPerHourString(rate, decimal)}`}
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
				<TextInputCard
					title={'Bandwidth Rate'}
					value={bandwidthRate?.toString() || 'N/A'}
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
