<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { dividerClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import {
		getInstancesFromControlPlaneUsingCpUrl,
		getInstancesFromControlPlaneUsingOperatorAddress
	} from '$lib/controllers/httpController';
	import {
		oysterStore,
		removeProviderFromOysterStore,
		updateProviderInOysterStore
	} from '$lib/data-stores/oysterStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { checkValidURL, sanitizeUrl } from '$lib/utils/helpers/commonHelper';
	import edit from 'svelte-awesome/icons/edit';
	import InstancesTable from '$lib/page-components/oyster/sub-components/InstancesTable.svelte';
	import {
		OYSTER_OPERATOR_JOBS_URL,
		OYSTER_DOC_LINK,
		DISCORD_LINK
	} from '$lib/utils/constants/urls';

	import { getModifiedInstances } from '$lib/utils/data-modifiers/oysterModifiers';
	import {
		updateOysterInfrastructureProvider,
		registerOysterInfrastructureProvider,
		removeOysterInfrastructureProvider
	} from '$lib/controllers/contract/oyster';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';

	let enableRegisterButton = false;
	let updatedCpURL = '';
	let registeredCpURL = '';
	let registered = false;
	let disableCpURL = true;
	let openInstanceTable = false;
	// loading states
	let unregisterLoading = false;
	let registerLoading = false;
	let updateLoading = false;
	let initialInstances: CPUrlDataModel[] = [];

	const handleOnRegister = async () => {
		if (connected) {
			registerLoading = true;
			await registerOysterInfrastructureProvider(sanitizedUpdatedCpURL);
			updateProviderInOysterStore(updatedCpURL, $walletStore.address);
			registeredCpURL = updatedCpURL;
			registered = true;
			disableCpURL = true;
			registerLoading = false;
		} else {
			addToast({
				variant: 'error',
				message: 'Please connect your wallet'
			});
		}
	};

	const handleOnUpdate = async () => {
		if (connected) {
			updateLoading = true;
			await updateOysterInfrastructureProvider(sanitizedUpdatedCpURL);
			updateProviderInOysterStore(updatedCpURL, $walletStore.address);
			registeredCpURL = updatedCpURL;
			updateLoading = false;
		} else {
			addToast({
				variant: 'error',
				message: 'Please connect your wallet'
			});
		}
	};

	const handleOnUnregister = async () => {
		unregisterLoading = true;
		await removeOysterInfrastructureProvider();
		removeProviderFromOysterStore();
		unregisterLoading = false;
		registeredCpURL = '';
		registered = false;
		initialInstances = [];
	};

	async function getInstances(apiType: string) {
		try {
			if (apiType === 'proxy') {
				const instances = await getInstancesFromControlPlaneUsingCpUrl(sanitizedUpdatedCpURL);
				initialInstances = getModifiedInstances(instances);
				return initialInstances;
			} else if (registeredCpURL !== '' && apiType === 'wallet') {
				const instances = await getInstancesFromControlPlaneUsingOperatorAddress(
					$walletStore.address
				);
				initialInstances = getModifiedInstances(instances);
				return initialInstances;
			} else {
				return initialInstances;
			}
		} catch (error) {
			console.log('error from getInstances', error);
			throw error;
		}
	}

	function debounce<F extends (...args: any[]) => Promise<any>>(func: F, delay: number): F {
		enableRegisterButton = false;
		let timeoutID: ReturnType<typeof setTimeout> | undefined;

		return async function (this: any, ...args: Parameters<F>): Promise<ReturnType<F>> {
			const context = this;

			// Return a Promise that resolves with the result of the original function
			return new Promise<ReturnType<F>>((resolve, reject) => {
				clearTimeout(timeoutID);
				timeoutID = setTimeout(async () => {
					try {
						const result = await func.apply(context, args);

						resolve(result);
					} catch (error) {
						console.log('error from debounce');
						reject(error);
					}
				}, delay);
			});
		} as F;
	}

	function updateCpUrls(
		address: string,
		chainId: number | null,
		connected: boolean,
		providerData: any
	) {
		if (connected && address !== '' && chainId !== null && providerData.data !== undefined) {
			updatedCpURL = providerData.data?.cp;
			registeredCpURL = providerData.data?.cp;
			registered = providerData.registered;
		} else {
			updatedCpURL = '';
			registeredCpURL = '';
			registered = false;
		}
	}

	// Define the debounced version of getInstances
	const debouncedGetInstances = debounce(getInstances, 4000);
	const memoizeInstances = (updatedUrl: string) => {
		if (!validCPUrl) {
			return debouncedGetInstances('');
		}
		// initial case while adding cpUrl : invoke PROXY api call
		if (!registeredCpURL && updatedUrl) {
			return debouncedGetInstances('proxy');
		}
		// While cpUrl registered already: invoke api call using wallet only if required
		if (registeredCpURL && initialInstances.length === 0) {
			return debouncedGetInstances('wallet');
		}
		return debouncedGetInstances('');
	};
	$: updateCpUrls($walletStore.address, $chainStore.chainId, $connected, $oysterStore.providerData);
	$: if (updatedCpURL !== registeredCpURL) {
		enableRegisterButton = false;
	}
	$: sanitizedUpdatedCpURL = sanitizeUrl(updatedCpURL);
	// using regex to validate CP URL
	$: validCPUrl = checkValidURL(sanitizedUpdatedCpURL);
	$: instances = memoizeInstances(updatedCpURL);
	$: instances
		.then((data) => {
			if (data.length > 0) {
				enableRegisterButton = true;
				openInstanceTable = true;
			} else {
				enableRegisterButton = false;
				openInstanceTable = false;
			}
		})
		.catch((error) => {
			console.error(error);
			enableRegisterButton = false;
			openInstanceTable = true;
		});

	$: disableCpURL = registeredCpURL === '' ? false : true;
</script>

<ContainerCard>
	<svelte:fragment slot="header">
		<Text variant="h2" text="Operator Registration" styleClass="text-left" />
		<div class="mb-4 mt-2 flex flex-col gap-1 text-left text-grey-700">
			<div class="flex items-center gap-2">
				<Text variant="body" text="Quick access:" />
				<a href={OYSTER_DOC_LINK} target="_blank">
					<Text styleClass="text-primary" fontWeight="font-medium" text="Documentation" />
				</a>
				<div class={dividerClasses.vertical} />
				<a href={DISCORD_LINK} target="_blank">
					<Text styleClass="text-primary" fontWeight="font-medium" text="Support" />
				</a>
			</div>
		</div>
	</svelte:fragment>
	<TextInputWithEndButton
		title="Address"
		tooltipText="Address of oyster operator"
		placeholder="Enter your address here"
		bind:input={$walletStore.address}
		disabled={true}
	/>
	<TextInputWithEndButton
		styleClass="mt-4"
		title="Control Plane URL"
		tooltipText="URL of the control plane which is used to provide pricing data"
		placeholder="Paste URL here"
		bind:input={updatedCpURL}
		bind:disabled={disableCpURL}
	>
		<svelte:fragment slot="titleEndButton">
			{#if $connected}
				<Button
					onclick={() => (disableCpURL = !disableCpURL)}
					disabled={!$connected}
					variant="text"
					size="tiniest"
				>
					<Icon data={edit} size={18} />
				</Button>
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
		errorMessage="Invalid control plane URL. Make sure to use the full URL along with http:// or https:// and remove any trailing slashes."
	/>
	{#await instances catch error}
		<ErrorTextCard
			showError={error}
			errorMessage="Uh-oh seems like the url you entered is incorrect."
		/>
	{/await}
	<InstancesTable isOpen={openInstanceTable} {validCPUrl} bind:tableData={instances} />

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
						onclick={handleOnUpdate}
						loading={updateLoading}
					>
						UPDATE
					</Button>
				</div>
				<div class="w-1/2">
					<Button
						variant="outlined"
						size="large"
						styleClass="w-full"
						disabled={!validCPUrl || registeredCpURL !== updatedCpURL}
						onclick={handleOnUnregister}
						loading={unregisterLoading}
					>
						UNREGISTER
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
				loading={registerLoading}
			>
				REGISTER
			</Button>
		{/if}
	{:else}
		<ConnectWalletButton isLarge={true} />
	{/if}
</ContainerCard>
{#if $connected}
	<a href={OYSTER_OPERATOR_JOBS_URL}>
		<Button variant="whiteFilled" size="large" styleClass="w-full sm:w-130 mt-4 mx-auto">
			<div class="flex w-full justify-between">
				<div class="flex w-full justify-center">TRACK USAGE</div>
				<img src={staticImages.RightArrow} alt="Right Arrow" />
			</div>
		</Button>
	</a>
{/if}
