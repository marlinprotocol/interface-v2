<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
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
	import { checkValidURL, cn, sanitizeUrl } from '$lib/utils/helpers/commonHelper';

	import { getModifiedInstances } from '$lib/utils/data-modifiers/oysterModifiers';
	import {
		updateOysterInfrastructureProvider,
		registerOysterInfrastructureProvider,
		removeOysterInfrastructureProvider
	} from '$lib/controllers/contract/oyster';
	import { chainStore } from '$lib/data-stores/chainProviderStore';
	import type { CPUrlDataModel } from '$lib/types/oysterComponentType';
	import PageTitle from '$lib/components/v2/texts/PageTitle.svelte';
	import OysterOperatorJobsHistory from './OysterOperatorJobsHistory.svelte';
	import OysterOperatorJobs from '$lib/page-components/v2/oyster/operator/OysterOperatorJobs.svelte';

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
			} else if (registeredCpURL) {
				return initialInstances;
			} else {
				return [];
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

	const isDisabledCpUrl = (connected: boolean, cpUrl: string) => {
		if (connected) {
			return Boolean(cpUrl);
		} else {
			return true;
		}
	};

	$: disableCpURL = isDisabledCpUrl($connected, registeredCpURL);
	let activeTab: 'details' | 'history' = 'details';
	const toggleActiveTab = () => {
		if (activeTab === 'details') {
			activeTab = 'history';
		} else {
			activeTab = 'details';
		}
	};
	$: historyActive = activeTab === 'history';
	$: detailsActive = activeTab === 'details';
	const inactiveClasses = 'bg-white font-light text-[#A8A8A8]';
</script>

<div class="w-full">
	<div class="flex justify-between">
		<PageTitle title="Hello, 0x12323423423" />
		<Button styleClass="font-normal w-[170px]">Register</Button>
	</div>
	<div class="h-[230px] w-full rounded-lg bg-white">&nbsp;</div>

	<div class="mt-[40px] inline-block gap-[10px] rounded-tl-[18px] rounded-tr-[18px] bg-white">
		<button
			on:click={toggleActiveTab}
			class={cn('w-[172px] rounded-tl-[18px] rounded-tr-[18px] py-[27px]', {
				'bg-white font-light text-[#A8A8A8]': historyActive,
				'bg-[#F0F0F0] font-medium text-primary': detailsActive
			})}
		>
			Details
		</button>
		<button
			on:click={toggleActiveTab}
			class={cn('w-[172px] rounded-tl-[18px] rounded-tr-[18px] py-[27px]', {
				'bg-white font-light text-[#A8A8A8]': detailsActive,
				'bg-[#F0F0F0] font-medium text-primary': historyActive
			})}
		>
			History
		</button>
	</div>

	{#if historyActive}
		<OysterOperatorJobsHistory />
	{/if}
	{#if detailsActive}
		<OysterOperatorJobs />
	{/if}
</div>
