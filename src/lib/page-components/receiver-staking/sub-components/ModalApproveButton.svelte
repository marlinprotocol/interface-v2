<script lang="ts">
	import { buttonClasses } from '$lib/components/componentClasses';

	export let disabled = false;
	export let loading = false;
	export let handleApproveClick: () => void;
	export let inputPondAmount: number;
	export let approvedPond: number;

	const styles = {
		inputEndButton: `${buttonClasses.text} text-lg text-primary font-medium`
	};

	$: approved = !!inputPondAmount && approvedPond >= inputPondAmount;
</script>

<button
	class={`${styles.inputEndButton} ${loading && 'loading'} ${disabled && 'btn-disabled'}`}
	on:click={handleApproveClick}
>
	<div class="flex gap-1 items-center">
		{#if approved}
			<img src="./images/done.svg" alt="done" />
		{/if}
		{approved ? 'Approved' : 'Approve'}
	</div>
</button>
