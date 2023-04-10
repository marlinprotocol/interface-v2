<script lang="ts">
	import Button from '$lib/atoms/buttons/Button.svelte';
	import ContainerCard from '$lib/atoms/cards/ContainerCard.svelte';
	import { dividerClasses, tableCellClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';
	import Text from '$lib/atoms/texts/Text.svelte';
	import ConnectWalletButton from '$lib/components/header/sub-components/ConnectWalletButton.svelte';
	import TextInputWithEndButton from '$lib/components/inputs/TextInputWithEndButton.svelte';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletStore } from '$lib/data-stores/walletProviderStore';
	import { kOysterDocLink, kOysterSupportLink } from '$lib/utils/constants/oysterConstants';
	import { checkValidURL } from '$lib/utils/helpers/commonHelper';
	import { onDestroy } from 'svelte';
	import edit from 'svelte-awesome/icons/edit';
	import InstancesTable from './sub-components/InstancesTable.svelte';
	import { oysterStore } from '$lib/data-stores/oysterStore';

	const styles = {
		docButton: 'text-primary',
		tableCell: tableCellClasses.rowMini
	};

	let displayAddress = '';

	let updatedCpURL = '';
	let registeredCpURL = '';
	let registered = false;

	const unsubscribeWalletStore = walletStore.subscribe((value) => {
		displayAddress = value.address;
	});
	onDestroy(unsubscribeWalletStore);

	const unsubscribeOysterStore = oysterStore.subscribe((value) => {
		registeredCpURL = value.cpURL;
		updatedCpURL = value.cpURL;
		registered = value.registered;
	});
	onDestroy(unsubscribeOysterStore);

	const handleOnRegister = () => {
		if (connected) {
			oysterStore.update((value) => {
				value.cpURL = updatedCpURL;
				value.registered = true;
				return value;
			});
			registered = true;
			addToast({
				variant: 'success',
				message: 'Successfully registered'
			});
		} else {
			addToast({
				variant: 'error',
				message: 'Please connect your wallet'
			});
		}
	};

	// using regex to validate CP URL
	$: validCPUrl = checkValidURL(updatedCpURL);
</script>

<ContainerCard>
	<svelte:fragment slot="header">
		<Text variant="h2" text="Infrastructure Registration" styleClass="text-left" />
		<div class="text-left text-grey-700 flex flex-col gap-1 mt-2 mb-4">
			<Text variant="body" text="For providers running instances" />
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
		tooltipText={'Tooltip text here'}
		placeholder={'Enter your address here'}
		bind:input={displayAddress}
		disabled={true}
	/>
	<TextInputWithEndButton
		styleClass="mt-4"
		title={'Control Plane URL'}
		tooltipText={'Tooltip text here'}
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
	<InstancesTable {updatedCpURL} {registeredCpURL} {validCPUrl} />
	<div class="mt-4" />
	{#if $connected}
		<Button
			variant="filled"
			styleClass="w-44"
			disabled={!validCPUrl || registeredCpURL === updatedCpURL}
			onclick={handleOnRegister}
		>
			{#if registered}
				Update
			{:else}
				Register
			{/if}
		</Button>
	{:else}
		<ConnectWalletButton />
	{/if}
</ContainerCard>
