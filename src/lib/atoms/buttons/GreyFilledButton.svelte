<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	export let disabled = false;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.greyFilled} ${styleClass}`;
</script>

<button {disabled} class={buttonClass}>
	{#if loading}
		<span class="loading loading-spinner loading-sm" />
	{/if}
	<slot />
</button>
