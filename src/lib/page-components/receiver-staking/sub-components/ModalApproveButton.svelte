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

	console.log('inputPondAmount, approvedPond :>> ', inputPondAmount, approvedPond);
</script>

<button
	disabled={disabled || loading}
	type="submit"
	class={`${styles.inputEndButton} ${loading && 'loading'}`}
	on:click={handleApproveClick}
>
	<!-- TODO: check approved design -->
	{!!inputPondAmount && approvedPond >= inputPondAmount ? 'Approved' : 'Approve'}</button
>
