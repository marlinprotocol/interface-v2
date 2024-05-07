<script lang="ts">
	import Button from '$lib/atoms/v2/buttons/Button.svelte';
	import Modal from '$lib/atoms/v2/modals/Modal.svelte';
	import TextInputWithEndButton from '$lib/components/v2/inputs/TextInputWithEndButton.svelte';
	import { cn } from '$lib/utils/helpers/commonHelper';
	import { staticImages } from '$lib/components/images/staticImages';

	export let handleOnRegister = () => {};
	export let registerLoading = false;
	export let updatedCpURL = '';
	export let validCPUrl: boolean;
	export let enableRegisterButton: boolean;
	export let instancesLoading = false;
	export let registered: boolean;

	export let handleOnUpdate = () => {};
	export let updateLoading = false;
	export let registeredCpURL = '';

	let isUpdateButtonDisabled: boolean;
	let isRegistredButtonDisabled: boolean;

	let isStateVisiable = false;
	const commonStateClass =
		'mt-4 w-full rounded-[18px]  py-6 flex items-center justify-center gap-[7px]';
	let currentStateClass = '';
	let iconName = '';

	function returnStateComponent(value: string) {
		switch (value) {
			case 'bg-[#FDF3DE] text-[#E6B54D]':
				return 'Your control plan URL is loading...';
			case 'bg-[#FEE6E6] text-[#E00606]':
				return 'Details are wrong';
			case 'bg-[#F4F9F0] text-[#68A843]':
				return 'Your control plan URL has been added successfully!';
			default:
				break;
		}
	}

	$: if (instancesLoading) {
		isStateVisiable = true;
		iconName = staticImages.yellowInfo;
		currentStateClass = 'bg-[#FDF3DE] text-[#E6B54D]';
	} else if (!validCPUrl && !!updatedCpURL.length) {
		isStateVisiable = true;
		iconName = staticImages.redAlert;
		currentStateClass = 'bg-[#FEE6E6] text-[#E00606]';
	} else if (validCPUrl && enableRegisterButton && updatedCpURL !== registeredCpURL) {
		isStateVisiable = true;
		iconName = staticImages.greenTick;
		currentStateClass = 'bg-[#F4F9F0] text-[#68A843]';
	} else {
		isStateVisiable = false;
	}
	$: isUpdateButtonDisabled =
		!validCPUrl || registeredCpURL === updatedCpURL || !enableRegisterButton;
	$: isRegistredButtonDisabled = !validCPUrl || !enableRegisterButton;
</script>

<Modal modalFor="oyster-register-url-operator">
	<svelte:fragment slot="title">{registered ? 'Update' : 'Register'}</svelte:fragment>
	<svelte:fragment slot="content">
		<TextInputWithEndButton
			styleClass="w-full py-4 rounded-[100px]"
			placeholder="Paste URL here"
			bind:input={updatedCpURL}
			label="Control Plane URL"
		/>
		{#if isStateVisiable}
			<div class={cn(commonStateClass, currentStateClass)}>
				<img src={iconName} alt="state-icon" />
				{returnStateComponent(currentStateClass)}
			</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="actionButtons">
		<Button
			variant="filled"
			styleClass="w-full font-normal"
			disabled={registered ? isUpdateButtonDisabled : isRegistredButtonDisabled}
			onclick={registered ? handleOnUpdate : handleOnRegister}
			loading={registerLoading || updateLoading}
		>
			{registered ? 'Update' : 'Register'}
		</Button>
	</svelte:fragment>
</Modal>
