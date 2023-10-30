<script lang="ts">
	import { buttonClasses } from '$lib/atoms/componentClasses';
	import type { ButtonModel } from '$lib/types/componentTypes';
	export let disabled = false;
	export let onclick: ButtonModel['onclick'] = undefined;
	export let loading = false;
	export let styleClass = '';
	$: buttonClass = `${buttonClasses.greyFilled} ${styleClass}`;
</script>

<button on:click={onclick} {disabled} class={buttonClass}>
	{#if loading}
		<span class="loading loading-spinner loading-sm" />
	{/if}
	<slot />
</button>
