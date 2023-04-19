<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { closeModal } from '$lib/utils/helpers/commonHelper';
	import {
		handleCancelRateRevise,
		handleConfirmJobStop,
		handleInitiateRateRevise
	} from '$lib/utils/services/oysterServices';
	import StopModalContent from '../../sub-components/StopModalContent.svelte';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;
	export let stopInitiateEndTimestamp: number;

	let submitLoading = false;
	const nowTime = Date.now() / 1000;

	const handleInitialClick = async () => {
		submitLoading = true;
		await handleInitiateRateRevise(jobData);
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleConfirmClick = async () => {
		submitLoading = true;
		jobData = await handleConfirmJobStop(jobData);
		oysterStore.update((value) => {
			return {
				...value,
				jobsData: value.jobsData.map((job) => {
					if (job.id === jobData.id) {
						return jobData;
					}
					return job;
				})
			};
		});
		submitLoading = false;
		closeModal(modalFor);
	};

	const handleCancelInitiate = async () => {
		submitLoading = true;
		await handleCancelRateRevise(jobData);
		submitLoading = false;
		closeModal(modalFor);
	};

	$: modalTitle =
		stopInitiateEndTimestamp === 0
			? 'INITIATE STOP'
			: stopInitiateEndTimestamp < nowTime
			? 'CONFIRM STOP'
			: 'INITIATING STOP';

	$: submitButtonText =
		stopInitiateEndTimestamp === 0
			? 'INITIATE STOP'
			: stopInitiateEndTimestamp < nowTime
			? 'CONFIRM'
			: 'CANCEL INITIATION';

	$: submitButtonAction =
		stopInitiateEndTimestamp === 0
			? handleInitialClick
			: stopInitiateEndTimestamp < nowTime
			? handleConfirmClick
			: handleCancelInitiate;

	const subtitle =
		'Creating a new stash requires users to approve the POND and/or MPond tokens. After approval, users can enter their operator of choice and confirm stash creation.';

	const styles = {
		textPrimary: 'text-primary'
	};
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">
		{modalTitle}
	</svelte:fragment>
	<svelte:fragment slot="subtitle">
		{subtitle}
	</svelte:fragment>
	<svelte:fragment slot="content">
		<StopModalContent {jobData} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			loading={submitLoading}
			onclick={submitButtonAction}
			size="large"
			styleClass={`btn-block my-0 `}
		>
			{submitButtonText}
		</Button>
		<!-- {#if initiateInProcess}
			<Button variant="filled" disabled size="large" styleClass={'btn-block mt-4'}>
				{'CONFIRM'}
			</Button>
		{/if} -->
	</svelte:fragment>
</Modal>
