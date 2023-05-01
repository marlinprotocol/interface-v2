<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { dividerClasses, tableCellClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import {
		registerOysterInfrastructureProvider,
		removeOysterInfrastructureProvider,
		updateOysterInfrastructureProvider
	} from '$lib/controllers/contractController';
	import {
		getInstancesFromControlPlaneUsingCpUrl,
		getInstancesFromControlPlaneUsingOperatorAddress
	} from '$lib/controllers/httpController';
	import { oysterStore } from '$lib/data-stores/oysterStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import {
		kOperatorJobs,
		kOysterDocLink,
		kOysterSupportLink
	} from '$lib/utils/constants/oysterConstants';
	import { checkValidURL } from '$lib/utils/helpers/commonHelper';
	import { onDestroy } from 'svelte';
	import edit from 'svelte-awesome/icons/edit';
	import InstancesTable from './sub-components/InstancesTable.svelte';

	const styles = {
		docButton: 'text-primary',
		tableCell: tableCellClasses.rowMini
	};

	let displayAddress = '';
	let enableRegisterButton = false;

	let updatedCpURL = '';
	let registeredCpURL = '';
	let registered = false;

	const unsubscribeWalletStore = walletStore.subscribe((value) => {
		displayAddress = value.address;
	});
	onDestroy(unsubscribeWalletStore);

	const unsubscribeOysterStore = oysterStore.subscribe((value) => {
		if (value.providerData.data) {
			registeredCpURL = value.providerData.data.cp;
			updatedCpURL = value.providerData.data.cp;
			registered = value.providerData.registered ?? false;
		}
	});
	onDestroy(unsubscribeOysterStore);

	const handleOnRegister = async () => {
		if (connected) {
			if (registered) {
				await updateOysterInfrastructureProvider(updatedCpURL);
			} else {
				await registerOysterInfrastructureProvider(updatedCpURL);
			}

			oysterStore.update((value) => {
				value.providerData.registered = true;
				if (value.providerData.data) {
					value.providerData.data.cp = updatedCpURL;
					value.providerData.data.id = $walletStore.address;
					value.providerData.data.live = true;
				}
				return value;
			});
			registered = true;
		} else {
			addToast({
				variant: 'error',
				message: 'Please connect your wallet'
			});
		}
	};

	const handleOnUnregister = async () => {
		await removeOysterInfrastructureProvider();
		oysterStore.update((value) => {
			value.providerData.registered = false;
			if (value.providerData.data) {
				value.providerData.data.cp = '';
				value.providerData.data.id = '';
				value.providerData.data.live = false;
			}
			return value;
		});
	};

	async function getInstances(useUpdatedCpURL: boolean) {
		try {
			if (useUpdatedCpURL) {
				return await getInstancesFromControlPlaneUsingCpUrl(updatedCpURL);
			} else if (registeredCpURL !== '') {
				return await getInstancesFromControlPlaneUsingOperatorAddress($walletStore.address);
			} else {
				return [];
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	function debounce<F extends (...args: any[]) => Promise<any>>(func: F, delay: number): F {
		let timeoutID: ReturnType<typeof setTimeout> | undefined;

		return async function (this: any, ...args: Parameters<F>): Promise<ReturnType<F>> {
			const context = this;

			// Return a Promise that resolves with the result of the original function
			return new Promise<ReturnType<F>>((resolve) => {
				clearTimeout(timeoutID);
				timeoutID = setTimeout(async () => {
					const result = await func.apply(context, args);
					resolve(result);
				}, delay);
			});
		} as F;
	}

	// Define the debounced version of getInstances
	const debouncedGetInstances = debounce(getInstances, 2000);

	$: if (updatedCpURL !== registeredCpURL) {
		enableRegisterButton = false;
	}
	// using regex to validate CP URL
	$: validCPUrl = checkValidURL(updatedCpURL);
	$: instances =
		(registeredCpURL === '' && updatedCpURL && validCPUrl) ||
		(registeredCpURL !== updatedCpURL && validCPUrl)
			? debouncedGetInstances(true)
			: debouncedGetInstances(false);
	$: instances.then((data) => (enableRegisterButton = true));
</script>

<ContainerCard>
	<svelte:fragment slot="header">
		<Text variant="h2" text="Operator Registration" styleClass="text-left" />
		<div class="text-left text-grey-700 flex flex-col gap-1 mt-2 mb-4">
			<div class="flex gap-2 items-center">
				<Text variant="body" text="Quick access:" />
				<a href={kOysterDocLink}>
					<Text styleClass={styles.docButton} fontWeight="font-medium" text="Documentation" />
				</a>
				<div class={dividerClasses.vertical} />
				<a href={kOysterSupportLink}>
					<Text styleClass={styles.docButton} fontWeight="font-medium" text="Support" />
				</a>
			</div>
		</div>
	</svelte:fragment>
	<TextInputWithEndButton
		title={'Address'}
		tooltipText={'Address of oyster operator'}
		placeholder={'Enter your address here'}
		bind:input={displayAddress}
		disabled={true}
	/>
	<TextInputWithEndButton
		styleClass="mt-4"
		title={'Control Plane URL'}
		tooltipText={'URL of the control plane which is used to provide pricing data'}
		placeholder={'Paste URL here'}
		bind:input={updatedCpURL}
	>
		<svelte:fragment slot="titleEndButton">
			{#if $connected}
				<ModalButton disabled={!registered} variant="text" size="tiniest" modalFor={''}>
					<Icon data={edit} size={18} />
				</ModalButton>
			{:else}
				<button
					type="button"
					on:click={() => {
						addToast({
							message: 'Please connect your wallet.',
							variant: 'error'
						});
					}}
				>
					<Icon data={edit} size={18} />
				</button>
			{/if}
		</svelte:fragment>
	</TextInputWithEndButton>
	<ErrorTextCard
		showError={!validCPUrl && updatedCpURL !== ''}
		errorMessage={'Invalid control plane URL. Make sure to use the full url along with http:// or https:// and remove any trailing slashes.'}
	/>
	{#await instances}
		<InstancesTable {validCPUrl} tableData={[]} loading />
	{:then value}
		<InstancesTable {validCPUrl} tableData={value} />
	{:catch error}
		<InstancesTable {validCPUrl} tableData={[]} error />
	{/await}
	<div class="mt-4" />
	{#if $connected}
		{#if registered}
			<div class="flex justify-center gap-4">
				<div class="w-1/2">
					<Button
						variant="filled"
						size="large"
						styleClass="w-full"
						disabled={!validCPUrl || registeredCpURL === updatedCpURL || !enableRegisterButton}
						onclick={handleOnRegister}
					>
						Update
					</Button>
				</div>
				<div class="w-1/2">
					<Button
						variant="outlined"
						size="large"
						styleClass="w-full"
						disabled={!validCPUrl || registeredCpURL !== updatedCpURL}
						onclick={handleOnUnregister}
					>
						Unregister
					</Button>
				</div>
			</div>
		{:else}
			<Button
				variant="filled"
				size="large"
				styleClass="w-full"
				disabled={!validCPUrl || !enableRegisterButton}
				onclick={handleOnRegister}
			>
				Register
			</Button>
		{/if}
	{:else}
		<ConnectWalletButton isLarge={true} />
	{/if}
</ContainerCard>
{#if $connected}
	<a href={kOperatorJobs}>
		<Button
			variant="whiteFilled"
			onclick={() => {}}
			size={'large'}
			styleClass="w-full sm:w-130 mt-4 mx-auto"
		>
			<div class="flex justify-between w-full">
				<div class="w-full flex justify-center">TRACK USAGE</div>
				<img src={staticImages.RightArrow} alt="Right Arrow" />
			</div>
		</Button>
	</a>
{/if}
