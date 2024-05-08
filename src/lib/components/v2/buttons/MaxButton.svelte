<script lang="ts">
	import { buttonClasses } from '$lib/atoms/v2/componentClasses';

	export let disabled = false;
	export let onclick: (() => void) | undefined = undefined;
</script>

<button on:click={onclick} {disabled} class={buttonClasses.maxButton}> MAX </button>
