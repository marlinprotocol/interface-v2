<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import { staticImages } from '$lib/components/images/staticImages';
	import { BIG_NUMBER_ZERO } from '$lib/utils/constants/constants';
	import type { BigNumber } from 'ethers';

	export let disabled = false;
	export let loading = false;
	export let handleApproveClick: () => void;
	export let inputAmount: BigNumber;
	export let approvedAmount: BigNumber;

	//approved if input amount is greater than 0 and approved amount is greater than input amount
	$: approved = inputAmount?.gt(BIG_NUMBER_ZERO) && approvedAmount?.gte(inputAmount);

	$: styleClass = `${buttonClasses.text} h-10 text-xl font-semibold ${
		disabled
			? 'btn-disabled' + (approved ? ' text-primary' : ' text-primary text-opacity-30')
			: 'text-primary'
	} ${loading ? 'loading' : ''}`;
</script>

<button class={styleClass} on:click={handleApproveClick}>
	<div class="flex gap-1 items-center">
		{#if approved}
			<img src={staticImages.Verified} alt="check-circle" />
		{/if}
		{approved ? 'Approved' : 'Approve'}
	</div>
</button>
