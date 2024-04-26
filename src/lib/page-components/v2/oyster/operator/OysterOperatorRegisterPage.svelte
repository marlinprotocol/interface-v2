<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import { page } from '$app/stores';
	import ModalButton from '$lib/atoms/v2/modals/ModalButton.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import TextInputWithEndButton from '$lib/components/v2/inputs/TextInputWithEndButton.svelte';
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

	import { getModifiedInstances } from '$lib/utils/data-modifiers/oysterModifiers';
	import {
		updateOysterInfrastructureProvider,
		registerOysterInfrastructureProvider,
		removeOysterInfrastructureProvider
	} from '$lib/controllers/contract/oyster';
	import Divider from '$lib/atoms/v2/divider/Divider.svelte';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import { ROUTES } from '$lib/utils/constants/v2/urls';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import Text from '$lib/atoms/v2/texts/Text.svelte';
	import { checkValidURL, cn, sanitizeUrl } from '$lib/utils/helpers/commonHelper';
	import RegisterModal from './Modals/RegisterModal.svelte';
	import LoadingAnimationModal from '$lib/components/loading/LoadingAnimationModal.svelte';

	let enableRegisterButton = false;
	let updatedCpURL = '';
	let registeredCpURL = '';
	let registered = false;
	let disableCpURL = true;
	let openInstanceTable = false;
	let unregisterLoading = false;
	let registerLoading = false;
	let updateLoading = false;
	let initialInstances: CPUrlDataModel[] = [];
	let instancesLoading = false;
	let instancesData = {
		totalInstances: 0,
		totalRegions: 0
	};
	let loadingInstances = false;

	const handleOnRegister = async () => {
		try {
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
		} catch (error) {
			registerLoading = false;
			console.error(error);
			addToast({
				variant: 'error',
				message: 'Oops! Something went wrong.'
			});
		}
	};

	const handleOnUpdate = async () => {
		try {
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
		} catch (error) {
			updateLoading = false;
			console.error(error);
			addToast({
				variant: 'error',
				message: 'Oops! Something went wrong.'
			});
		}
	};

	const handleOnUnregister = async () => {
		try {
			unregisterLoading = true;
			await removeOysterInfrastructureProvider();
			removeProviderFromOysterStore();
			unregisterLoading = false;
			registeredCpURL = '';
			registered = false;
			initialInstances = [];
		} catch (error) {
			unregisterLoading = false;
			registeredCpURL = '';
			registered = false;
			initialInstances = [];
			console.error(error);
			addToast({
				variant: 'error',
				message: 'Oops! Something went wrong.'
			});
		}
	};

	async function getInstances(apiType: string) {
		try {
			loadingInstances = true;
			if (apiType === 'proxy') {
				const instances = await getInstancesFromControlPlaneUsingCpUrl(sanitizedUpdatedCpURL);
				initialInstances = getModifiedInstances(instances);
				loadingInstances = false;
				return initialInstances;
			} else if (registeredCpURL !== '' && apiType === 'wallet') {
				const instances = await getInstancesFromControlPlaneUsingOperatorAddress(
					$walletStore.address
				);
				initialInstances = getModifiedInstances(instances);
				loadingInstances = false;
				return initialInstances;
			} else if (registeredCpURL) {
				loadingInstances = false;
				return initialInstances;
			} else {
				loadingInstances = false;
				return [];
			}
		} catch (error) {
			console.log('error from getInstances', error);
			loadingInstances = true;
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
	const debouncedGetInstances = debounce(getInstances, 200);
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
				const uniqueRegions = [...new Set(data.map((instance) => instance.region))];
				instancesData.totalInstances = data.length;
				instancesData.totalRegions = uniqueRegions.length;
				enableRegisterButton = true;
				openInstanceTable = true;
			} else {
				enableRegisterButton = false;
				openInstanceTable = false;
			}
			instancesLoading = false;
		})
		.catch((error) => {
			console.error(error);
			instancesLoading = false;
			enableRegisterButton = false;
		});

	$: if (validCPUrl && updatedCpURL !== registeredCpURL) {
		fetchInstances();
	}

	async function fetchInstances() {
		instancesLoading = true;
		await instances;
		instancesLoading = false;
	}

	const isDisabledCpUrl = (connected: boolean, cpUrl: string) => {
		if (connected) {
			return Boolean(cpUrl);
		} else {
			return true;
		}
	};

	$: disableCpURL = isDisabledCpUrl($connected, registeredCpURL);
	$: path = $page.url.pathname;
	$: detailsActive = path === ROUTES.OYSTER_OPERATOR_JOBS_URL + '/';
	$: historyActive = path === ROUTES.OYSTER_OPERATOR_HISTORY_URL + '/';
</script>

<div>
	{#if !$oysterStore.merchantJobsLoaded}
		<LoadingAnimatedPing />
	{:else}
		<div class="flex items-center justify-between">
			<Text
				styleClass="font-poppins leading-[-2px] text-[#030115]"
				variant="h2"
				fontWeight="font-medium"
				text="Hello, {shortenText($walletStore.address, 6, 6)}"
			/>
			{#if $connected}
				{#if !registered}
					<ModalButton
						variant="filled"
						size="large"
						styleClass="w-[170px] text-base font-normal"
						modalFor="oyster-register-url-operator"
					>
						Register
					</ModalButton>
				{/if}
			{/if}
		</div>
		{#if registered}
			<div class="mt-6 rounded-3xl bg-white px-8 py-6">
				<!-- <p class="pb-3 text-base font-normal">Control Plane:</p> -->
				<TextInputWithEndButton
					styleClass="w-full bg-[#F4F4F6] py-4 rounded-[100px]"
					placeholder="Paste URL here"
					title="Control Plane"
					bind:input={updatedCpURL}
					id="cpurl-main"
				>
					<svelte:fragment slot="endInfoBox">
						<div
							class="flex w-full max-w-[300px] items-center justify-between gap-3 rounded-[100px] bg-white px-[18px] py-4"
						>
							{#if loadingInstances}
								<p>loading...</p>
							{:else}
								<p>Instances: {instancesData.totalInstances}</p>
								<Divider direction="divider-vertical" />
								<p>Regions: {instancesData.totalRegions}</p>
							{/if}
						</div>
					</svelte:fragment>
				</TextInputWithEndButton>
				<ErrorTextCard
					showError={!validCPUrl && updatedCpURL !== ''}
					errorMessage="Invalid control plane URL. Make sure to use the full URL along with http:// or https:// and remove any trailing slashes."
				/>

				<div class="mt-4" />
				{#if $connected}
					{#if registered}
						<div class="flex gap-4">
							<ModalButton
								variant="filled"
								size="large"
								styleClass="w-[190.5px]"
								modalFor="oyster-register-url-operator"
							>
								Update
							</ModalButton>

							<Button
								variant="outlined"
								size="large"
								styleClass="w-[190.5px]"
								disabled={!validCPUrl || registeredCpURL !== updatedCpURL}
								onclick={handleOnUnregister}
								loading={unregisterLoading}
							>
								Unregister
							</Button>
						</div>
					{/if}
				{:else}
					<ConnectWalletButton isLarge={true} />
				{/if}
			</div>
		{/if}
	{/if}

	<div class="mt-[40px] flex w-min gap-[10px] rounded-tl-[18px] rounded-tr-[18px] bg-white">
		<a
			href={ROUTES.OYSTER_OPERATOR_JOBS_URL}
			class={cn('block w-[172px] rounded-tl-[18px] rounded-tr-[18px] py-[27px] text-center', {
				'bg-white font-light text-[#A8A8A8]': historyActive,
				'bg-[#F0F0F0] font-medium text-primary': detailsActive
			})}
		>
			Details
		</a>
		<a
			href={ROUTES.OYSTER_OPERATOR_HISTORY_URL}
			class={cn('block w-[172px] rounded-tl-[18px] rounded-tr-[18px] py-[27px] text-center', {
				'bg-white font-light text-[#A8A8A8]': detailsActive,
				'bg-[#F0F0F0] font-medium text-primary': historyActive
			})}
		>
			History
		</a>
	</div>
</div>

<RegisterModal
	{handleOnRegister}
	{handleOnUpdate}
	{updateLoading}
	{registered}
	bind:registeredCpURL
	bind:registerLoading
	bind:updatedCpURL
	bind:validCPUrl
	bind:enableRegisterButton
	bind:instancesLoading
/>
