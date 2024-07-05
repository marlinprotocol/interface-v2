<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import { page } from '$app/stores';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import LoadingAnimatedPing from '$lib/components/loading/LoadingAnimatedPing.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { oysterStore, removeProviderFromOysterStore } from '$lib/data-stores/oysterStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { removeOysterInfrastructureProvider } from '$lib/controllers/contract/oyster';
	import Divider from '$lib/atoms/divider/Divider.svelte';
	import { EXTERNAL_LINKS, ROUTES } from '$lib/utils/constants/urls';
	import { shortenText } from '$lib/utils/helpers/conversionHelper';
	import Text from '$lib/atoms/texts/Text.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import RegisterModal from './Modals/RegisterModal.svelte';
	import { getModifiedInstances } from '$lib/utils/data-modifiers/oysterModifiers';
	import { getInstancesFromControlPlaneUsingOperatorAddress } from '$lib/controllers/httpController';

	let unregisterLoading = false;
	let registerLoading = false;
	let updateLoading = false;
	let instancesLoading = false;
	let initialInstances: any[] = [];
	let loadedInitialInstances = false;
	let instancesData = {
		totalInstances: 0,
		totalRegions: 0
	};
	let loadingInstances = false;

	const handleOnUnregister = async () => {
		try {
			unregisterLoading = true;
			await removeOysterInfrastructureProvider();
			removeProviderFromOysterStore();
			unregisterLoading = false;
		} catch (error) {
			unregisterLoading = false;
			console.error(error);
			addToast({
				variant: 'error',
				message: {
					title: 'Error',
					description: 'Oops! Something went wrong. Please try again.'
				}
			});
		}
	};

	async function getInitialInstances() {
		try {
			loadingInstances = true;
			const instances = await getInstancesFromControlPlaneUsingOperatorAddress(
				$walletStore.address
			);
			initialInstances = getModifiedInstances(instances);
			const uniqueRegions = [...new Set(initialInstances.map((instance) => instance.region))];
			instancesData.totalInstances = initialInstances.length;
			instancesData.totalRegions = uniqueRegions.length;
			loadedInitialInstances = true;
			loadingInstances = false;
		} catch (error) {
			loadingInstances = false;
			console.error(error);
			addToast({
				variant: 'error',
				message: {
					title: 'Error',
					description: 'Oops! Something went wrong. Please try again.'
				}
			});
		}
	}

	$: if ($connected && $oysterStore.providerData.registered && !loadedInitialInstances) {
		getInitialInstances();
	}
	$: detailsActive = $page.url.pathname === ROUTES.OYSTER_OPERATOR_JOBS_URL + '/';
	$: historyActive = $page.url.pathname === ROUTES.OYSTER_OPERATOR_HISTORY_URL + '/';
</script>

<div>
	<div class="flex items-center justify-between">
		<Text
			styleClass="font-poppins leading-[-2px] text-grey-800"
			variant="h2"
			fontWeight="font-medium"
			text="Hello, {$connected ? shortenText($walletStore.address, 6, 6) : 'Fishy'}"
		/>
		<div class="flex gap-4">
			{#if !$oysterStore.providerData.registered && $oysterStore.merchantJobsLoaded}
				<ModalButton
					variant="filled"
					size="large"
					disabled={!$connected}
					styleClass="w-[170px] text-base font-normal"
					modalFor="oyster-register-url-operator"
				>
					Register
				</ModalButton>
			{/if}
			<a
				href={EXTERNAL_LINKS.OYSTER_OPERATOR_DOCS_LINK}
				target="_blank"
				referrerpolicy="no-referrer"
			>
				<Button variant="outlined" styleClass="w-[190px]" size="large">Documentation</Button>
			</a>
		</div>
	</div>
	{#if $connected}
		<div
			class={cn('mt-6', {
				'h-[224px]': !$oysterStore.merchantJobsLoaded
			})}
		>
			{#if !$oysterStore.merchantJobsLoaded}
				<LoadingAnimatedPing />
			{:else if $oysterStore.providerData.registered}
				<div class="rounded-3xl bg-white px-8 py-6">
					<p class="pb-3 text-base font-normal">Control Plane:</p>
					<TextInputWithEndButton
						styleClass="w-full bg-[#F4F4F6] py-[5px] pr-[5px] rounded-[100px]"
						placeholder="Paste URL here"
						disabled
						input={$oysterStore.providerData?.data?.cp ?? ''}
					>
						<svelte:fragment slot="endInfoBox">
							<div
								class="flex w-full max-w-[300px] items-center justify-between gap-3 rounded-[100px] bg-white px-[18px] py-4"
							>
								{#if loadingInstances}
									<p>loading...</p>
								{:else}
									<p>Instances: {instancesData.totalInstances}</p>
									<Divider height="h-6" direction="divider-vertical" />
									<p>Regions: {instancesData.totalRegions}</p>
								{/if}
							</div>
						</svelte:fragment>
					</TextInputWithEndButton>
					<div class="mt-4" />
					{#if $oysterStore.providerData.registered}
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
								onclick={handleOnUnregister}
								loading={unregisterLoading}
							>
								Unregister
							</Button>
						</div>
					{/if}
				</div>
			{/if}
		</div>
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
	bind:loadedInitialInstances
	bind:updateLoading
	bind:registerLoading
	bind:instancesData
	bind:instancesLoading
/>
