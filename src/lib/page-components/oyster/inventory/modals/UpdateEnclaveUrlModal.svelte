<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import InputCard from '$lib/atoms/cards/InputCard.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
	import { checkValidURL, closeModal, sanitizeUrl } from '$lib/utils/helpers/commonHelper';
	import { handleUpdateEnclaveUrlForOysterJob } from '$lib/utils/services/oysterServices';

	export let modalFor: string;
	export let jobData: OysterInventoryDataModel;

	let approveEnable = false;
	let loading = false;
	let updatedEnclaveUrl: string = '';
	let enclaveUrlValid: boolean = false;
	let updatedEnclaveUrlInputDirty = false;
	let finalEnclaveUrl: string | undefined = '';

	async function updateEnclaveUrlForJob() {
		loading = true;

		const metadata = JSON.stringify({
			instance: instance,
			region: region,
			memory: memory,
			vcpu: vcpu,
			url: finalEnclaveUrl
		});

		const success = await handleUpdateEnclaveUrlForOysterJob(id, metadata);

		if (!success) {
			updatedEnclaveUrl = '';
			loading = false;
			closeModal(modalFor);
			return;
		}

		console.log('Updating the enclave url for the job:', id, 'to:', metadata);
		updatedEnclaveUrl = '';
		loading = false;
		closeModal(modalFor);
	}

	function handleUpdatedEnclaveUrlInput(event: Event) {
		const target = event.target as HTMLInputElement;

		if (target.value && target.value !== enclaveUrl) {
			loading = true;
			finalEnclaveUrl = sanitizeUrl(target.value);
			enclaveUrlValid = checkValidURL(finalEnclaveUrl);
			updatedEnclaveUrlInputDirty = true;
			loading = false;
		} else {
			updatedEnclaveUrlInputDirty = true;
			enclaveUrlValid = false;
		}
	}

	function getErrorMessage(
		_updatedEnclaveUrl: string,
		_enclaveUrl: string,
		_updatedEnclaveUrlInputDirty: boolean,
		_enclaveUrlValid: boolean
	) {
		if (_updatedEnclaveUrl === _enclaveUrl) {
			return 'The new enclave URL should be different from the current enclave URL.';
		} else if (
			updatedEnclaveUrlInputDirty &&
			!enclaveUrlValid &&
			updatedEnclaveUrl !== '' &&
			enclaveUrl !== updatedEnclaveUrl
		) {
			return 'Invalid control plane URL. Make sure to use the correct URL.';
		} else {
			return undefined;
		}
	}

	$: ({ enclaveUrl, region, instance, memory, vcpu, id } = jobData);
	$: approveEnable = enclaveUrlValid && updatedEnclaveUrlInputDirty;
	$: errorMessage = getErrorMessage(
		updatedEnclaveUrl,
		enclaveUrl,
		updatedEnclaveUrlInputDirty,
		enclaveUrlValid
	);
</script>

<Modal {modalFor}>
	<svelte:fragment slot="title">Update Enclave URL</svelte:fragment>
	<svelte:fragment slot="subtitle">Update the enclave url for this job</svelte:fragment>
	<svelte:fragment slot="content">
		<InputCard styleClass="mb-4">
			<div class="flex items-center gap-1">
				<Text variant="small" text="Current Enclave Url" />
			</div>
			<form>
				<div class="flex items-center gap-2">
					<input
						bind:value={enclaveUrl}
						class="hideInputNumberAppearance input input-ghost mt-1 h-[30px] w-full p-0 text-xl font-semibold text-primary placeholder:text-primary/[.2] focus-within:border-b-2 focus-within:text-primary focus:bg-transparent focus:outline-none disabled:text-primary"
						disabled={true}
					/>
				</div>
			</form>
		</InputCard>
		<InputCard>
			<div class="flex items-center gap-1">
				<Text variant="small" text="New Enclave Url" />
			</div>
			<form>
				<div class="flex items-center gap-2">
					<input
						bind:value={updatedEnclaveUrl}
						on:input={handleUpdatedEnclaveUrlInput}
						id="updatedSignerAddress"
						class="hideInputNumberAppearance input input-ghost mt-1 h-[30px] w-full p-0 text-xl font-semibold text-primary placeholder:text-primary/[.2] focus-within:border-b-2 focus-within:text-primary focus:bg-transparent focus:outline-none disabled:text-primary"
						placeholder="Enter Here"
					/>
				</div>
			</form>
		</InputCard>
		<ErrorTextCard styleClass="mt-4" showError={errorMessage !== undefined} {errorMessage} />
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			disabled={!approveEnable}
			{loading}
			onclick={updateEnclaveUrlForJob}
			size="large"
			styleClass="btn-block w-full my-0">Update Enclave URL</Button
		>
	</svelte:fragment>
</Modal>
