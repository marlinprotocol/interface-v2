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

	$: isUpdateButtonDisabled =
		!validCPUrl || registeredCpURL === updatedCpURL || !enableRegisterButton;
	$: isRegistredButtonDisabled = !validCPUrl || !enableRegisterButton;

	console.log({ isUpdateButtonDisabled });
	let isStateVisiable = false;
	const commonStateClass =
		'mt-4 w-full rounded-[18px]  py-6 flex items-center justify-center gap-[7px]';
	let currentStateClass = '';
	let iconName = '';

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
	function returnStateComponent(value: string) {
		switch (value) {
			case 'bg-[#FDF3DE] text-[#E6B54D]':
				return 'Your register is loading...';
			case 'bg-[#FEE6E6] text-[#E00606]':
				return 'Details are wrong';
			case 'bg-[#F4F9F0] text-[#68A843]':
				return 'Your register has been added successfully ';
			default:
				break;
		}
	}
</script>

<Modal modalFor="oyster-register-url-operator">
	<svelte:fragment slot="title">Register</svelte:fragment>
	<svelte:fragment slot="content">
		<!-- <p class="pb-3 text-base font-normal">Details</p> -->
		<TextInputWithEndButton
			styleClass="w-full  py-4 rounded-[100px]"
			placeholder="Paste URL here"
			title="Control Plane URL"
			id="cpurl-modal"
			bind:input={updatedCpURL}
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
			styleClass="w-full"
			disabled={registered ? isUpdateButtonDisabled : isRegistredButtonDisabled}
			onclick={registered ? handleOnUpdate : handleOnRegister}
			loading={registerLoading || updateLoading}
		>
			{registered ? 'Update' : 'Register'}
		</Button>
	</svelte:fragment>
</Modal>
