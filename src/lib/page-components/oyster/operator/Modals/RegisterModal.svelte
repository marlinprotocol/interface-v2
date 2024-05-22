<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import Modal from '$lib/atoms/modals/Modal.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { checkValidURL, closeModal, cn, sanitizeUrl } from '$lib/utils/helpers/commonHelper';
	import { staticImages } from '$lib/components/images/staticImages';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import {
		registerOysterInfrastructureProvider,
		updateOysterInfrastructureProvider
	} from '$lib/controllers/contract/oyster';
	import { oysterStore, updateProviderInOysterStore } from '$lib/data-stores/oysterStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import {
		getInstancesFromControlPlaneUsingCpUrl,
		getInstancesFromControlPlaneUsingOperatorAddress
	} from '$lib/controllers/httpController';
	import { getModifiedInstances } from '$lib/utils/data-modifiers/oysterModifiers';
	import ErrorTextCard from '$lib/components/cards/ErrorTextCard.svelte';

	export let updateLoading = false;
	export let registerLoading = false;
	export let instancesLoading = false;
	export let instancesData = {
		totalInstances: 0,
		totalRegions: 0
	};
	export let loadedInitialInstances: boolean;

	let isUpdateButtonDisabled: boolean;
	let isRegistredButtonDisabled: boolean;
	let updatedInstancesData = {
		totalInstances: 0,
		totalRegions: 0
	};
	let updatedInstances: any[] = [];
	let isStateVisible = false;
	let currentStateClass = '';
	let iconName = '';
	let updatedCpUrl = '';

	const commonStateClass =
		'mt-4 w-full rounded-[18px]  py-6 flex items-center justify-center gap-[7px]';

	function returnStateComponent(value: string) {
		switch (value) {
			case 'bg-[#FDF3DE] text-[#E6B54D]':
				return 'Your control plane URL is loading...';
			case 'bg-[#FEE6E6] text-[#E00606]':
				return 'Details are wrong';
			case 'bg-[#F4F9F0] text-[#68A843]':
				return 'Your control plane URL has been added successfully!';
			default:
				break;
		}
	}

	const handleOnRegister = async () => {
		try {
			if ($connected) {
				registerLoading = true;
				await registerOysterInfrastructureProvider(sanitizedUpdatedCpURL);
				updateProviderInOysterStore(sanitizedUpdatedCpURL, $walletStore.address);
				instancesData = updatedInstancesData;
				registerLoading = false;
				loadedInitialInstances = true;
				updatedCpUrl = '';
				closeModal('oyster-register-url-operator');
			} else {
				addToast({
					variant: 'error',
					message: { description: 'Please connect your wallet', title: 'Connect Wallet' }
				});
			}
		} catch (error) {
			registerLoading = false;
			console.error(error);
			addToast({
				variant: 'error',
				message: {
					description: 'Oops! Something went wrong. Please try again.',
					title: 'Error'
				}
			});
		}
	};

	const handleOnUpdate = async () => {
		try {
			if (connected) {
				updateLoading = true;
				await updateOysterInfrastructureProvider(sanitizedUpdatedCpURL);
				updateProviderInOysterStore(sanitizedUpdatedCpURL, $walletStore.address);
				instancesData = updatedInstancesData;
				updateLoading = false;
				updatedCpUrl = '';
				closeModal('oyster-register-url-operator');
			} else {
				addToast({
					variant: 'error',
					message: { description: 'Please connect your wallet', title: 'Connect Wallet' }
				});
			}
		} catch (error) {
			updateLoading = false;
			console.error(error);
			addToast({
				variant: 'error',
				message: {
					description: 'Oops! Something went wrong. Please try again.',
					title: 'Error'
				}
			});
		}
	};

	async function getInstances(apiType: string) {
		try {
			if (!sanitizedUpdatedCpURL.trim().length) {
				return [];
			}
			instancesLoading = true;
			if (apiType === 'proxy') {
				const instances = await getInstancesFromControlPlaneUsingCpUrl(sanitizedUpdatedCpURL);
				updatedInstances = getModifiedInstances(instances);
				return updatedInstances;
			} else if ($oysterStore.providerData.data?.cp !== '' && apiType === 'wallet') {
				const instances = await getInstancesFromControlPlaneUsingOperatorAddress(
					$walletStore.address
				);
				updatedInstances = getModifiedInstances(instances);
				return updatedInstances;
			} else if ($oysterStore.providerData.data?.cp) {
				return updatedInstances;
			} else {
				return [];
			}
		} catch (error) {
			console.log('error from getInstances', error);
			throw error;
		}
	}

	function debounce<F extends (...args: any[]) => Promise<any>>(func: F, delay: number): F {
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

	// Define the debounced version of getInstances
	const debouncedGetInstances = debounce(getInstances, 1000);
	function memoizeInstances(updatedUrl: string) {
		if (!validCPUrl) {
			return debouncedGetInstances('');
		}
		// initial case while adding cpUrl : invoke PROXY api call
		if (!$oysterStore.providerData.data?.cp || updatedUrl) {
			return debouncedGetInstances('proxy');
		}
		// While cpUrl registered already: invoke api call using wallet only if required
		if ($oysterStore.providerData.data?.cp && updatedInstances.length === 0) {
			return debouncedGetInstances('wallet');
		}
		return debouncedGetInstances('');
	}

	$: sanitizedUpdatedCpURL = sanitizeUrl(updatedCpUrl);
	// using regex to validate CP URL
	$: validCPUrl = checkValidURL(sanitizedUpdatedCpURL);
	$: instances = memoizeInstances(sanitizedUpdatedCpURL);
	$: isErrorFound = false;

	$: instances
		.then((data) => {
			isErrorFound = false;
			if (data.length > 0) {
				const uniqueRegions = [...new Set(data.map((instance) => instance.region))];
				updatedInstancesData.totalInstances = data.length;
				updatedInstancesData.totalRegions = uniqueRegions.length;
				enableRegisterButton = true;
			} else {
				enableRegisterButton = false;
			}
			instancesLoading = false;
		})
		.catch((error) => {
			console.error(error);
			instancesLoading = false;
			enableRegisterButton = false;
			isErrorFound = true;
		});

	$: if (instancesLoading) {
		isStateVisible = true;
		iconName = staticImages.yellowInfo;
		currentStateClass = 'bg-[#FDF3DE] text-[#E6B54D]';
	} else if ((!validCPUrl || isErrorFound) && !!updatedCpUrl.trim().length) {
		isStateVisible = true;
		iconName = staticImages.redAlert;
		currentStateClass = 'bg-[#FEE6E6] text-[#E00606]';
	} else if (
		validCPUrl &&
		enableRegisterButton &&
		updatedCpUrl !== $oysterStore.providerData.data?.cp
	) {
		isStateVisible = true;
		iconName = staticImages.greenTick;
		currentStateClass = 'bg-[#F4F9F0] text-[#68A843]';
	} else {
		isStateVisible = false;
	}
	$: isUpdateButtonDisabled =
		!validCPUrl || $oysterStore.providerData.data?.cp === updatedCpUrl || !enableRegisterButton;
	$: isRegistredButtonDisabled = !validCPUrl || !enableRegisterButton;
	$: enableRegisterButton = validCPUrl && instancesData.totalInstances > 0;
</script>

<Modal modalFor="oyster-register-url-operator">
	<svelte:fragment slot="title"
		>{$oysterStore.providerData.registered ? 'Update' : 'Register'}</svelte:fragment
	>
	<svelte:fragment slot="content">
		<TextInputWithEndButton
			styleClass="w-full py-4 rounded-[100px]"
			placeholder="Paste URL here"
			bind:input={updatedCpUrl}
			label="Control Plane URL"
		/>
		{#if isStateVisible}
			<div class={cn(commonStateClass, currentStateClass)}>
				<img src={iconName} alt="state-icon" />
				{returnStateComponent(currentStateClass)}
			</div>
		{/if}
		<ErrorTextCard
			showError={$oysterStore.providerData.data?.cp === updatedCpUrl &&
				!!updatedCpUrl.replace(/\s+/g, '').length}
			errorMessage="Registered CP URL and updated CP URL cannot be the same. Please update the CP URL."
		/>
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			styleClass="w-full font-normal"
			disabled={($oysterStore.providerData.registered
				? isUpdateButtonDisabled
				: isRegistredButtonDisabled) || instancesLoading}
			onclick={$oysterStore.providerData.registered ? handleOnUpdate : handleOnRegister}
			loading={registerLoading || updateLoading}
		>
			{$oysterStore.providerData.registered ? 'Update' : 'Register'}
		</Button>
	</svelte:fragment>
</Modal>
