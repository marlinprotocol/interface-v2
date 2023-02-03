<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import Icon from '$lib/atoms/icons/Icon.svelte';
	import { BigNumber } from 'ethers';
	import checkCircle from 'svelte-awesome/icons/checkCircle';

	export let disabled = false;
	export let loading = false;
	export let handleApproveClick: () => void;
	export let inputAmount: BigNumber;
	export let approvedAmount: BigNumber;

	//approved if input amount is greater than 0 and approved amount is greater than input amount
	$: approved = inputAmount?.gt(BigNumber.from(0)) && approvedAmount?.gte(inputAmount);

	$: styleClass = `${buttonClasses.text} text-lg font-medium ${
		disabled ? 'btn-disabled' + (approved ? ' text-primary' : '') : 'text-primary'
	} ${loading ? 'loading' : ''}`;
</script>

<button class={styleClass} on:click={handleApproveClick}>
	<div class="flex gap-0.5 items-center">
		{#if approved}
			<Icon data={checkCircle} size={18} iconColorClass="icon-primary" />
		{/if}
		{approved ? 'Approved' : 'Approve'}
	</div>
</button>
