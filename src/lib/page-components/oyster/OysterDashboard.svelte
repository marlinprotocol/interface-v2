<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { dividerClasses, tableCellClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
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
	import { checkValidURL } from '$lib/utils/helpers/commonHelper';
	import { onDestroy } from 'svelte';
	import edit from 'svelte-awesome/icons/edit';
	import InstancesTable from '$lib/page-components/oyster/sub-components/InstancesTable.svelte';
	import {
		OPERATOR_JOBS_URL,
		OYSTER_DOC_LINK,
		OYSTER_SUPPORT_LINK
	} from '$lib/utils/constants/urls';

	import { getModifiedInstances } from '$lib/utils/data-modifiers/oysterModifiers';

	const styles = {
		docButton: 'text-primary',
		tableCell: tableCellClasses.rowMini
	};

	let displayAddress = '';
	let enableRegisterButton = false;

	let updatedCpURL = '';
	let registeredCpURL = '';
	let registered = false;
	let disableCpURL = true;

	let openInstanceTable = false;

	const unsubscribeWalletStore = walletStore.subscribe((value) => {
		displayAddress = value.address;
	});
	onDestroy(unsubscribeWalletStore);

	const unsubscribeOysterStore = oysterStore.subscribe((value) => {
		if (value.providerData.data) {
			registeredCpURL = value.providerData.data.cp;
			updatedCpURL = value.providerData.data.cp;
			registered = value.providerData.registered ?? false;
		} else {
			registeredCpURL = '';
			updatedCpURL = '';
			registered = false;
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
			registeredCpURL = updatedCpURL;
			registered = true;
			disableCpURL = true;
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
				const instances = await getInstancesFromControlPlaneUsingCpUrl(updatedCpURL);
				return getModifiedInstances(instances);
			} else if (registeredCpURL !== '' && !useUpdatedCpURL) {
				const instances = await getInstancesFromControlPlaneUsingOperatorAddress(
					$walletStore.address
				);
				return getModifiedInstances(instances);
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

	// Define the debounced version of getInstances
	const debouncedGetInstances = debounce(getInstances, 4000);

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

	$: if (registeredCpURL === '') {
		disableCpURL = false;
	} else {
		disableCpURL = true;
	}
	$: if (!$connected) {
		updatedCpURL = '';
	}
</script>

<ContainerCard>
	<svelte:fragment slot="header">
		<Text variant="h2" text="Operator Registration" styleClass="text-left" />
		<div class="text-left text-grey-700 flex flex-col gap-1 mt-2 mb-4">
			<div class="flex gap-2 items-center">
				<Text variant="body" text="Quick access:" />
				<a href={OYSTER_DOC_LINK} target="_blank">
					<Text styleClass={styles.docButton} fontWeight="font-medium" text="Documentation" />
				</a>
				<div class={dividerClasses.vertical} />
				<a href={OYSTER_SUPPORT_LINK} target="_blank">
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
		errorMessage={'Invalid control plane URL. Make sure to use the full URL along with http:// or https:// and remove any trailing slashes.'}
	/>
	{#await instances catch error}
		<ErrorTextCard
			showError={error}
			errorMessage={'Uh-oh seems like the url you entered is incorrect.'}
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
						onclick={handleOnRegister}
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
			>
				REGISTER
			</Button>
		{/if}
	{:else}
		<ConnectWalletButton isLarge={true} />
	{/if}
</ContainerCard>
{#if $connected}
	<a href={OPERATOR_JOBS_URL}>
		<Button variant="whiteFilled" size={'large'} styleClass="w-full sm:w-130 mt-4 mx-auto">
			<div class="flex justify-between w-full">
				<div class="w-full flex justify-center">TRACK USAGE</div>
				<img src={staticImages.RightArrow} alt="Right Arrow" />
			</div>
		</Button>
	</a>
{/if}
