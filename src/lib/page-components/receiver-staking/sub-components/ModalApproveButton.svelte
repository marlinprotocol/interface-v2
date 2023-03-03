<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { bigNumberToString } from '$lib/utils/conversion';
	import { BigNumber } from 'ethers';

	export let disabled = false;
	export let loading = false;
	export let handleApproveClick: () => void;
	export let inputAmount: BigNumber;
	export let approvedAmount: BigNumber;

	//approved if input amount is greater than 0 and approved amount is greater than input amount
	$: approved = inputAmount?.gt(BigNumber.from(0)) && approvedAmount?.gte(inputAmount);

	$: styleClass = `${buttonClasses.text} text-xl font-semibold ${
		disabled
			? 'btn-disabled' + (approved ? ' text-primary' : ' text-primary text-opacity-30')
			: 'text-primary'
	} ${loading ? 'loading' : ''}`;
</script>

<button class={styleClass} on:click={handleApproveClick}>
	<div class="flex gap-1 items-center">
		{#if approved}
			<img src="/images/verifiedicon.svg" alt="check-circle" />
		{/if}
		{approved ? 'Approved' : 'Approve'}
	</div>
</button>
